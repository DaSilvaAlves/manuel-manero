# Arquitectura — Manuel Manero Premium Site
**Data:** 21 Fev 2026 | **Agente:** @architect (Aria)
**Input:** UX Analysis (Uma) + Análise do site live + Código actual `/site`
**Objectivo:** Arquitectar versão premium completa do `/site`

---

## 1. DIAGNÓSTICO DO ESTADO ACTUAL

### O que já está bem (MANTER)
O site actual (`manuel-manero.vercel.app`) é **já premium** em termos de design:
- ✅ Dark theme `bg-slate-950` — mais sofisticado que o manuelmanero.pt
- ✅ `Playfair Display` (serif) + `Inter` — tipografia editorial de alto nível
- ✅ Gold gradient metálico (`#BF953F → #FCF6BA → #AA771C`) — superior ao `#FFD54F` plano
- ✅ Glassmorphism cards (`backdrop-blur-md`)
- ✅ AI Quiz funcional (Gemini API)
- ✅ AI Chat widget flutuante
- ✅ Navbar com scroll behavior (glassmorphism ao scroll)
- ✅ Stack correcta: Vite + React 19 + TypeScript + TailwindCSS

### O que está INCOMPLETO (CONSTRUIR)
| O que falta | Prioridade |
|-------------|-----------|
| Páginas stub (`/sobre`, `/programas`) sem conteúdo real | ALTA |
| Páginas inexistentes (`/livros`, `/testemunhos`, `/escola`, `/contactos`, `/comunidade`) | ALTA |
| Hamburger menu mobile (navbar não tem) | ALTA |
| Formulário de contacto funcional | ALTA |
| Imagem real do Manuel (usa Unsplash placeholder) | ALTA |
| Testemunhos reais (usa picsum + texto fictício) | ALTA |
| Links sociais mortos no footer | MÉDIA |
| Banner topo sticky (promoção programa) | MÉDIA |
| Newsletter section | MÉDIA |
| Tailwind via CDN (deve ser npm install) | MÉDIA |
| Secção "Sobre" completa com credenciais | ALTA |
| Secção Livros com os 3 livros reais | ALTA |

---

## 2. ARQUITECTURA DE PÁGINAS

### Estrutura de Rotas

```
/                    → Home (completa)
/sobre               → Sobre Manuel (completa)
/programas           → Programas detalhados
/comunidade          → Comunidade Milionária
/escola              → Escola de Empreendedorismo
/livros              → Os 3 livros
/testemunhos         → Página de provas sociais
/contactos           → Formulário + contactos
```

### Home — Secções (ordem)

```
1. TopBanner          — sticky, "Programa de Mentoria PREMIUM" → link externo
2. Navbar             — glassmorphism scroll + hamburger mobile
3. HeroSection        — foto real + gold gradient H1 + 2 CTAs
4. PillarsSection     — 4 pilares PRIME (já existe, melhorar)
5. AboutSnippet       — bio curta + credenciais + foto Manuel
6. AIQuizSection      — diagnóstico IA (já existe)
7. ProgramsGrid       — 4 cards (adicionar 4º: Mentoria Privada)
8. PhilosophyBanner   — frase de marca em destaque
9. TestimonialsSection — grid de testemunhos (expandir)
10. StatsSection      — contadores animados (10k+, 5k+, 15+)
11. NewsletterSection — captura de email
12. ContactSection    — formulário + dados
13. Footer            — 4 colunas + social links reais
```

---

## 3. ARQUITECTURA DE COMPONENTES

### Estrutura de Ficheiros

