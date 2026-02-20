#!/usr/bin/env node
'use strict';

/**
 * Dashboard Bridge Hook — Translates Claude Code hook events into
 * high-level AIOS Dashboard events (AgentActivated, CommandStart, etc.)
 *
 * Runs on: UserPromptSubmit, PostToolUse, Stop
 * Sends to: Monitor server via HTTP POST (non-blocking, 500ms timeout)
 *
 * Never blocks Claude Code — all errors are silent.
 */

const MONITOR_URL = process.env.AIOS_MONITOR_URL || 'http://localhost:4010';
const TIMEOUT_MS = 500;

// ── Agent detection ──────────────────────────────────────────────

const AGENT_PATTERN = /@(dev|qa|architect|pm|po|sm|analyst|devops|aios-master|bob|squad-creator|docs)\b/i;
const COMMAND_PATTERN = /\*([\w-]+)/;
const DEACTIVATE_PATTERN = /\*exit\b/i;

// Track state across invocations via env (hooks are short-lived processes)
let currentAgent = process.env.AIOS_AGENT || null;

// ── HTTP helper ──────────────────────────────────────────────────

function postEvent(type, data) {
  const payload = JSON.stringify({
    type,
    timestamp: Date.now(),
    session_id: data.session_id || null,
    aios_agent: currentAgent || data.aios_agent || null,
    aios_story_id: process.env.AIOS_STORY_ID || null,
    data,
  });

  const url = new URL('/events', MONITOR_URL);

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    timer.unref();

    fetch(url.href, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      signal: controller.signal,
    }).catch(() => {});
  } catch {
    // Silent fail
  }
}

// ── Stdin reader ─────────────────────────────────────────────────

function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      try { resolve(JSON.parse(data)); }
      catch (e) { reject(e); }
    });
    process.stdin.on('error', reject);
  });
}

// ── Event processing ─────────────────────────────────────────────

function processUserPrompt(input) {
  const prompt = input.user_prompt || input.prompt || '';
  if (!prompt) return;

  // Detect agent activation: "@dev", "@architect", etc.
  const agentMatch = prompt.match(AGENT_PATTERN);
  if (agentMatch) {
    const agentId = agentMatch[1].toLowerCase();

    // If switching agents, deactivate previous
    if (currentAgent && currentAgent !== agentId) {
      postEvent('AgentDeactivated', {
        agentId: currentAgent,
        reason: 'switched',
        session_id: input.session_id,
      });
    }

    currentAgent = agentId;

    // Detect command in same prompt: "@dev *develop-yolo"
    const cmdMatch = prompt.match(COMMAND_PATTERN);
    const command = cmdMatch ? cmdMatch[1] : null;

    postEvent('AgentActivated', {
      agentId,
      command,
      session_id: input.session_id,
    });

    // If there's a command, also emit CommandStart
    if (command) {
      if (DEACTIVATE_PATTERN.test(prompt)) {
        postEvent('AgentDeactivated', {
          agentId,
          reason: 'exit',
          session_id: input.session_id,
        });
        currentAgent = null;
      } else {
        postEvent('CommandStart', {
          command,
          agentId,
          session_id: input.session_id,
        });
      }
    }

    return;
  }

  // Detect standalone command: "*develop", "*validate", etc.
  const cmdMatch = prompt.match(COMMAND_PATTERN);
  if (cmdMatch && currentAgent) {
    const command = cmdMatch[1];

    if (DEACTIVATE_PATTERN.test(prompt)) {
      postEvent('AgentDeactivated', {
        agentId: currentAgent,
        reason: 'exit',
        session_id: input.session_id,
      });
      currentAgent = null;
    } else {
      postEvent('CommandStart', {
        command,
        agentId: currentAgent,
        session_id: input.session_id,
      });
    }
  }
}

function processPostToolUse(input) {
  // We only emit tool-level events for significant tools
  const tool = input.tool_name || '';

  // Skip noisy read-only tools
  if (['Read', 'Glob', 'Grep'].includes(tool)) return;

  // Emit as generic tool event for the activity feed
  postEvent('PostToolUse', {
    tool_name: tool,
    session_id: input.session_id,
    aios_agent: currentAgent,
  });
}

function processStop(input) {
  if (currentAgent) {
    postEvent('AgentDeactivated', {
      agentId: currentAgent,
      reason: 'session_stop',
      session_id: input.session_id,
    });
  }

  postEvent('SessionEnd', {
    session_id: input.session_id,
  });
}

// ── Main ─────────────────────────────────────────────────────────

async function main() {
  const input = await readStdin();
  const event = input.hook_event_name || '';

  switch (event) {
    case 'UserPromptSubmit':
      processUserPrompt(input);
      break;
    case 'PostToolUse':
      processPostToolUse(input);
      break;
    case 'Stop':
      processStop(input);
      break;
    case 'Notification':
      // Session start is often the first notification
      if (!currentAgent) {
        postEvent('SessionStart', { session_id: input.session_id });
      }
      break;
  }
}

// Safety timeout
const timer = setTimeout(() => process.exit(0), 3000);
timer.unref();

main().catch(() => process.exit(0));
