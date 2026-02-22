# HANDOFF — Sessão 5: Premium Site Rebuild Completo

**Data:** 22 Fev 2026 | **Agente:** @dev (Dex) | **Commit:** `2bd3c37`
**Branch:** `master` | **Site Live:** https://manuel-manero.vercel.app

---

## ESTADO ACTUAL — O QUE FOI FEITO

### Fases 1-4 do plano da @architect (PREMIUM-SITE-ARCHITECTURE.md) COMPLETAS

**52 ficheiros alterados, 6783 linhas adicionadas.**

### Fase 1 — Fundações ✅
- Tailwind CSS instalado via npm (substituiu CDN)
- `tailwind.config.ts` com design tokens (gold gradient, brand colors, fonts)
- `styles/globals.css` com CSS variables (.gold-gradient, .glass-card)
- `components/ui/` — 6 atoms: Button, Badge, GlassCard, GoldText, SectionTitle, ScrollReveal
- `components/layout/` — Navbar, Footer, TopBanner, Layout (separados)
- `constants.tsx` expandido (PROGRAMS, TESTIMONIALS, BOOKS, SOCIAL_LINKS, STATS, QUIZ_QUESTIONS)
- `types.ts` expandido (Program, Testimonial, Book, SocialLink, Stat, QuizQuestion)

### Fase 2 — Home Completa ✅
- **TopBanner** sticky amber com CTA Mentoria PREMIUM + dismissable
- **Navbar** glassmorphism + hamburger mobile (8 rotas) + offset dinâmico com TopBanner
- **HeroSection** com hero-bg.png real (1.5MB, recuperado do Vercel) + opacity/gradient iguais ao live
- **PillarsSection** 4 pilares com GlassCard
- **AboutSection** foto real do Manuel (manuel-manero.png) + credenciais + stats overlay
- **VideoSection** YouTube embed (OE2tqsNOX1s)
- **AIQuiz** diagnóstico IA (Gemini) — já existia, mantido intacto
- **ProgramsSection** 4 cards (PRIME, MASTERY, Comunidade, Mentoria Privada) com links reais
- **PhilosophyBanner** frase de marca em destaque
- **TestimonialsSection** 4 testemunhos com avatar + programa
- **StatsSection** contadores animados (IntersectionObserver + Framer Motion)
- **NewsletterSection** captura de email
- **ContactSection** email + WhatsApp + redes sociais + Google Forms embed
- **Footer** 4 colunas + 5 social links com Lucide icons

### Fase 3 — 7 Páginas Completas ✅
| Rota | Ficheiro | Conteúdo |
|------|----------|----------|
| `/sobre` | `pages/Sobre.tsx` | Bio, foto real, credenciais, timeline 2011-2025, 3 valores |
| `/programas` | `pages/Programas.tsx` | 4 programas expandidos alternados + CTA diagnóstico AI |
| `/comunidade` | `pages/Comunidade.tsx` | 6 benefícios, "Para quem é/não é", CTA |
| `/escola` | `pages/Escola.tsx` | 6 módulos, metodologia 3 passos |
| `/livros` | `pages/Livros.tsx` | 3 livros com capa, preço, CTA compra |
| `/testemunhos` | `pages/Testemunhos.tsx` | Grid expandido de testemunhos |
| `/contactos` | `pages/Contactos.tsx` | Info contacto + redes + Google Forms |

### Fase 4 — Elevação ✅
- **Framer Motion** instalado + ScrollReveal component reutilizável
- Hero: fade-in sequencial (badge → h1 → texto → CTAs)
- Secções: scroll reveal com stagger delays
- About: slide-left (imagem) + slide-right (conteúdo)
- Stats: contadores animados com scale-in
- **SEO completo:** meta description, keywords, Open Graph, Twitter Card, schema.org Person, canonical, favicon
- **Title dinâmico** por rota (`hooks/usePageTitle.ts`)
- `sitemap.xml` + `robots.txt`

---

## ASSETS REAIS RECUPERADOS

| Ficheiro | Tamanho | Fonte |
|----------|---------|-------|
| `public/hero-bg.png` | 1.5MB (1792×576 PNG) | Descarregado directamente do Vercel live |
| `public/logo.png` | 13KB | Descarregado do Vercel live |
| `public/manuel-manero.png` | 1.1MB | Fornecido pelo utilizador (foto.png) |
| `public/hero-bg.jpeg` | 87KB | Backup (versão JPEG) |

