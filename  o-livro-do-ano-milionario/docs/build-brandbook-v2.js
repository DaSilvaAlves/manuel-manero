const fs = require('fs');
const { marked } = require('marked');

// ─── Read Markdown ──────────────────────────────────────────
const md = fs.readFileSync('strategy/BRANDBOOK-ESTRATEGICO.md', 'utf-8');

// ─── Parse sections ─────────────────────────────────────────
const lines = md.split('\n');
const rawSections = [];
let currentSection = null;
let currentBlock = '';

const blockMap = {
  'FUNDAMENTOS': 'fundamentos',
  'ESTRATÉGIA': 'estrategia',
  'ESTRATEGIA': 'estrategia',
  'IDENTIDADE VERBAL': 'identidade-verbal',
  'JORNADA & PROVA': 'jornada',
  'IDENTIDADE VISUAL': 'identidade-visual',
  'SHOWCASE': 'showcase',
  'APÊNDICES': 'apendices',
};

const blockLabels = {
  'fundamentos': 'Fundamentos',
  'estrategia': 'Estrategia',
  'identidade-verbal': 'Identidade Verbal',
  'jornada': 'Jornada & Prova',
  'identidade-visual': 'Identidade Visual',
  'showcase': 'Showcase',
  'apendices': 'Apendices',
};