```
site/
├── index.html
├── index.tsx
├── App.tsx
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts        ← NOVO (mover de CDN para npm)
├── postcss.config.ts         ← NOVO
│
├── components/
│   ├── layout/
│   │   ├── Layout.tsx        (existente — adicionar TopBanner)
│   │   ├── Navbar.tsx        (separar de Layout — adicionar mobile menu)
│   │   ├── Footer.tsx        (separar de Layout — expandir)
│   │   └── TopBanner.tsx     ← NOVO
│   │
│   ├── ui/                   ← NOVO (atoms)
│   │   ├── Button.tsx        (variantes: primary, outline, ghost)
│   │   ├── Badge.tsx         (ex: "POSICIONAMENTO DE ELITE")
│   │   ├── GoldText.tsx      (gold-gradient wrapper)
│   │   ├── GlassCard.tsx     (glassmorphism card)
│   │   └── SectionTitle.tsx  (H2 + subtítulo padrão)
│   │
│   ├── sections/             ← NOVO (organisms)
│   │   ├── HeroSection.tsx
│   │   ├── PillarsSection.tsx
│   │   ├── AboutSection.tsx  ← NOVO
│   │   ├── ProgramsSection.tsx
│   │   ├── PhilosophyBanner.tsx ← NOVO
│   │   ├── StatsSection.tsx  ← NOVO (contadores animados)
│   │   ├── TestimonialsSection.tsx
│   │   ├── NewsletterSection.tsx ← NOVO
│   │   └── ContactSection.tsx ← NOVO
│   │
│   ├── AIChat.tsx            (existente)
│   └── AIQuiz.tsx            (existente)
│
├── pages/
│   ├── Home.tsx              (refactor: usar sections/)
│   ├── Sobre.tsx             ← NOVO (completo)
│   ├── Programas.tsx         ← NOVO (completo)
│   ├── Comunidade.tsx        ← NOVO
│   ├── Escola.tsx            ← NOVO
│   ├── Livros.tsx            ← NOVO
│   ├── Testemunhos.tsx       ← NOVO
│   └── Contactos.tsx         ← NOVO
│
├── services/
│   └── gemini.ts             (existente)
│
├── constants.tsx             (expandir com dados reais)
├── types.ts                  (expandir)
└── styles/
    └── globals.css           ← NOVO (mover styles de index.html)
```

---

## 4. DESIGN TOKENS

### Tailwind Config (`tailwind.config.ts`)

```typescript
export default {
  content: ['./index.html', './**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B38728',
          light:   '#FCF6BA',
          mid:     '#BF953F',
          dark:    '#AA771C',
        },
        brand: {
          dark:    '#0F172A',  // slate-950
          card:    '#1E293B',  // slate-900
          border:  '#334155',  // slate-700
          muted:   '#64748B',  // slate-500
          text:    '#CBD5E1',  // slate-300
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
}
```

### CSS Variables (`styles/globals.css`)

```css
:root {
  --gold-gradient: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
  --glass-bg: rgba(15, 23, 42, 0.8);
  --glass-border: rgba(255, 255, 255, 0.08);
  --transition-default: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.gold-gradient {
  background: var(--gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
}

.section-padding {
  padding: 6rem 0;
}
```

---

## 5. ESTRUTURA DE DADOS (`constants.tsx`)

### Tipos expandidos (`types.ts`)

```typescript
export interface Program {
  id: string;
  title: string;
  tagline: string;
  description: string;
  level: string;
  features: string[];
  cta: string;
  ctaLink: string;        // NOVO — URL externo
  price?: string;         // NOVO — opcional
  highlight?: boolean;    // NOVO — destaque visual
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  program?: string;       // NOVO — qual programa
}

export interface Book {                // NOVO
  id: string;
  title: string;
  price: string;
  description: string;
  cover: string;
  buyLink: string;
}

export interface SocialLink {         // NOVO
  name: string;
  url: string;
  icon: string;
}

export interface Stat {               // NOVO
  value: string;
  label: string;
}
```

### Dados reais a preencher