---

## O QUE FALTA FAZER (Próxima Sessão)

### PRIORIDADE 1 — Deploy
- [ ] **Deploy para Vercel** — mostrar ao Manuel Manero
- [ ] Verificar que `deploy-frontend` no GitHub Actions está com `if: false` (protecção)
- [ ] Decidir estratégia: deploy manual ou activar auto-deploy
- [ ] Activar @devops (Gage) para push + deploy

### PRIORIDADE 2 — Dados reais a preencher
- [ ] **Número WhatsApp real** (actualmente `351000000000` placeholder)
- [ ] **Redes sociais** — confirmar URLs correctas (Instagram: /marca.manero/ está ok?)
- [ ] **Capas dos 3 livros** — actualmente usam Unsplash placeholder
- [ ] **Fotos dos testemunhos** — actualmente usam picsum.photos placeholder
- [ ] **Google Forms URL** — confirmar se o form embed está correcto

### PRIORIDADE 3 — Melhorias visuais
- [ ] Ajustar newsletter section (referência tem "New$letter" como destaque)
- [ ] Verificar responsividade mobile em todas as 8 páginas
- [ ] Confirmar que AIChat e AIQuiz funcionam (dependem de API key Gemini)

### PRIORIDADE 4 — Detalhes técnicos
- [ ] Code-split (bundle actual: 683KB, warning de Vite >500KB)
- [ ] Ficheiros não usados: `ImpactSection.tsx`, `LeadCaptureSection.tsx` (criados durante tentativa errada, podem ser removidos)

---

## COMO CONTINUAR

### Activar o @dev (Dex) na nova sessão:
```
@dev

Continua o trabalho do HANDOFF-SESSION-5.md no projecto manuel-manero.
Pasta de trabalho: C:/Users/XPS/Documents/manuel-manero/site
Branch: master
Último commit: 2bd3c37

Prioridade: Deploy para Vercel (activar @devops) + dados reais.
```

### Para deploy (activar @devops):
```
@devops

Faz push do branch master do projecto manuel-manero e deploy para Vercel.
Repositório: C:/Users/XPS/Documents/manuel-manero
Branch: master
ATENÇÃO: deploy-frontend no GitHub Actions tem if:false — verificar estratégia.
```

---

## STACK TÉCNICA

| Componente | Versão |
|-----------|--------|
| Vite | 6.4.1 |
| React | 19.x |
| TypeScript | 5.8 |
| TailwindCSS | 4.x (npm) |
| Framer Motion | 12.x |
| react-router-dom | 7.x |
| Lucide React | 0.475.x |
| @google/genai | 1.x (AI Chat/Quiz) |

## FICHEIROS-CHAVE

```
site/
├── App.tsx                    — Router + ErrorBoundary + PageTitle
├── index.html                 — SEO meta tags + schema.org
├── tailwind.config.ts         — Design tokens
├── constants.tsx              — Todos os dados (programas, livros, stats, social)
├── components/
│   ├── layout/                — Navbar, Footer, TopBanner, Layout
│   ├── sections/ (12)         — Hero, Pillars, About, Video, Programs, Philosophy,
│   │                            Testimonials, Stats, Newsletter, Contact, Impact, LeadCapture
│   └── ui/ (6)                — Button, Badge, GlassCard, GoldText, SectionTitle, ScrollReveal
├── pages/ (8)                 — Home, Sobre, Programas, Comunidade, Escola, Livros, Testemunhos, Contactos
├── hooks/                     — usePageTitle
└── public/                    — hero-bg.png, logo.png, manuel-manero.png, sitemap.xml, robots.txt
```

---

## REGRA CRÍTICA

**NÃO fazer deploy automático.** O site live actual (manuel-manero.vercel.app) funciona.
Qualquer deploy deve ser **manual e confirmado** pelo utilizador.
O `deploy-frontend` no GitHub Actions tem `if: false` propositadamente.

---

*Handoff por @dev (Dex) — 22 Fev 2026, ~06:00*
*Commit: 2bd3c37 — feat: complete premium site rebuild (Fases 1-4)*