for (const line of lines) {
  const h2Match = line.match(/^## (\d{2}) — (.+)$/);
  const h1Match = line.match(/^# (.+)$/);

  if (h2Match) {
    if (currentSection) rawSections.push(currentSection);
    currentSection = {
      num: h2Match[1],
      title: h2Match[2].trim(),
      id: 'sec-' + h2Match[1],
      block: currentBlock,
      content: '',
    };
  } else if (h1Match) {
    const name = h1Match[1].trim();
    if (blockMap[name]) {
      if (currentSection) rawSections.push(currentSection);
      currentSection = null;
      currentBlock = blockMap[name];
    } else if (name === 'BRANDBOOK ESTRATÉGICO' || name.startsWith('ÍNDICE') || name.startsWith('INDICE')) {
      // skip
    } else if (currentSection) {
      currentSection.content += line + '\n';
    }
  } else if (currentSection) {
    currentSection.content += line + '\n';
  }
}
if (currentSection) rawSections.push(currentSection);

// Also parse appendices
const appendixMatch = md.match(/# APÊNDICES[\s\S]*$/);
let appendixSections = [];
if (appendixMatch) {
  const appContent = appendixMatch[0];
  const appParts = appContent.split(/^## ([A-D])\. (.+)$/m);
  for (let i = 1; i < appParts.length; i += 3) {
    appendixSections.push({
      num: 'A' + appParts[i],
      title: appParts[i + 1].trim(),
      id: 'sec-app-' + appParts[i].toLowerCase(),
      block: 'apendices',
      content: appParts[i + 2] || '',
    });
  }
}

const sections = rawSections.filter(s => s.num);

// ─── Nav tabs (top header) ──────────────────────────────────
const navTabs = [
  { id: 'fundamentos', label: 'FUNDAMENTOS' },
  { id: 'estrategia', label: 'ESTRATEGIA' },
  { id: 'identidade-verbal', label: 'IDENTIDADE VERBAL' },
  { id: 'jornada', label: 'JORNADA' },
  { id: 'identidade-visual', label: 'IDENTIDADE VISUAL' },
  { id: 'showcase', label: 'SHOWCASE' },
];

// ─── Visual section generators ──────────────────────────────

function generateSection03Spectrum() {
  const dimensions = [
    { left: 'Formal', right: 'Casual', pos: 70 },
    { left: 'Serio', right: 'Divertido', pos: 60 },
    { left: 'Distante', right: 'Proximo', pos: 65 },
    { left: 'Teorico', right: 'Pratico', pos: 15 },
    { left: 'Cauteloso', right: 'Ousado', pos: 60 },
    { left: 'Exclusivo', right: 'Acessivel', pos: 50 },
  ];
  return `
    <div class="spectrum-container">
      <h3 class="section-subtitle">Personalidade da Marca</h3>
      ${dimensions.map(d => `
        <div class="spectrum-row">
          <span class="spectrum-label-left">${d.left}</span>
          <div class="spectrum-bar">
            <div class="spectrum-track"></div>
            <div class="spectrum-dot" style="left:${d.pos}%"></div>
          </div>
          <span class="spectrum-label-right">${d.right}</span>
        </div>
      `).join('')}
      <p class="spectrum-note">O posicionamento e <strong>proximo mas com autoridade</strong>, <strong>pratico mas com profundidade</strong>, <strong>ousado mas com fundamentacao</strong>.</p>
    </div>
  `;
}

function generateSection06Truelines() {
  const truelines = [
    { id: 'TL-01', label: 'A Verdade Sobre Inspiração', quote: 'Inspiração é oxigénio — vem de fora e garante a vida.' },
    { id: 'TL-02', label: 'A Verdade Sobre Motivação', quote: 'Motivação é motivo + acção. Se tens o motivo, o livro dá-te a acção.' },
    { id: 'TL-03', label: 'A Verdade Sobre Consistência', quote: '366 dias. Sem excepções. Sem atalhos. Porque anos milionários não saltam dias.' },
    { id: 'TL-04', label: 'A Verdade Sobre o Autor', quote: 'Escrevo para mim primeiro. Depois para quem partilha a mesma visão.' },
    { id: 'TL-05', label: 'A Verdade Sobre Riqueza', quote: 'Vida milionária é propósito, presença, sentido, significado e bons resultados.' },
    { id: 'TL-06', label: 'A Verdade Sobre os 11 Pilares', quote: 'Não são capítulos. São pilares. A diferença é que pilares sustentam — capítulos acabam.' },
    { id: 'TL-07', label: 'A Verdade Sobre o Começo', quote: 'O teu ano milionário não começa em Janeiro. Começa quando decides que começa.' },
  ];
  return `
    <div class="truelines-grid">
      ${truelines.map(t => `
        <div class="trueline-card glass-gold-card">
          <div class="trueline-id">${t.id}</div>
          <div class="trueline-label">${t.label}</div>
          <blockquote class="trueline-quote">"${t.quote}"</blockquote>
        </div>
      `).join('')}
    </div>
  `;
}

function generateSection09Journey() {
  const stages = [
    { num: '1', name: 'O Mundo Comum', desc: 'Rotina, potencial nao realizado. "Mais um ano igual ao anterior."', icon: 'circle' },
    { num: '2', name: 'A Duvida Silenciosa', desc: 'Auto-duvida e resignacao. A inconsistencia torna-se identidade.', icon: 'help-circle' },
    { num: '3', name: 'A Chamada', desc: 'O heroi descobre o livro. 366 dias. 11 pilares. "Isto e diferente."', icon: 'phone-call' },
    { num: '4', name: 'O Guia Aparece', desc: 'Manuel Manero: empatia, autoridade e plano claro. "Eu fiz. Tu podes."', icon: 'compass' },
    { num: '5', name: 'A Prova (366 Dias)', desc: 'Curiosidade (1-30d), Habito (31-90d), Transformacao (91-180d), Identidade (181-366d).', icon: 'flame' },
    { num: '6', name: 'A Recompensa', desc: 'Clareza, consistencia, proposito e resultados. A vida milionaria.', icon: 'award' },
    { num: '7', name: 'O Regresso', desc: 'O heroi regressa como referencia. Partilha, recomenda, inspira.', icon: 'share-2' },
    { num: '8', name: 'O Mestre', desc: 'Quem completou os 366 dias pode guiar outros. O ciclo recomeca.', icon: 'crown' },
  ];
  return `
    <div class="journey-timeline">
      ${stages.map((s, i) => `
        <div class="journey-stage ${i === stages.length - 1 ? 'journey-stage-last' : ''}">
          <div class="journey-connector">
            <div class="journey-dot">${s.num}</div>
            ${i < stages.length - 1 ? '<div class="journey-line"></div>' : ''}
          </div>
          <div class="journey-content glass-card-sm">
            <div class="journey-stage-name">${s.name}</div>
            <div class="journey-stage-desc">${s.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function generateSection11Colors() {
  const primary = [
    { name: 'Onyx', hex: '#0A0A0F', rgb: '10, 10, 15', light: true },
    { name: 'Gold', hex: '#C9A84C', rgb: '201, 168, 76', light: false },
    { name: 'Ivory', hex: '#F5F0E8', rgb: '245, 240, 232', light: false },
    { name: 'Charcoal', hex: '#1A1A24', rgb: '26, 26, 36', light: true },
  ];
  const secondary = [
    { name: 'Amber', hex: '#E8B94A', rgb: '232, 185, 74', light: false },
    { name: 'Warm White', hex: '#FAF8F5', rgb: '250, 248, 245', light: false },
    { name: 'Smoke', hex: '#6B6B7B', rgb: '107, 107, 123', light: true },
    { name: 'Midnight', hex: '#12121A', rgb: '18, 18, 26', light: true },
  ];
  const functional = [
    { name: 'Success', hex: '#2ECC71', rgb: '46, 204, 113', light: false },
    { name: 'Warning', hex: '#F39C12', rgb: '243, 156, 18', light: false },
    { name: 'Error', hex: '#E74C3C', rgb: '231, 76, 60', light: false },
    { name: 'Info', hex: '#3498DB', rgb: '52, 152, 219', light: false },
  ];

  const gradients = [
    { name: 'Hero Background', css: 'linear-gradient(180deg, #0A0A0F 0%, #12121A 100%)' },
    { name: 'Gold Subtle', css: 'linear-gradient(135deg, rgba(201, 168, 76, 0.08) 0%, rgba(201, 168, 76, 0.02) 100%)' },
    { name: 'Gold Text', css: 'linear-gradient(135deg, #C9A84C 0%, #E8B94A 50%, #C9A84C 100%)' },
    { name: 'Image Overlay', css: 'linear-gradient(to top, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.4) 60%, transparent 100%)' },
  ];

  function renderSwatches(colors, label) {
    return `
      <div class="color-group">
        <h4 class="color-group-label">${label}</h4>
        <div class="color-grid">
          ${colors.map(c => `
            <div class="color-swatch" style="background:${c.hex}">
              <div class="swatch-info ${c.light ? 'swatch-light' : 'swatch-dark'}">
                <span class="swatch-name">${c.name}</span>
                <span class="swatch-hex">${c.hex}</span>
                <span class="swatch-rgb">${c.rgb}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    ${renderSwatches(primary, 'Paleta Primaria')}
    ${renderSwatches(secondary, 'Paleta Secundaria')}
    ${renderSwatches(functional, 'Paleta Funcional')}
    <div class="color-group">
      <h4 class="color-group-label">Gradientes Aprovados</h4>
      <div class="gradient-grid">
        ${gradients.map(g => `
          <div class="gradient-swatch">
            <div class="gradient-preview" style="background:${g.css}"></div>
            <span class="gradient-name">${g.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function generateSection12Typography() {
  const scales = [
    { label: 'Display', sample: 'O Ano Milionario', font: "'Playfair Display', serif", size: '3.2rem', weight: '900', ls: '-0.03em', color: 'var(--gold)', meta: '3.2rem / 900 / Playfair Display' },
    { label: 'H1', sample: '366 Inspiracoes Para Uma Vida Milionaria', font: "'Playfair Display', serif", size: '2.4rem', weight: '700', ls: '-0.02em', color: 'var(--ivory)', meta: '2.4rem / 700 / Playfair Display' },
    { label: 'H2', sample: 'Os 11 Pilares do Ano Milionario', font: "'Playfair Display', serif", size: '1.8rem', weight: '700', ls: '-0.01em', color: 'var(--ivory)', meta: '1.8rem / 700 / Playfair Display' },
    { label: 'H3', sample: 'Principios do Manifesto', font: "'Inter', sans-serif", size: '1.4rem', weight: '700', ls: '0', color: 'var(--ivory)', meta: '1.4rem / 700 / Inter' },
    { label: 'H4', sample: 'Expressoes-Assinatura', font: "'Inter', sans-serif", size: '1.15rem', weight: '600', ls: '0', color: 'var(--ivory)', meta: '1.15rem / 600 / Inter' },
    { label: 'Body', sample: 'Acredito que o sucesso na vida de cada um de nos, para alem do equilibrio de diversos factores, carece essencialmente de 2 ingredientes: inspiracao e motivacao.', font: "'Inter', sans-serif", size: '1rem', weight: '400', ls: '0', color: 'var(--ivory)', meta: '1rem / 400 / Inter / line-height 1.75' },
    { label: 'Number', sample: '366', font: "'JetBrains Mono', monospace", size: '2.4rem', weight: '700', ls: '-0.02em', color: 'var(--gold)', meta: '2.4rem / 700 / JetBrains Mono' },
    { label: 'Badge', sample: '11 PILARES', font: "'JetBrains Mono', monospace", size: '0.65rem', weight: '700', ls: '0.12em', color: 'var(--gold)', meta: '0.65rem / 700 / JetBrains Mono / uppercase', transform: 'uppercase' },
  ];
  return `
    <div class="type-scale">
      ${scales.map(s => `
        <div class="type-row">
          <span class="type-label">${s.label}</span>
          <div class="type-sample-wrap">
            <span class="type-sample" style="font-family:${s.font};font-size:${s.size};font-weight:${s.weight};letter-spacing:${s.ls};color:${s.color};line-height:1.3;${s.transform ? 'text-transform:' + s.transform + ';' : ''}">${s.sample}</span>
            <span class="type-meta">${s.meta}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="type-families">
      <h4 class="color-group-label">Familias Tipograficas</h4>
      <div class="type-families-grid">
        <div class="type-family-card glass-card-sm">
          <span class="type-family-name" style="font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900;color:var(--gold)">Playfair Display</span>
          <span class="type-family-role">Titulos, headlines, display</span>
          <span class="type-family-weights">400 / 700 / 900</span>
        </div>
        <div class="type-family-card glass-card-sm">
          <span class="type-family-name" style="font-family:'Inter',sans-serif;font-size:1.4rem;font-weight:600;color:var(--ivory)">Inter</span>
          <span class="type-family-role">Body, UI, navegacao</span>
          <span class="type-family-weights">400 / 500 / 600 / 700</span>
        </div>
        <div class="type-family-card glass-card-sm">
          <span class="type-family-name" style="font-family:'JetBrains Mono',monospace;font-size:1.2rem;font-weight:700;color:var(--gold)">JetBrains Mono</span>
          <span class="type-family-role">Numeros, badges, dados tecnicos</span>
          <span class="type-family-weights">400 / 700</span>
        </div>
      </div>
    </div>
  `;
}

function generateSection13Glass() {
  const levels = [
    { level: 1, name: 'Superfície', opacity: '0.03', blur: '8px', border: '0.06', shadow: 'none' },
    { level: 2, name: 'Card', opacity: '0.05', blur: '12px', border: '0.08', shadow: '0 4px 24px rgba(0,0,0,0.2)' },
    { level: 3, name: 'Modal', opacity: '0.07', blur: '16px', border: '0.10', shadow: '0 8px 40px rgba(0,0,0,0.3)' },
    { level: 4, name: 'Popover', opacity: '0.10', blur: '20px', border: '0.12', shadow: '0 12px 48px rgba(0,0,0,0.35)' },
  ];
  return `
    <div class="glass-demo-grid">
      ${levels.map(l => `
        <div class="glass-demo-card" style="background:rgba(255,255,255,${l.opacity});border:1px solid rgba(255,255,255,${l.border});backdrop-filter:blur(${l.blur});-webkit-backdrop-filter:blur(${l.blur});border-radius:16px;padding:1.5rem;box-shadow:${l.shadow};position:relative;overflow:hidden;">
          <div class="glass-light-bar"></div>
          <div class="glass-label">NIVEL ${l.level}</div>
          <div class="glass-name">${l.name}</div>
          <div class="glass-specs">opacity: ${l.opacity} &middot; blur: ${l.blur}</div>
        </div>
      `).join('')}
      <div class="glass-demo-card" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.15);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:16px;padding:1.5rem;position:relative;overflow:hidden;">
        <div class="glass-light-bar-gold"></div>
        <div class="glass-label" style="color:var(--gold)">GOLD GLASS</div>
        <div class="glass-name">Premium</div>
        <div class="glass-specs">CTAs, destaques, conversao</div>
      </div>
    </div>
    <div class="glass-effects-demo">
      <h4 class="color-group-label">Efeitos de Luz</h4>
      <div class="glass-effects-grid">
        <div class="glass-effect-card" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:2rem;position:relative;overflow:hidden;">
          <div class="glass-top-glow"></div>
          <span class="glass-effect-label">Top Glow</span>
          <span class="glass-effect-desc">Brilho gold sutil no topo de cards</span>
        </div>
        <div class="glass-effect-card glow-gold" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.15);border-radius:16px;padding:2rem;">
          <span class="glass-effect-label" style="color:var(--gold)">Glow Effect</span>
          <span class="glass-effect-desc">Para elementos interactivos</span>
        </div>
        <div class="glass-effect-card pulse-gold-card" style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.15);border-radius:16px;padding:2rem;">
          <span class="glass-effect-label" style="color:var(--gold)">Pulse Gold</span>
          <span class="glass-effect-desc">Para CTAs criticos</span>
        </div>
      </div>
    </div>
  `;
}

function generateSection14Components() {
  return `
    <div class="component-section">
      <h4 class="comp-category">Botoes</h4>
      <div class="comp-row">
        <div class="comp-item">
          <span class="comp-label">Primario (CTA)</span>
          <button class="btn-demo-primary">Reserva o Teu Exemplar</button>
        </div>
        <div class="comp-item">
          <span class="comp-label">Primario Hover</span>
          <button class="btn-demo-primary btn-hover">Garante o Teu Ano</button>
        </div>
        <div class="comp-item">
          <span class="comp-label">Secundario (Ghost)</span>
          <button class="btn-demo-ghost">Saber Mais</button>
        </div>
        <div class="comp-item">
          <span class="comp-label">Ghost Hover</span>
          <button class="btn-demo-ghost btn-ghost-hover">Conhecer os Pilares</button>
        </div>
      </div>
    </div>

    <div class="component-section">
      <h4 class="comp-category">Input / Lead Capture</h4>
      <div class="comp-row">
        <div class="comp-item" style="flex:1;max-width:400px">
          <span class="comp-label">Email Input</span>
          <input class="input-demo" placeholder="O teu email" type="email" readonly>
        </div>
        <div class="comp-item" style="flex:1;max-width:400px">
          <span class="comp-label">Email Input :focus</span>
          <input class="input-demo input-focus" placeholder="O teu email" type="email" readonly>
        </div>
      </div>
    </div>

    <div class="component-section">
      <h4 class="comp-category">Badges</h4>
      <div class="comp-row">
        <div class="comp-item">
          <span class="comp-label">Badge de Pilar</span>
          <span class="badge-demo"><i data-lucide="compass" style="width:14px;height:14px"></i> PILAR I</span>
        </div>
        <div class="comp-item">
          <span class="comp-label">Badge Gold</span>
          <span class="badge-demo gold">PROPOSITO</span>
        </div>
        <div class="comp-item">
          <span class="comp-label">Badge Neutral</span>
          <span class="badge-demo neutral">366 DIAS</span>
        </div>
      </div>
    </div>

    <div class="component-section">
      <h4 class="comp-category">Card de Inspiração Diária</h4>
      <div class="comp-row">
        <div class="card-inspiration-demo">
          <div class="card-insp-light"></div>
          <div class="card-insp-day">DIA 047 &middot; PILAR III</div>
          <div class="card-insp-quote">"A diferenca entre quem constroi e quem sonha e uma unica coisa: o dia de hoje."</div>
          <span class="badge-demo gold">PROPOSITO</span>
        </div>
      </div>
    </div>

    <div class="component-section">
      <h4 class="comp-category">Card de Testemunho</h4>
      <div class="comp-row">
        <div class="card-testimonial-demo">
          <div class="testimonial-avatar">AM</div>
          <div class="testimonial-body">
            <div class="testimonial-quote-mark">&ldquo;</div>
            <div class="testimonial-text">O Manuel mudou completamente a forma como me posiciono. De 2k para 15k mensais em 3 meses.</div>
            <div class="testimonial-author">Ana Silva &mdash; Mentora de Negocios</div>
          </div>
        </div>
      </div>
    </div>

    <div class="component-section">
      <h4 class="comp-category">Countdown</h4>
      <div class="comp-row" style="justify-content:center">
        <div class="countdown-demo">
          <div class="countdown-unit"><span class="countdown-num">68</span><span class="countdown-label">DIAS</span></div>
          <div class="countdown-unit"><span class="countdown-num">04</span><span class="countdown-label">HORAS</span></div>
          <div class="countdown-unit"><span class="countdown-num">32</span><span class="countdown-label">MIN</span></div>
          <div class="countdown-unit"><span class="countdown-num">17</span><span class="countdown-label">SEG</span></div>
        </div>
      </div>
    </div>

    <div class="component-section">
      <h4 class="comp-category">Navbar</h4>
      <div class="comp-row">
        <div class="navbar-demo">
          <span class="navbar-logo">Manuel Manero</span>
          <div class="navbar-links">
            <span>Livro</span>
            <span>Pilares</span>
            <span>Feira</span>
            <button class="btn-demo-primary" style="padding:0.5rem 1rem;font-size:0.8rem">Reservar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function generateSection15Icons() {
  const pillarIcons = [
    { pilar: 'I', icon: 'compass', name: 'Pilar I' },
    { pilar: 'II', icon: 'heart', name: 'Pilar II' },
    { pilar: 'III', icon: 'target', name: 'Pilar III' },
    { pilar: 'IV', icon: 'brain', name: 'Pilar IV' },
    { pilar: 'V', icon: 'scale', name: 'Pilar V' },
    { pilar: 'VI', icon: 'rocket', name: 'Pilar VI' },
    { pilar: 'VII', icon: 'shield', name: 'Pilar VII' },
    { pilar: 'VIII', icon: 'star', name: 'Pilar VIII' },
    { pilar: 'IX', icon: 'book-open', name: 'Pilar IX' },
    { pilar: 'X', icon: 'users', name: 'Pilar X' },
    { pilar: 'XI', icon: 'crown', name: 'Pilar XI' },
  ];
  const funcIcons = [
    { icon: 'play-circle', name: 'Reproduzir Audio' },
    { icon: 'qr-code', name: 'QR Code' },
    { icon: 'share-2', name: 'Partilhar' },
    { icon: 'bookmark', name: 'Guardar' },
    { icon: 'flame', name: 'Streak / Dias' },
    { icon: 'award', name: 'Badge' },
    { icon: 'message-circle', name: 'Comunidade' },
    { icon: 'bell', name: 'Notificacao' },
    { icon: 'calendar', name: 'Calendario' },
    { icon: 'trending-up', name: 'Progresso' },
  ];
  return `
    <div class="icon-section">
      <h4 class="color-group-label">Icones dos 11 Pilares</h4>
      <div class="icon-grid">
        ${pillarIcons.map(p => `
          <div class="icon-item">
            <div class="icon-circle"><i data-lucide="${p.icon}"></i></div>
            <span class="icon-pilar-num">${p.pilar}</span>
            <span class="icon-name">${p.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="icon-section">
      <h4 class="color-group-label">Icones Funcionais</h4>
      <div class="icon-grid">
        ${funcIcons.map(f => `
          <div class="icon-item">
            <div class="icon-circle func"><i data-lucide="${f.icon}"></i></div>
            <span class="icon-name">${f.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="icon-specs glass-card-sm" style="margin-top:2rem;padding:1.5rem">
      <h4 class="color-group-label" style="margin-bottom:1rem">Especificacoes</h4>
      <div class="specs-grid">
        <div><span class="spec-label">Estilo</span><span class="spec-value">Outline, stroke 1.5px</span></div>
        <div><span class="spec-label">Cor padrao</span><span class="spec-value" style="color:var(--ivory)">Ivory #F5F0E8</span></div>
        <div><span class="spec-label">Cor destaque</span><span class="spec-value" style="color:var(--gold)">Gold #C9A84C</span></div>
        <div><span class="spec-label">Tamanho base</span><span class="spec-value">24x24px</span></div>
        <div><span class="spec-label">Biblioteca</span><span class="spec-value">Lucide Icons (open source)</span></div>
      </div>
    </div>
  `;
}

function generateSection16Mockups() {
  const mockups = [
    { num: '01', name: 'Landing Page Hero (Desktop)', size: '1920x1080', priority: 'P0', gradient: 'linear-gradient(135deg, var(--surface), #1a1a2e)' },
    { num: '02', name: 'Landing Page Hero (Mobile)', size: '375x812', priority: 'P0', gradient: 'linear-gradient(135deg, #12121A, #0A0A0F)' },
    { num: '03', name: 'Instagram Post', size: '1080x1080', priority: 'P0', gradient: 'linear-gradient(135deg, var(--surface), rgba(201,168,76,0.05))' },
    { num: '04', name: 'Instagram Story', size: '1080x1920', priority: 'P0', gradient: 'linear-gradient(180deg, var(--surface), rgba(201,168,76,0.03))' },
    { num: '05', name: 'Instagram Carrossel', size: '1080x1080 x5', priority: 'P1', gradient: 'linear-gradient(135deg, #12121A, #1a1a2e)' },
    { num: '06', name: 'Email HTML', size: '600px width', priority: 'P0', gradient: 'linear-gradient(180deg, #1A1A24, #12121A)' },
    { num: '07', name: 'Press Kit (A4)', size: '210x297mm', priority: 'P1', gradient: 'linear-gradient(135deg, #FAF8F5, #F5F0E8)' },
    { num: '08', name: 'Stand Feira do Livro', size: 'Planta + elevacoes', priority: 'P1', gradient: 'linear-gradient(135deg, var(--surface), rgba(201,168,76,0.08))' },
    { num: '09', name: 'Cartao de Visita', size: '85x55mm', priority: 'P2', gradient: 'linear-gradient(135deg, #0A0A0F, rgba(201,168,76,0.1))' },
    { num: '10', name: 'Bookmark Promocional', size: '50x150mm', priority: 'P2', gradient: 'linear-gradient(180deg, #0A0A0F, rgba(201,168,76,0.05))' },
    { num: '11', name: 'Facebook Cover', size: '820x312', priority: 'P1', gradient: 'linear-gradient(135deg, var(--surface), #1a1a2e)' },
    { num: '12', name: 'LinkedIn Banner', size: '1584x396', priority: 'P1', gradient: 'linear-gradient(135deg, #12121A, var(--surface))' },
    { num: '13', name: 'YouTube Thumbnail', size: '1280x720', priority: 'P1', gradient: 'linear-gradient(135deg, var(--surface), rgba(201,168,76,0.05))' },
    { num: '14', name: 'WhatsApp Stickers', size: '512x512', priority: 'P2', gradient: 'linear-gradient(135deg, #1a1a2e, #12121A)' },
    { num: '15', name: 'Mockup 3D do Livro', size: '2000x2000', priority: 'P0', gradient: 'linear-gradient(135deg, rgba(201,168,76,0.08), var(--surface))' },
    { num: '16', name: 'Capa Ebook (Kindle)', size: '1600x2560', priority: 'P2', gradient: 'linear-gradient(180deg, #0A0A0F, #12121A)' },
  ];
  const priorityColors = { P0: 'var(--gold)', P1: 'var(--smoke)', P2: 'rgba(107,107,123,0.6)' };
  return `
    <div class="mockup-grid">
      ${mockups.map(m => `
        <div class="mockup-card">
          <div class="mockup-preview" style="background:${m.gradient}">
            <span class="mockup-num">${m.num}</span>
          </div>
          <div class="mockup-info">
            <span class="mockup-name">${m.name}</span>
            <span class="mockup-size">${m.size}</span>
            <span class="mockup-priority" style="color:${priorityColors[m.priority]}">${m.priority}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}


// ─── Render section content ─────────────────────────────────
function renderSection(section) {
  const num = parseInt(section.num);

  // Custom visual sections
  const visualParts = {};

  if (num === 3) visualParts.spectrum = generateSection03Spectrum();
  if (num === 6) visualParts.truelines = generateSection06Truelines();
  if (num === 9) visualParts.journey = generateSection09Journey();
  if (num === 11) return generateSection11Colors();
  if (num === 12) return generateSection12Typography();
  if (num === 13) return generateSection13Glass();
  if (num === 14) return generateSection14Components();
  if (num === 15) return generateSection15Icons();
  if (num === 16) return generateSection16Mockups();

  // For text sections: convert markdown but strip code blocks that show CSS
  let content = section.content;

  // Remove CSS code blocks (we render them visually instead)
  content = content.replace(/```css[\s\S]*?```/g, '');
  // Remove ASCII art / code blocks but keep text
  content = content.replace(/```[\s\S]*?```/g, (match) => {
    // Keep non-CSS code blocks as styled elements
    const inner = match.replace(/```\w*\n?/, '').replace(/```$/, '').trim();
    if (inner.includes('{') && inner.includes('}')) return ''; // CSS-like, remove
    return `<div class="ascii-diagram">${inner.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
  });

  let html = marked.parse(content);

  // Inject visual parts after the main markdown
  if (visualParts.spectrum) html += visualParts.spectrum;
  if (visualParts.truelines) html += visualParts.truelines;
  if (visualParts.journey) html += visualParts.journey;

  return html;
}


// ─── Build sidebar items ────────────────────────────────────
function buildSidebar() {
  let currentBlock = '';
  let html = '';
  for (const s of sections) {
    if (s.block !== currentBlock) {
      currentBlock = s.block;
      const label = blockLabels[currentBlock] || currentBlock;
      html += `<div class="sidebar-block-label">${label}</div>`;
    }
    html += `<a href="#${s.id}" class="sidebar-item" data-target="${s.id}"><span class="sidebar-num">${s.num}</span><span class="sidebar-title">${s.title}</span></a>`;
  }
  return html;
}

// ─── Build nav tabs HTML ────────────────────────────────────
function buildNavTabs() {
  return navTabs.map(t => `<a href="#block-${t.id}" class="nav-tab" data-block="${t.id}">${t.label}</a>`).join('');
}

// ─── Build main content ─────────────────────────────────────
function buildContent() {
  let html = '';
  let currentBlock = '';
  for (const s of sections) {
    if (s.block !== currentBlock) {
      currentBlock = s.block;
      html += `<div id="block-${currentBlock}" class="block-anchor"></div>`;
    }
    html += `
      <section id="${s.id}" class="content-section" data-block="${s.block}">
        <div class="section-tag">${s.num} // ${s.title.toUpperCase()}</div>
        <h2 class="section-title">${s.title}</h2>
        <div class="section-body">${renderSection(s)}</div>
      </section>
    `;
  }
  return html;
}

// ─── Assemble HTML ──────────────────────────────────────────
const finalHTML = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brandbook Estrategico — O Livro do Ano Milionario</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    /* ─── CSS Variables ────────────────────────────── */
    :root {
      --bg: #0A0A0F;
      --surface: #12121A;
      --gold: #C9A84C;
      --amber: #E8B94A;
      --ivory: #F5F0E8;
      --smoke: #6B6B7B;
      --charcoal: #1A1A24;
      --glass-bg: rgba(255,255,255,0.03);
      --glass-border: rgba(255,255,255,0.08);
      --gold-glass: rgba(201,168,76,0.08);
      --gold-border: rgba(201,168,76,0.15);
    }

    /* ─── Reset & Base ─────────────────────────────── */
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; scroll-padding-top:80px; }
    body {
      font-family:'Inter',sans-serif;
      background:var(--bg);
      color:var(--ivory);
      line-height:1.75;
      -webkit-font-smoothing:antialiased;
    }
    a { color:var(--gold); text-decoration:none; }
    img { max-width:100%; }
    ::selection { background:rgba(201,168,76,0.3); color:var(--ivory); }

    /* ─── Header ───────────────────────────────────── */
    .header {
      position:fixed; top:0; left:0; right:0; z-index:200;
      background:rgba(10,10,15,0.95);
      backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
      border-bottom:1px solid rgba(255,255,255,0.06);
      display:flex; align-items:center; justify-content:space-between;
      padding:0 2rem; height:56px;
    }
    .header-brand {
      font-family:'Playfair Display',serif;
      font-weight:700; font-size:1.1rem; color:var(--gold);
      white-space:nowrap;
    }
    .nav-tabs { display:flex; gap:0; }
    .nav-tab {
      padding:1rem 1.25rem; font-size:0.7rem; font-weight:700;
      letter-spacing:0.08em; text-transform:uppercase; color:var(--smoke);
      font-family:'JetBrains Mono',monospace; transition:color 0.2s;
      border-bottom:2px solid transparent;
    }
    .nav-tab:hover, .nav-tab.active { color:var(--gold); border-bottom-color:var(--gold); }

    /* ─── Layout ───────────────────────────────────── */
    .layout { display:flex; margin-top:56px; min-height:calc(100vh - 56px); }

    /* ─── Sidebar ──────────────────────────────────── */
    .sidebar {
      width:280px; min-width:280px; max-height:calc(100vh - 56px);
      overflow-y:auto; position:sticky; top:56px;
      background:var(--surface);
      border-right:1px solid rgba(255,255,255,0.04);
      padding:1.5rem 0;
    }
    .sidebar::-webkit-scrollbar { width:4px; }
    .sidebar::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:2px; }
    .sidebar-badge {
      display:block; margin:0 1.25rem 1.5rem; padding:0.6rem 1rem;
      background:var(--gold-glass); border:1px solid var(--gold-border);
      border-radius:8px; text-align:center;
      font-family:'JetBrains Mono',monospace; font-size:0.6rem;
      font-weight:700; letter-spacing:0.1em; color:var(--gold);
      text-transform:uppercase;
    }
    .sidebar-block-label {
      padding:1.25rem 1.5rem 0.4rem; font-size:0.6rem;
      font-family:'JetBrains Mono',monospace; font-weight:700;
      letter-spacing:0.12em; text-transform:uppercase; color:var(--smoke);
    }
    .sidebar-item {
      display:flex; align-items:center; gap:0.75rem;
      padding:0.55rem 1.5rem; color:var(--smoke); transition:all 0.15s;
      font-size:0.85rem;
    }
    .sidebar-item:hover { color:var(--ivory); background:rgba(255,255,255,0.02); }
    .sidebar-item.active { color:var(--gold); background:rgba(201,168,76,0.05); border-right:2px solid var(--gold); }
    .sidebar-num {
      font-family:'JetBrains Mono',monospace; font-size:0.7rem;
      font-weight:700; min-width:1.5rem; color:inherit; opacity:0.6;
    }
    .sidebar-title { font-weight:500; }

    /* ─── Main Content ─────────────────────────────── */
    .main { flex:1; max-width:900px; padding:3rem 4rem; }
    .block-anchor { scroll-margin-top:70px; }

    .content-section { margin-bottom:5rem; scroll-margin-top:70px; }
    .section-tag {
      font-family:'JetBrains Mono',monospace;
      font-size:0.65rem; font-weight:700;
      letter-spacing:0.12em; text-transform:uppercase;
      color:var(--gold); margin-bottom:0.5rem;
    }
    .section-title {
      font-family:'Playfair Display',serif;
      font-size:2rem; font-weight:700; color:var(--ivory);
      margin-bottom:2rem; letter-spacing:-0.02em;
    }

    /* ─── Markdown Content Styles ──────────────────── */
    .section-body h3 {
      font-family:'Playfair Display',serif;
      font-size:1.4rem; font-weight:700; color:var(--ivory);
      margin:2.5rem 0 1rem; letter-spacing:-0.01em;
    }
    .section-body h4 {
      font-family:'Inter',sans-serif;
      font-size:1.1rem; font-weight:600; color:var(--ivory);
      margin:2rem 0 0.75rem;
    }
    .section-body p { margin-bottom:1rem; color:rgba(245,240,232,0.85); }
    .section-body strong { color:var(--ivory); font-weight:600; }
    .section-body blockquote {
      border-left:3px solid var(--gold);
      padding:1rem 1.5rem; margin:1.5rem 0;
      background:var(--gold-glass); border-radius:0 8px 8px 0;
      font-family:'Playfair Display',serif;
      font-size:1.1rem; font-style:italic;
      color:var(--ivory);
    }
    .section-body ul, .section-body ol { padding-left:1.5rem; margin-bottom:1rem; }
    .section-body li { margin-bottom:0.4rem; color:rgba(245,240,232,0.8); }
    .section-body table {
      width:100%; border-collapse:collapse; margin:1.5rem 0;
      background:var(--glass-bg); border-radius:12px; overflow:hidden;
    }
    .section-body thead th {
      background:rgba(201,168,76,0.06);
      padding:0.75rem 1rem; text-align:left;
      font-family:'JetBrains Mono',monospace; font-size:0.7rem;
      font-weight:700; letter-spacing:0.08em; text-transform:uppercase;
      color:var(--gold); border-bottom:1px solid var(--glass-border);
    }
    .section-body tbody td {
      padding:0.65rem 1rem; border-bottom:1px solid rgba(255,255,255,0.03);
      font-size:0.9rem; color:rgba(245,240,232,0.8);
    }
    .section-body tbody tr:last-child td { border-bottom:none; }
    .section-body tbody tr:hover { background:rgba(255,255,255,0.02); }
    .section-body code {
      font-family:'JetBrains Mono',monospace;
      font-size:0.85em; background:rgba(201,168,76,0.08);
      padding:0.15em 0.4em; border-radius:4px; color:var(--gold);
    }
    .section-body hr { border:none; border-top:1px solid rgba(255,255,255,0.06); margin:2rem 0; }
    .ascii-diagram {
      font-family:'JetBrains Mono',monospace;
      font-size:0.75rem; line-height:1.5;
      background:rgba(255,255,255,0.02);
      border:1px solid rgba(255,255,255,0.06);
      border-radius:12px; padding:1.5rem; margin:1.5rem 0;
      overflow-x:auto; white-space:pre; color:var(--smoke);
    }
    .section-subtitle {
      font-family:'Playfair Display',serif;
      font-size:1.3rem; font-weight:700; color:var(--ivory);
      margin:2rem 0 1.5rem;
    }

    /* ─── Spectrum (Section 03) ────────────────────── */
    .spectrum-container { margin-top:2rem; }
    .spectrum-row { display:flex; align-items:center; gap:1rem; margin-bottom:1.25rem; }
    .spectrum-label-left, .spectrum-label-right {
      font-family:'JetBrains Mono',monospace;
      font-size:0.7rem; font-weight:700; letter-spacing:0.05em;
      color:var(--smoke); min-width:80px; text-transform:uppercase;
    }
    .spectrum-label-left { text-align:right; }
    .spectrum-label-right { text-align:left; }
    .spectrum-bar {
      flex:1; height:4px; background:rgba(255,255,255,0.06);
      border-radius:2px; position:relative;
    }
    .spectrum-track { position:absolute; top:0; left:0; right:0; bottom:0; border-radius:2px; }
    .spectrum-dot {
      position:absolute; top:50%; width:16px; height:16px;
      background:var(--gold); border-radius:50%;
      transform:translate(-50%,-50%);
      box-shadow:0 0 12px rgba(201,168,76,0.4);
    }
    .spectrum-note { margin-top:1.5rem; font-size:0.9rem; color:var(--smoke); }

    /* ─── Truelines (Section 06) ───────────────────── */
    .truelines-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:1.25rem; margin-top:2rem; }
    .trueline-card {
      background:var(--gold-glass); border:1px solid var(--gold-border);
      border-radius:16px; padding:1.5rem; position:relative; overflow:hidden;
      transition:all 0.3s;
    }
    .trueline-card:hover { background:rgba(201,168,76,0.12); border-color:rgba(201,168,76,0.25); box-shadow:0 0 20px rgba(201,168,76,0.1); }
    .trueline-id {
      font-family:'JetBrains Mono',monospace;
      font-size:0.6rem; font-weight:700; letter-spacing:0.12em;
      color:var(--gold); margin-bottom:0.25rem;
    }
    .trueline-label { font-size:0.8rem; color:var(--smoke); margin-bottom:0.75rem; }
    .trueline-quote {
      font-family:'Playfair Display',serif;
      font-size:1.05rem; font-weight:700; color:var(--ivory);
      line-height:1.4; border:none; padding:0; margin:0; background:none;
    }

    /* ─── Journey (Section 09) ─────────────────────── */
    .journey-timeline { margin-top:2rem; }
    .journey-stage { display:flex; gap:1.5rem; }
    .journey-connector { display:flex; flex-direction:column; align-items:center; min-width:40px; }
    .journey-dot {
      width:40px; height:40px; border-radius:50%;
      background:var(--gold-glass); border:2px solid var(--gold);
      display:flex; align-items:center; justify-content:center;
      font-family:'JetBrains Mono',monospace; font-weight:700;
      font-size:0.8rem; color:var(--gold); flex-shrink:0;
    }
    .journey-line {
      width:2px; flex:1; background:linear-gradient(180deg,var(--gold),rgba(201,168,76,0.1));
      margin:4px 0;
    }
    .journey-content { flex:1; margin-bottom:1rem; }
    .glass-card-sm {
      background:var(--glass-bg); border:1px solid var(--glass-border);
      border-radius:12px; padding:1.25rem;
    }
    .journey-stage-name { font-weight:700; color:var(--ivory); margin-bottom:0.35rem; font-size:1rem; }
    .journey-stage-desc { font-size:0.85rem; color:var(--smoke); line-height:1.6; }
    .journey-stage-last .journey-dot { background:var(--gold); color:var(--bg); }

    /* ─── Colors (Section 11) ──────────────────────── */
    .color-group { margin-bottom:2.5rem; }
    .color-group-label {
      font-family:'JetBrains Mono',monospace;
      font-size:0.65rem; font-weight:700; letter-spacing:0.1em;
      text-transform:uppercase; color:var(--gold); margin-bottom:1rem;
    }
    .color-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:1rem; }
    .color-swatch {
      height:120px; border-radius:12px; position:relative;
      border:1px solid rgba(255,255,255,0.06);
      display:flex; align-items:flex-end; overflow:hidden;
      transition:transform 0.2s;
    }
    .color-swatch:hover { transform:scale(1.03); }
    .swatch-info {
      width:100%; padding:0.6rem 0.75rem;
      background:linear-gradient(to top,rgba(0,0,0,0.6),transparent);
      display:flex; flex-direction:column; gap:0.1rem;
    }
    .swatch-info.swatch-light .swatch-name, .swatch-info.swatch-light .swatch-hex, .swatch-info.swatch-light .swatch-rgb { color:#F5F0E8; }
    .swatch-info.swatch-dark .swatch-name { color:#0A0A0F; }
    .swatch-info.swatch-dark .swatch-hex { color:rgba(10,10,15,0.7); }
    .swatch-info.swatch-dark .swatch-rgb { color:rgba(10,10,15,0.5); }
    .swatch-name { font-weight:700; font-size:0.85rem; }
    .swatch-hex { font-family:'JetBrains Mono',monospace; font-size:0.7rem; }
    .swatch-rgb { font-family:'JetBrains Mono',monospace; font-size:0.6rem; opacity:0.7; }
    .gradient-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:1rem; }
    .gradient-swatch { display:flex; flex-direction:column; gap:0.5rem; }
    .gradient-preview {
      height:80px; border-radius:12px;
      border:1px solid rgba(255,255,255,0.06);
    }
    .gradient-name { font-size:0.8rem; color:var(--smoke); text-align:center; }

    /* ─── Typography (Section 12) ──────────────────── */
    .type-scale { margin-bottom:3rem; }
    .type-row {
      display:flex; align-items:flex-start; gap:1.5rem;
      padding:1.25rem 0; border-bottom:1px solid rgba(255,255,255,0.04);
    }
    .type-label {
      font-family:'JetBrains Mono',monospace;
      font-size:0.65rem; font-weight:700; letter-spacing:0.08em;
      text-transform:uppercase; color:var(--gold);
      min-width:70px; padding-top:0.5rem;
    }
    .type-sample-wrap { flex:1; display:flex; flex-direction:column; gap:0.5rem; }
    .type-meta { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:var(--smoke); }
    .type-families { margin-top:2rem; }
    .type-families-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
    .type-family-card { display:flex; flex-direction:column; gap:0.5rem; text-align:center; }
    .type-family-role { font-size:0.8rem; color:var(--smoke); }
    .type-family-weights { font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:var(--smoke); opacity:0.6; }

    /* ─── Glass (Section 13) ───────────────────────── */
    .glass-demo-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:1rem; margin-bottom:2.5rem; }
    .glass-demo-card { min-height:140px; display:flex; flex-direction:column; justify-content:flex-end; }
    .glass-label {
      font-family:'JetBrains Mono',monospace; font-size:0.6rem; font-weight:700;
      letter-spacing:0.12em; color:var(--smoke); margin-bottom:0.25rem;
    }
    .glass-name { font-weight:700; color:var(--ivory); font-size:1rem; margin-bottom:0.25rem; }
    .glass-specs { font-size:0.75rem; color:var(--smoke); }
    .glass-light-bar {
      position:absolute; top:0; left:15%; right:15%; height:1px;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);
    }
    .glass-light-bar-gold {
      position:absolute; top:0; left:15%; right:15%; height:1px;
      background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);
    }
    .glass-effects-demo { margin-top:1rem; }
    .glass-effects-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
    .glass-effect-card { display:flex; flex-direction:column; gap:0.5rem; }
    .glass-effect-label { font-weight:700; font-size:0.9rem; color:var(--ivory); }
    .glass-effect-desc { font-size:0.75rem; color:var(--smoke); }
    .glass-top-glow {
      position:absolute; top:0; left:10%; right:10%; height:1px;
      background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);
    }
    .glow-gold { box-shadow:0 0 20px rgba(201,168,76,0.15),0 0 40px rgba(201,168,76,0.05); }
    .pulse-gold-card { animation:pulse-gold 2s infinite; }
    @keyframes pulse-gold {
      0%,100% { box-shadow:0 0 20px rgba(201,168,76,0.2); }
      50% { box-shadow:0 0 30px rgba(201,168,76,0.35); }
    }

    /* ─── Components (Section 14) ──────────────────── */
    .component-section { margin-bottom:2.5rem; }
    .comp-category {
      font-family:'JetBrains Mono',monospace;
      font-size:0.65rem; font-weight:700; letter-spacing:0.1em;
      text-transform:uppercase; color:var(--gold);
      margin-bottom:1rem; padding-bottom:0.5rem;
      border-bottom:1px solid rgba(201,168,76,0.15);
    }
    .comp-row { display:flex; flex-wrap:wrap; gap:1.5rem; align-items:flex-start; }
    .comp-item { display:flex; flex-direction:column; gap:0.5rem; }
    .comp-label { font-size:0.7rem; color:var(--smoke); font-family:'JetBrains Mono',monospace; }

    .btn-demo-primary {
      background:#C9A84C; color:#0A0A0F; padding:0.75rem 1.5rem;
      border:none; border-radius:8px; font-family:'Inter',sans-serif;
      font-weight:700; font-size:0.95rem; letter-spacing:0.02em;
      cursor:pointer; box-shadow:0 0 20px rgba(201,168,76,0.25);
      transition:all 0.25s cubic-bezier(0.4,0,0.2,1);
    }
    .btn-demo-primary.btn-hover { background:#E8B94A; box-shadow:0 0 30px rgba(201,168,76,0.4); transform:translateY(-1px); }
    .btn-demo-ghost {
      background:transparent; color:#C9A84C; padding:0.75rem 1.5rem;
      border:1px solid rgba(201,168,76,0.3); border-radius:8px;
      font-family:'Inter',sans-serif; font-weight:600; font-size:0.95rem;
      cursor:pointer; transition:all 0.25s;
    }
    .btn-demo-ghost.btn-ghost-hover { background:rgba(201,168,76,0.08); border-color:rgba(201,168,76,0.5); }
    .input-demo {
      background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.10);
      border-radius:8px; padding:0.75rem 1rem; font-family:'Inter',sans-serif;
      font-size:1rem; color:var(--ivory); width:100%; outline:none;
    }
    .input-demo::placeholder { color:var(--smoke); }
    .input-demo.input-focus { border-color:rgba(201,168,76,0.4); box-shadow:0 0 0 3px rgba(201,168,76,0.1); }

    .badge-demo {
      display:inline-flex; align-items:center; gap:0.4rem;
      background:var(--gold-glass); border:1px solid var(--gold-border);
      border-radius:20px; padding:0.35rem 1rem;
      font-family:'JetBrains Mono',monospace; font-size:0.68rem;
      font-weight:700; letter-spacing:0.08em; color:var(--gold);
    }
    .badge-demo.gold { background:rgba(201,168,76,0.12); border-color:rgba(201,168,76,0.25); }
    .badge-demo.neutral { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.08); color:var(--smoke); }

    .card-inspiration-demo {
      background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08);
      border-radius:16px; backdrop-filter:blur(12px); padding:2rem;
      position:relative; overflow:hidden; max-width:450px;
    }
    .card-insp-light {
      position:absolute; top:0; left:10%; right:10%; height:1px;
      background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);
    }
    .card-insp-day {
      font-family:'JetBrains Mono',monospace; font-size:0.65rem;
      font-weight:700; letter-spacing:0.12em; text-transform:uppercase;
      color:var(--gold); margin-bottom:0.75rem;
    }
    .card-insp-quote {
      font-family:'Playfair Display',serif; font-size:1.3rem;
      font-weight:700; color:var(--ivory); line-height:1.4; margin-bottom:1rem;
    }

    .card-testimonial-demo {
      background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06);
      border-radius:16px; backdrop-filter:blur(8px); padding:1.5rem;
      display:flex; gap:1rem; max-width:500px;
    }
    .testimonial-avatar {
      width:48px; height:48px; border-radius:50%;
      border:2px solid rgba(201,168,76,0.3);
      display:flex; align-items:center; justify-content:center;
      font-family:'Inter',sans-serif; font-weight:700;
      font-size:0.85rem; color:var(--gold); flex-shrink:0;
      background:rgba(201,168,76,0.08);
    }
    .testimonial-body { flex:1; }
    .testimonial-quote-mark {
      font-family:'Playfair Display',serif; font-size:2rem;
      color:rgba(201,168,76,0.3); line-height:1;
    }
    .testimonial-text { font-size:0.9rem; color:var(--ivory); margin-bottom:0.5rem; line-height:1.6; }
    .testimonial-author { font-size:0.75rem; color:var(--smoke); }

    .countdown-demo { display:flex; gap:1rem; }
    .countdown-unit {
      background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08);
      border-radius:12px; padding:1rem; min-width:80px; text-align:center;
    }
    .countdown-num {
      font-family:'JetBrains Mono',monospace; font-size:2.4rem;
      font-weight:700; color:var(--gold); line-height:1; display:block;
    }
    .countdown-label {
      font-family:'Inter',sans-serif; font-size:0.7rem; font-weight:500;
      color:var(--smoke); text-transform:uppercase; letter-spacing:0.05em;
      margin-top:0.25rem; display:block;
    }

    .navbar-demo {
      width:100%; background:rgba(10,10,15,0.85);
      border:1px solid rgba(255,255,255,0.06);
      border-radius:12px; backdrop-filter:blur(16px);
      padding:0.75rem 1.5rem; display:flex;
      align-items:center; justify-content:space-between;
    }
    .navbar-logo { font-family:'Playfair Display',serif; font-weight:700; color:var(--ivory); font-size:0.95rem; }
    .navbar-links { display:flex; align-items:center; gap:1.5rem; font-size:0.85rem; color:var(--smoke); }

    /* ─── Icons (Section 15) ───────────────────────── */
    .icon-section { margin-bottom:2.5rem; }
    .icon-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(90px,1fr)); gap:1rem; }
    .icon-item { display:flex; flex-direction:column; align-items:center; gap:0.4rem; text-align:center; }
    .icon-circle {
      width:56px; height:56px; border-radius:50%;
      background:var(--gold-glass); border:1px solid var(--gold-border);
      display:flex; align-items:center; justify-content:center;
      color:var(--gold); transition:all 0.2s;
    }
    .icon-circle:hover { background:rgba(201,168,76,0.15); box-shadow:0 0 15px rgba(201,168,76,0.2); }
    .icon-circle.func { background:var(--glass-bg); border-color:var(--glass-border); color:var(--ivory); }
    .icon-circle.func:hover { background:rgba(255,255,255,0.06); }
    .icon-circle svg, .icon-circle i { width:22px; height:22px; }
    .icon-pilar-num { font-family:'JetBrains Mono',monospace; font-size:0.6rem; font-weight:700; color:var(--gold); }
    .icon-name { font-size:0.65rem; color:var(--smoke); line-height:1.3; }
    .specs-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:0.75rem; }
    .specs-grid > div { display:flex; justify-content:space-between; }
    .spec-label { font-size:0.8rem; color:var(--smoke); }
    .spec-value { font-size:0.8rem; font-family:'JetBrains Mono',monospace; }

    /* ─── Mockups (Section 16) ─────────────────────── */
    .mockup-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:1rem; }
    .mockup-card {
      background:var(--glass-bg); border:1px solid var(--glass-border);
      border-radius:12px; overflow:hidden; transition:all 0.2s;
    }
    .mockup-card:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(0,0,0,0.3); }
    .mockup-preview {
      height:140px; display:flex; align-items:center; justify-content:center;
      position:relative;
    }
    .mockup-num {
      font-family:'JetBrains Mono',monospace; font-size:2rem;
      font-weight:700; color:rgba(201,168,76,0.2);
    }
    .mockup-info { padding:1rem; display:flex; flex-direction:column; gap:0.2rem; }
    .mockup-name { font-weight:600; font-size:0.85rem; color:var(--ivory); }
    .mockup-size { font-family:'JetBrains Mono',monospace; font-size:0.7rem; color:var(--smoke); }
    .mockup-priority { font-family:'JetBrains Mono',monospace; font-size:0.65rem; font-weight:700; }

    /* ─── Responsive ───────────────────────────────── */
    @media (max-width:1024px) {
      .sidebar { display:none; }
      .main { padding:2rem; max-width:100%; }
      .nav-tab { padding:0.75rem 0.75rem; font-size:0.6rem; }
      .type-families-grid { grid-template-columns:1fr; }
      .glass-effects-grid { grid-template-columns:1fr; }
    }
    @media (max-width:640px) {
      .header { padding:0 1rem; }
      .nav-tabs { overflow-x:auto; gap:0; }
      .nav-tab { white-space:nowrap; padding:0.75rem 0.6rem; font-size:0.55rem; }
      .main { padding:1.5rem; }
      .section-title { font-size:1.6rem; }
      .comp-row { flex-direction:column; }
      .countdown-demo { flex-wrap:wrap; justify-content:center; }
    }
  </style>
