const fs = require('fs');
const { marked } = require('marked');

// Read the brandbook markdown
const md = fs.readFileSync('strategy/BRANDBOOK-ESTRATEGICO.md', 'utf-8');

// Split into sections by ## headers
const sections = [];
let currentSection = null;
const lines = md.split('\n');

for (const line of lines) {
  // Match "## 01 —" or "## 02 —" or "# FUNDAMENTOS" etc.
  const h2Match = line.match(/^## (\d{2}) — (.+)$/);
  const h1Match = line.match(/^# (.+)$/);

  if (h2Match) {
    if (currentSection) sections.push(currentSection);
    currentSection = {
      num: h2Match[1],
      title: h2Match[2].trim(),
      id: 'sec-' + h2Match[1],
      content: line + '\n',
      block: ''
    };
  } else if (h1Match && !h1Match[1].startsWith('BRANDBOOK') && !h1Match[1].startsWith('INDICE') && !h1Match[1].startsWith('APENDICE')) {
    // Block headers like FUNDAMENTOS, ESTRATEGIA, etc.
    if (currentSection) {
      sections.push(currentSection);
      currentSection = null;
    }
    // Store as block marker
    const blockName = h1Match[1].trim();
    if (currentSection) currentSection.block = blockName;
    // Don't create a section for block headers, just track the name
    // Next section will inherit this block
    sections.push({ type: 'block', name: blockName });
  } else if (currentSection) {
    currentSection.content += line + '\n';
  }
}
if (currentSection) sections.push(currentSection);

// Filter out block markers and assign block names
let currentBlock = 'Introdução';
const blockMap = {
  'FUNDAMENTOS': 'Fundamentos',
  'ESTRATÉGIA': 'Estratégia',
  'ESTRATEGIA': 'Estratégia',
  'IDENTIDADE VERBAL': 'Identidade Verbal',
  'JORNADA & PROVA': 'Jornada & Prova',
  'IDENTIDADE VISUAL': 'Identidade Visual',
  'SHOWCASE': 'Showcase',
  'APENDICES': 'Apêndices',
  'APÊNDICES': 'Apêndices'
};

const realSections = [];
for (const s of sections) {
  if (s.type === 'block') {
    currentBlock = blockMap[s.name] || s.name;
  } else if (s.num) {
    s.block = currentBlock;
    realSections.push(s);
  }
}

// Build nav HTML
let navHtml = '';
let lastBlock = '';
for (const s of realSections) {
  if (s.block !== lastBlock) {
    navHtml += `<div class="ns">${s.block}</div>\n`;
    lastBlock = s.block;
  }
  navHtml += `<a class="ni" href="#${s.id}" data-target="${s.id}"><span class="nn">${s.num}</span>${s.title}</a>\n`;
}

// Build content HTML
let contentHtml = '';
lastBlock = '';
for (const s of realSections) {
  if (s.block !== lastBlock) {
    contentHtml += `<div class="block-header"><span class="block-label">${s.block}</span></div>\n`;
    lastBlock = s.block;
  }
  const html = marked.parse(s.content);
  contentHtml += `<section id="${s.id}" class="sec">\n${html}\n</section>\n`;
}

// Also render appendices
const appendixStart = md.indexOf('# APENDICES');
const appendixStart2 = md.indexOf('# APÊNDICES');
const aIdx = appendixStart > -1 ? appendixStart : appendixStart2;
if (aIdx > -1) {
  const appendixMd = md.substring(aIdx);
  contentHtml += `<section id="sec-appendix" class="sec">\n${marked.parse(appendixMd)}\n</section>\n`;
  navHtml += `<div class="ns">Apêndices</div>\n`;
  navHtml += `<a class="ni" href="#sec-appendix" data-target="sec-appendix"><span class="nn">A</span>Design Tokens & Checklist</a>\n`;
}

const fullHtml = `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Brandbook Estratégico — O Livro do Ano Milionário</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
:root {
  --onyx: #0A0A0F;
  --gold: #C9A84C;
  --gold-dim: rgba(201,168,76,0.15);
  --gold-glow: rgba(201,168,76,0.25);
  --ivory: #F5F0E8;
  --charcoal: #1A1A24;
  --amber: #E8B94A;
  --smoke: #6B6B7B;
  --midnight: #12121A;
  --glass-bg: rgba(255,255,255,0.03);
  --glass-border: rgba(255,255,255,0.06);
  --glass-bg2: rgba(255,255,255,0.05);
  --glass-border2: rgba(255,255,255,0.08);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  background: var(--onyx);
  color: var(--ivory);
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 15px;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
}

/* ── SIDEBAR ── */
.sidebar {
  position: fixed;
  top: 0; left: 0;
  width: 280px;
  height: 100vh;
  background: rgba(10,10,15,0.97);
  border-right: 1px solid var(--glass-border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  overflow-y: auto;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 2rem 1.5rem 1.5rem;
  border-bottom: 1px solid var(--glass-border);
  flex-shrink: 0;
}

.sidebar-header .brand {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: -0.01em;
  margin-bottom: 0.15rem;
}

.sidebar-header .sub {
  font-size: 0.7rem;
  color: var(--smoke);
  font-weight: 500;
}

.sidebar-header .tag {
  display: inline-block;
  margin-top: 0.6rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0 2rem;
}

.ns {
  padding: 0.75rem 1.5rem 0.35rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--smoke);
}

.ni {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1.5rem;
  color: rgba(245,240,232,0.7);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  border-left: 2px solid transparent;
  transition: all 0.2s ease;
  cursor: pointer;
}

.ni:hover {
  color: var(--gold);
  background: rgba(201,168,76,0.04);
  border-left-color: rgba(201,168,76,0.3);
}

.ni.active {
  color: var(--gold);
  background: rgba(201,168,76,0.08);
  border-left-color: var(--gold);
  font-weight: 600;
}

.nn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--smoke);
  min-width: 1.4rem;
}

.ni.active .nn { color: var(--gold); }

/* ── MAIN ── */
.main {
  margin-left: 280px;
  padding: 2.5rem 3.5rem 4rem;
  max-width: 920px;
}

/* ── BLOCK HEADERS ── */
.block-header {
  margin: 3rem 0 1rem;
}

.block-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.15);
  padding: 0.25rem 0.75rem;
  border-radius: 14px;
}

/* ── SECTIONS ── */
.sec {
  padding: 2rem 0;
  border-bottom: 1px solid var(--glass-border);
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── TYPOGRAPHY ── */
.sec h2 {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--gold);
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.sec h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--ivory);
  margin: 2rem 0 0.6rem;
  line-height: 1.3;
}

.sec h4 {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--amber);
  margin: 1.5rem 0 0.4rem;
}

.sec p {
  margin: 0.6rem 0;
  color: rgba(245,240,232,0.85);
  max-width: 680px;
}

.sec strong { color: var(--ivory); font-weight: 600; }
.sec em { color: var(--amber); }
.sec a { color: var(--gold); text-decoration: none; border-bottom: 1px solid rgba(201,168,76,0.3); }
.sec a:hover { border-bottom-color: var(--gold); }

/* ── BLOCKQUOTES ── */
.sec blockquote {
  border-left: 3px solid var(--gold);
  background: rgba(201,168,76,0.05);
  padding: 1rem 1.5rem;
  margin: 1.25rem 0;
  border-radius: 0 10px 10px 0;
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  line-height: 1.55;
  color: var(--ivory);
}

/* ── LISTS ── */
.sec ul, .sec ol { margin: 0.6rem 0; padding-left: 1.5rem; }
.sec li { margin: 0.3rem 0; color: rgba(245,240,232,0.82); }
.sec li::marker { color: var(--gold); }

/* ── TABLES ── */
.sec table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.83rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border2);
  border-radius: 10px;
  overflow: hidden;
}

.sec thead th {
  background: rgba(201,168,76,0.1);
  color: var(--gold);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-align: left;
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid var(--glass-border2);
}

.sec tbody td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--glass-border);
  color: rgba(245,240,232,0.82);
}

.sec tbody tr:last-child td { border-bottom: none; }
.sec tbody tr:hover { background: rgba(255,255,255,0.02); }

/* ── CODE ── */
.sec code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82em;
  background: rgba(255,255,255,0.06);
  padding: 0.12rem 0.4rem;
  border-radius: 4px;
  color: var(--amber);
}

.sec pre {
  background: var(--charcoal);
  border: 1px solid var(--glass-border2);
  border-radius: 10px;
  padding: 1.25rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.sec pre code {
  background: transparent;
  padding: 0;
  font-size: 0.8rem;
  color: var(--ivory);
  line-height: 1.65;
}

/* ── HORIZONTAL RULES ── */
.sec hr {
  border: none;
  border-top: 1px solid var(--glass-border);
  margin: 2rem 0;
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.4); }

/* ── PRINT ── */
@media print {
  .sidebar { display: none; }
  .main { margin-left: 0; max-width: 100%; padding: 1rem; }
  body { background: #fff; color: #1a1a1a; font-size: 11pt; }
  .sec h2 { color: #1a1a1a; border-bottom: 2px solid #C9A84C; padding-bottom: 0.3rem; }
  .sec h3 { color: #333; }
  .sec table { border: 1px solid #ccc; }
  .sec thead th { background: #f5f0e8; color: #1a1a1a; border: 1px solid #ccc; }
  .sec tbody td { border: 1px solid #ddd; color: #333; }
  .sec blockquote { border-left: 3px solid #C9A84C; background: #faf8f5; }
  .sec pre { background: #f5f5f5; border: 1px solid #ddd; }
  .sec code { background: #f0f0f0; color: #333; }
  .block-header { page-break-before: always; }
  .sec { page-break-inside: avoid; border-bottom: none; }
}

/* ── MOBILE ── */
@media (max-width: 860px) {
  .sidebar {
    width: 100%;
    height: auto;
    max-height: 50vh;
    position: relative;
    border-right: none;
    border-bottom: 1px solid var(--glass-border);
  }
  .main { margin-left: 0; padding: 1.5rem; }
  .sec h2 { font-size: 1.4rem; }
}
</style>
</head>
<body>

<nav class="sidebar">
  <div class="sidebar-header">
    <div class="brand">O Livro do Ano Milionário</div>
    <div class="sub">Manuel Manero — Brandbook Estratégico</div>
    <span class="tag">v2.0 — 16 Secções</span>
  </div>
  <div class="sidebar-nav">
    ${navHtml}
  </div>
</nav>

<main class="main">
  ${contentHtml}
</main>

<script>
// Scroll-spy
const navItems = document.querySelectorAll('.ni');
const secs = document.querySelectorAll('.sec');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(n => n.classList.remove('active'));
      const target = document.querySelector('.ni[data-target="' + entry.target.id + '"]');
      if (target) target.classList.add('active');
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });

secs.forEach(s => observer.observe(s));

// Activate first
if (navItems.length) navItems[0].classList.add('active');
</script>

</body>
</html>`;

fs.writeFileSync('BRANDBOOK-V2.html', fullHtml);
console.log('OK: ' + (fullHtml.length / 1024).toFixed(0) + 'KB, sections: ' + realSections.length);