```typescript
// PROGRAMAS (4 — adicionar Mentoria Privada)
export const PROGRAMS: Program[] = [
  { id: 'prime',    title: 'Método PRIME', ... ctaLink: 'https://sites.google.com/view/programadementoriapremium' },
  { id: 'mastery',  title: 'Personal Branding MASTERY', ... ctaLink: 'https://personalbrandingmastery.pt', highlight: true },
  { id: 'comunidade', title: 'Comunidade Milionária', ... ctaLink: 'https://comunidademilionaria.pt' },
  { id: 'mentoria', title: 'Mentoria Privada', ... ctaLink: 'https://subscribepage.io/mentoriaprivada' },
];

// LIVROS (3 livros reais)
export const BOOKS: Book[] = [
  { id: 'milionario',   title: 'O Livro do Milionário',               price: '€16.00', ... },
  { id: 'nomada',       title: 'Empreender Como Um Nómada Digital',   price: '€16.00', ... },
  { id: 'caixa',        title: 'Pensar e Agir Fora da Caixa',         price: '€16.00', ... },
];

// SOCIAL LINKS (reais)
export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/marca.manero/', icon: 'instagram' },
  { name: 'YouTube',   url: 'https://www.youtube.com/channel/UCxGFJ7O7qnA_FrfkKMIcGXA', icon: 'youtube' },
  { name: 'LinkedIn',  url: 'https://www.linkedin.com/in/manuelmanero/', icon: 'linkedin' },
  { name: 'Facebook',  url: 'https://www.facebook.com/manuelmanero.pt/', icon: 'facebook' },
  { name: 'Spotify',   url: 'https://open.spotify.com/show/0wsqUcORPnELb6fVYFJ3JV', icon: 'spotify' },
];

// STATS
export const STATS: Stat[] = [
  { value: '10k+', label: 'Impactados' },
  { value: '5k+',  label: 'Comunidade' },
  { value: '15+',  label: 'Anos Exp.' },
  { value: '3',    label: 'Livros' },
];
```

---

## 6. STACK TÉCNICA — DECISÕES

### Manter
| Tecnologia | Versão | Razão |
|-----------|--------|-------|
| Vite | 6.x | Build tool perfeito, HMR rápido |
| React | 19.x | Já em uso, estável |
| TypeScript | 5.8 | Type safety |
| react-router-dom | 7.x | Routing já configurado |
| @google/genai | 1.x | AI Chat/Quiz |

### Mudar
| Actual | Proposto | Razão |
|--------|---------|-------|
| Tailwind via CDN | `npm install tailwindcss` | Purging CSS, config custom, melhor performance |
| Styles inline em `index.html` | `styles/globals.css` | Separação de concerns |
| Componentes grandes | Componentes atómicos em `components/ui/` | Reutilização, manutenção |

### Adicionar (opcional, baixa prioridade)
| Tecnologia | Para quê | Quando |
|-----------|---------|--------|
| Framer Motion | Animações suaves (hero parallax, contadores, hover) | Fase 2 |
| React Hook Form | Formulário de contacto com validação | Fase 1 |
| Lucide React | Ícones consistentes (redes sociais, setas) | Fase 1 |

### NÃO adicionar
- Redux / Zustand — sem estado global complexo
- Backend próprio — formulário usa Google Forms embed
- Base de dados — conteúdo estático em constants.tsx
- SSR/Next.js — Vite suficiente para este caso

---

## 7. ESTRATÉGIA DE FORMULÁRIO DE CONTACTO

**Decisão:** Google Forms embed (sem backend)

**Razão:** Consistente com o que o Manuel já usa, zero manutenção, funciona imediatamente.

**Implementação:**
```tsx
// ContactSection.tsx
const ContactSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <SectionTitle title="Vamos Trabalhar Juntos?" subtitle="..." />
      <div className="grid md:grid-cols-2 gap-12">
        <ContactInfo />           {/* email, whatsapp, redes */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfj1XjCiUVEbeWBhnM3FhQdE9kCoZT7TptOYfjwiJ3gWW1BKA/viewform?embedded=true"
          className="w-full h-[600px] rounded-2xl border border-slate-800"
          title="Formulário de Contacto"
        />
      </div>
    </div>
  </section>
);
```

---

## 8. ESTRATÉGIA DE IMAGENS

**Problema actual:** Hero usa Unsplash placeholder, testemunhos usam picsum.

**Solução:**
- Imagens do Manuel → pasta `site/public/images/` (ficheiros locais)
- Capas dos livros → `site/public/images/livros/`
- Avatares de testemunhos → `site/public/images/testemunhos/`
- Fallback temporário → manter Unsplash/picsum até ter fotos reais