</head>
<body>

  <!-- Header -->
  <header class="header">
    <div class="header-brand">O Livro do Ano Milionario</div>
    <nav class="nav-tabs">${buildNavTabs()}</nav>
  </header>

  <!-- Layout -->
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-badge">Brandbook Estrategico</div>
      ${buildSidebar()}
    </aside>

    <!-- Main -->
    <main class="main">
      ${buildContent()}
    </main>
  </div>

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
  <script>
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Scroll-spy for sidebar
    (function() {
      const sidebarItems = document.querySelectorAll('.sidebar-item');
      const sectionEls = document.querySelectorAll('.content-section');
      const navTabEls = document.querySelectorAll('.nav-tab');

      function updateActive() {
        let current = '';
        let currentBlock = '';
        for (const sec of sectionEls) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 120) {
            current = sec.id;
            currentBlock = sec.dataset.block;
          }
        }
        sidebarItems.forEach(item => {
          item.classList.toggle('active', item.dataset.target === current);
        });
        navTabEls.forEach(tab => {
          tab.classList.toggle('active', tab.dataset.block === currentBlock);
        });
      }

      window.addEventListener('scroll', updateActive, { passive:true });
      updateActive();
    })();
  </script>

</body>
</html>`;

fs.writeFileSync('BRANDBOOK-V2.html', finalHTML, 'utf-8');
console.log('BRANDBOOK-V2.html generated successfully (' + Math.round(finalHTML.length / 1024) + ' KB)');