**O utilizador precisa fornecer:**
- 1 foto principal de Manuel (palco/speaking) para o hero
- Foto de perfil para a secção "Sobre"
- Capas dos 3 livros
- Fotos dos clientes que deram testemunhos (opcional)

---

## 9. MOBILE STRATEGY

### Navbar Mobile (FALTA)
```tsx
// Adicionar a Navbar.tsx
const [mobileOpen, setMobileOpen] = useState(false);

// Mobile menu overlay
{mobileOpen && (
  <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md md:hidden">
    <div className="flex flex-col items-center justify-center h-full gap-8">
      {navLinks.map(link => (
        <Link key={link.path} to={link.path}
          className="text-2xl font-display font-bold hover:text-amber-500"
          onClick={() => setMobileOpen(false)}
        >
          {link.name}
        </Link>
      ))}
    </div>
  </div>
)}
```

### Breakpoints (Tailwind)
```
sm:  640px  — tablet pequeno
md:  768px  — tablet
lg:  1024px — desktop pequeno
xl:  1280px — desktop
2xl: 1536px — desktop grande
```

---

## 10. ORDEM DE IMPLEMENTAÇÃO (para @dev)

### Fase 1 — Fundações (sem alterar o que está live)
```
1. Instalar Tailwind via npm (substituir CDN)
2. Criar tailwind.config.ts com design tokens
3. Criar styles/globals.css (mover styles de index.html)
4. Separar Navbar.tsx e Footer.tsx de Layout.tsx
5. Criar components/ui/ (Button, Badge, GlassCard, SectionTitle)
6. Expandir types.ts e constants.tsx com dados reais
```

### Fase 2 — Completar Home
```
7. Adicionar TopBanner.tsx
8. Implementar hamburger menu mobile na Navbar
9. Criar AboutSection.tsx (bio real + foto)
10. Criar StatsSection.tsx (contadores animados)
11. Expandir ProgramsSection para 4 cards com links reais
12. Criar PhilosophyBanner.tsx
13. Criar NewsletterSection.tsx
14. Criar ContactSection.tsx com Google Forms embed
15. Expandir Footer com links reais
```

### Fase 3 — Páginas em falta
```
16. /sobre     — completo (credenciais, foto, timeline)
17. /livros    — 3 livros com compra via contacto
18. /testemunhos — grid de testemunhos reais
19. /contactos  — contactos + formulário
20. /programas  — detalhes expandidos dos 4 programas
21. /comunidade — página da Comunidade Milionária
22. /escola     — Escola de Empreendedorismo
```

### Fase 4 — Elevação (opcional)
```
23. Framer Motion — animações hero, scroll reveals, contadores
24. Imagens reais do Manuel (quando fornecidas)
25. Testemunhos reais (quando fornecidos)
26. SEO: meta tags, Open Graph, sitemap
```

---

## 11. HANDOFF PARA @dev

### Comando exacto
```
@dev

Implementa a Fase 1 e Fase 2 do ficheiro:
docs/architecture/PREMIUM-SITE-ARCHITECTURE.md

Stack: Vite + React 19 + TypeScript + TailwindCSS (instalar via npm)
Pasta de trabalho: /site

Regras:
- NÃO alterar AIChat.tsx nem AIQuiz.tsx (estão a funcionar)
- NÃO fazer deploy (só @devops pode)
- Começar pela Fase 1 (fundações) antes de qualquer página nova
- Manter o dark theme existente — é superior ao site de referência
```

---

## 12. REFERÊNCIAS

| Documento | Localização |
|-----------|------------|
| Análise UX (manuelmanero.pt) | `docs/ux-analysis-manuelmanero-pt.md` |
| Site live actual | https://manuel-manero.vercel.app |
| Site de referência | https://www.manuelmanero.pt |
| Código fonte actual | `/site/` |
| Deploy workflow | `.github/workflows/deploy.yml` |
| HANDOFF sessão anterior | `HANDOFF-SESSION-4.md` |

---

*Arquitectura elaborada por @architect (Aria) — 21 Fev 2026*
*Próximo passo: @dev implementa seguindo as fases definidas*
