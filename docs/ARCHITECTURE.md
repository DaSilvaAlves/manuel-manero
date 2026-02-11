# 🏛️ Arquitetura Brownfield - Ecossistema "UAU" Manuel Manero

**Data:** 11 de fevereiro de 2026
**Versão:** 1.0
**Status:** Draft para Aprovação
**Arquiteto:** Aria (Visionary)

---

## 1. Visão Geral da Arquitetura

O écossistema "UAU" é um **site fullstack moderno** construído com uma abordagem **component-first** e **content-centric**, integrando tecnologias de IA, automação de leads e prova social dinâmica.

### 1.1 Princípios Arquitetônicos

- **🎯 User-Centric**: Começar com jornadas de utilizador (visitante frio → lead → membro)
- **📱 Mobile-First**: Responsividade total, performance otimizada
- **🔌 Modular**: Componentes desacoplados, reutilizáveis
- **🚀 Escalável**: Preparado para crescimento (10k+ utilizadores)
- **🤖 IA-Ready**: Integrações com IA para personalização e automação
- **🔐 Secure by Design**: GDPR-compliant, SSL, validação de inputs

### 1.2 Stakeholders & Responsabilidades

| Papel | Responsabilidade |
|-------|-----------------|
| **@dev** | Implementação fullstack, componentes, APIs |
| **@qa** | Testes, validação, performance |
| **@data-architect** | Schema de BD, otimização de queries |
| **@ux-design-expert** | Design visual, UX flows, acessibilidade |
| **@devops** | Deploy, CI/CD, infraestrutura |

---

## 2. Stack Tecnológico

### 2.1 Frontend

```
Framework:     Next.js 15+ (React 19)
Styling:       Tailwind CSS + shadcn/ui
State:         TanStack Query (React Query) + Zustand
Animations:    Framer Motion (micro-interações)
Forms:         React Hook Form + Zod (validação)
Analytics:     GA4, PostHog (product analytics)
```

**Escolha Racional:**
- Next.js = Performance (SSR, SSG), SEO otimizado, fullstack
- Tailwind = Rapidez, consistência visual
- Framer Motion = Animações suaves para "quiet luxury"
- React Query = Sincronização eficiente com servidor

### 2.2 Backend

```
Runtime:       Node.js 20+ LTS
Framework:     Express.js + TypeScript
API:           RESTful (OpenAPI/Swagger)
Database:      PostgreSQL 15+ (relacional + JSON)
Cache:         Redis (sessions, rate limiting)
Queue:         Bull (background jobs)
Auth:          NextAuth.js (JWT + sessions)
```

**Escolha Racional:**
- Express = Simples, maduro, extensível
- PostgreSQL = Relações complexas (utilizadores, programas, comunidade)
- Redis = Performance crítica para sessions e cache
- Bull = Automação de e-mails, webhooks assincronos

### 2.3 IA & Integrações

```
Chat IA:       OpenAI API (GPT-4 Turbo) + LangChain.js
Recomendações: TensorFlow.js (modelo de recomendação leve)
Busca:         Algolia (busca semântica e full-text)
E-mail:        ActiveCampaign API (leads, automação)
Pagamentos:    Hotmart (checkout externo via API)
Vídeos:        Cloudinary (CDN, transformações)
Analytics:     Segment (rastreamento unified)
```

### 2.4 Infraestrutura & DevOps

```
Hosting:       Vercel (Next.js) + Railway (Node backend)
BD:            Vercel Postgres (PostgreSQL serverless)
Cache:         Vercel KV (Redis serverless)
CDN:           Vercel Edge Network
Monitoring:    Sentry (erros), Datadog (logs)
CI/CD:         GitHub Actions
DNS/Email:     Cloudflare
```

**Arquitetura de Deploy:**
```
GitHub Repo
    ↓
GitHub Actions (lint, test, build)
    ↓
├─ Frontend → Vercel (auto-deploy)
├─ Backend → Railway (container)
└─ DB → Vercel Postgres
```

---

## 3. Estrutura de Projeto

```
manuel-manero/
├── docs/
│   ├── ARCHITECTURE.md (este arquivo)
│   ├── API.md (documentação de endpoints)
│   ├── COMPONENTS.md (catálogo de componentes)
│   └── stories/ (histórias de utilizador)
│
├── apps/
│   ├── web/ (Next.js frontend)
│   │   ├── src/
│   │   │   ├── app/ (páginas, layout)
│   │   │   ├── components/ (componentes React)
│   │   │   ├── hooks/ (custom hooks)
│   │   │   ├── lib/ (utilitários)
│   │   │   ├── styles/ (Tailwind, temas)
│   │   │   ├── types/ (TypeScript)
│   │   │   └── api/ (API routes, próximas??)
│   │   └── package.json
│   │
│   └── api/ (Node.js + Express backend)
│       ├── src/
│       │   ├── routes/ (endpoints)
│       │   ├── controllers/ (lógica de negócio)
│       │   ├── services/ (integrações, IA)
│       │   ├── middleware/ (auth, validation)
│       │   ├── models/ (Prisma ORM)
│       │   ├── lib/ (utilitários)
│       │   └── config/ (variáveis, DB)
│       ├── prisma/
│       │   └── schema.prisma (schema de BD)
│       └── package.json
│
├── packages/
│   ├── shared-types/ (tipos TypeScript compartilhados)
│   ├── ui/ (componentes de UI reutilizáveis)
│   └── utils/ (funções utilitárias)
│
├── .github/
│   └── workflows/ (CI/CD)
│
├── docker-compose.yml (local dev)
├── package.json (workspace root)
└── tsconfig.json
```

---

## 4. Componentes Principais & Responsabilidades

### 4.1 Camada de Apresentação (Frontend)

#### Páginas Principais
```
/                    → Home (hero + overview)
/sobre               → Sobre Manuel (storytelling)
/programas           → Ofertas (PRIME, MASTERY, Mentorias)
/comunidade          → Comunidade Milionária
/escola              → Produtos digitais / Manuais
/blog                → Blog + Vídeos + Podcasts
/blog/[slug]         → Artigo individual
/contato             → Formulário + Calendly
/not-found           → Página 404

(Futuro)
/dashboard           → Área de membros (se implementado internamente)
```

#### Componentes Core
```
Layout/
├── Header (nav, logo, CTA)
├── Footer (links, CTA final)
└── SideBar (mobile menu)

Hero/
├── HeroVideo (fundo vídeo, headline)
├── HeroStats (métricas, números)
└── HeroTestimonials (carrossel depoimentos)

Cards/
├── ProgramCard (programa com icon, descrição, CTA)
├── TestimonialCard (depoimento com foto)
└── ContentCard (artigo/vídeo/podcast)

Forms/
├── LeadForm (e-mail, nome)
├── NewsletterSubscribe
├── ContactForm
└── QuizAssessment (IA-powered)

AI/
├── ChatBubble (assistente)
└── PersonalizedRecommendations (baseado em comportamento)
```

### 4.2 Camada de API (Backend)

#### Endpoints Principais

**Leads & Captures**
```
POST   /api/leads               (novo lead)
POST   /api/newsletter          (subscrever newsletter)
POST   /api/quiz               (resultado de quiz)
```

**Conteúdo**
```
GET    /api/blog               (listar artigos, com filtros)
GET    /api/blog/[slug]        (artigo específico)
GET    /api/videos             (listar vídeos)
GET    /api/podcasts           (listar podcasts)
```

**Programas & Ofertas**
```
GET    /api/programs           (listar programas)
GET    /api/programs/[id]      (detalhes programa)
GET    /api/community          (info comunidade)
```

**IA & Personalização**
```
POST   /api/ai/chat            (chat assistente)
GET    /api/recommendations    (conteúdo personalizado)
```

**Analytics**
```
POST   /api/events             (rastrear evento, ex: CTA click)
```

#### Autenticação & Autorização

```
NextAuth.js:
├── Providers: Google, Email Magic Link
├── Sessions: JWT + DB
└── Roles: public, subscriber, member, admin
```

### 4.3 Camada de Dados (Database)

#### Modelos Principais (Prisma)

```prisma
// Utilizadores
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  name         String?
  role         String   @default("subscriber") // subscriber, member, admin
  newsletter   Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Relacionamentos
  leads        Lead[]
  quizAnswers  QuizAnswer[]
  community    CommunityMember?
}

// Leads capturados
model Lead {
  id        String   @id @default(cuid())
  email     String
  name      String?
  source    String   // "quiz", "newsletter", "contact", "lead-magnet"
  data      Json?    // dados adicionais do quiz
  createdAt DateTime @default(now())

  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
}

// Conteúdo (Blog, Vídeos, Podcasts)
model Content {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  content     String   // markdown
  type        String   // "blog", "video", "podcast"
  category    String   // "marca-pessoal", "comunicacao", "mindset"
  tags        String[] @default([])
  published   Boolean  @default(false)
  image       String?
  videoUrl    String?  // YouTube, Vimeo
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Para SEO
  seoTitle    String?
  seoDesc     String?
}

// Programas
model Program {
  id          String   @id @default(cuid())
  name        String   // "PRIME", "MASTERY", etc.
  slug        String   @unique
  description String
  price       Float?
  duration    String   // "8 semanas", "12 semanas"
  modules     Int      // número de módulos
  modules_detail Json? // detalhes de módulos
  testimonials TestimonialVideo[]
  createdAt   DateTime @default(now())
}

// Membros da Comunidade
model CommunityMember {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  joinedAt  DateTime @default(now())
  status    String   @default("active") // "active", "paused", "cancelled"
  tier      String   @default("standard") // "standard", "premium"
}

// Depoimentos em vídeo
model TestimonialVideo {
  id        String   @id @default(cuid())
  name      String
  role      String
  videoUrl  String
  quote     String?
  result    String?   // ex: "Aumentei receita em 50%"
  programs  Program[]
  createdAt DateTime @default(now())
}

// Respostas de Quiz
model QuizAnswer {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  answers   Json     // respostas JSON
  result    String   // score/recomendação
  createdAt DateTime @default(now())
}

// Eventos (analytics)
model Event {
  id        String   @id @default(cuid())
  type      String   // "cta_click", "page_view", "form_submit"
  data      Json?
  timestamp DateTime @default(now())
}
```

---

## 5. Fluxos de Dados Principais

### 5.1 Fluxo de Lead Capture

```
Visitante clica "Quero começar"
    ↓
Abre Quiz IA (componente)
    ↓
Responde perguntas (5-7)
    ↓
POST /api/quiz com respostas
    ↓
Backend:
  - Processa IA (recomendação de programa)
  - Cria Lead & User
  - Envia e-mail via ActiveCampaign
  ↓
Retorna resultado ao frontend
    ↓
Utilizador vê resultado + CTA para programa recomendado
    ↓
Sync com ActiveCampaign (automação)
```

### 5.2 Fluxo de Personalização

```
Utilizador navega site
    ↓
Frontend rastreia: página visitada, tempo, tipo de conteúdo
    ↓
POST /api/events (enviar eventos)
    ↓
TanStack Query sincroniza dados com servidor
    ↓
Backend calcula preferências (usando TensorFlow.js ou ML)
    ↓
GET /api/recommendations retorna conteúdo personalizado
    ↓
Frontend mostra: "Conteúdo recomendado para ti"
```

### 5.3 Fluxo de Comunidade

```
Utilizador clica "Entrar na Comunidade"
    ↓
Redireciona para checkout Hotmart (externa)
    ↓
Após pagamento, webhook Hotmart → backend
    ↓
POST /api/webhooks/hotmart
    ↓
Backend:
  - Atualiza status de User (member)
  - Cria CommunityMember
  - Envia acesso à plataforma externa
  - Envia e-mail de boas-vindas
```

---

## 6. Integrações Externas

### 6.1 ActiveCampaign (E-mail + CRM)

```
Quando:  Lead criado, Quiz respondido, Programa comprado
Como:    API REST com tags dinâmicas
Dados:   E-mail, nome, origem, tags (quiz result, programa, etc.)
Segue:   Automações internas (welcome series, nurture flows)
```

**Implementação:**
```typescript
// services/activeCampaign.ts
export async function createContact(email, name, tags) {
  const res = await fetch('https://yourinstance.api-us1.com/api/3/contacts', {
    method: 'POST',
    headers: { 'Api-Token': process.env.ACTIVECAMPAIGN_API_KEY },
    body: JSON.stringify({
      contact: { email, firstName: name, tags }
    })
  });
  return res.json();
}
```

### 6.2 OpenAI (Chat + Recomendações)

```
Cuando: Utilizador usa chat assistente, precisa recomendação IA
Como:   OpenAI API (GPT-4 Turbo)
Prompt: "Tu és um assistente de marca pessoal. Baseado no quiz do utilizador,
         recomenda o melhor programa."
Cache:  Redis para respostas frequentes
```

### 6.3 Hotmart (Checkout)

```
Quando: Utilizador compra programa ou comunidade
Como:   Webhook (Hotmart → Backend)
Dado:   Confirmação de pagamento
Action: Atualiza BD, envia e-mail, cria acesso
```

### 6.4 Algolia (Busca)

```
Quando: Utilizador pesquisa conteúdo ou programa
Como:   Integração Algolia no Next.js
Index:  content (blog), programs, community
Feature: Busca semântica + autocomplete
```

### 6.5 Segment (Analytics Unificado)

```
Evento: CTA click, form submit, page view
Enviado: Segment → Google Analytics, PostHog, HubSpot
Permite: Rastreamento holístico de jornada
```

---

## 7. Padrões de Performance

### 7.1 Frontend Performance

| Métrica | Target | Estratégia |
|---------|--------|-----------|
| **LCP** | < 2.5s | Imagem hero otimizada, lazy load vídeos |
| **FID** | < 100ms | Usar React.memo, code splitting |
| **CLS** | < 0.1 | Dimensões fixas, fonts otimizadas |
| **FCP** | < 1.8s | SSG para pages estáticas, CSS crítico inline |

**Implementação:**
```typescript
// Lazy load conteúdo abaixo da dobra
import dynamic from 'next/dynamic';
const TestimonialSection = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96 bg-gray-200" />
});

// Image optimization
<Image
  src={heroImage}
  alt="Manuel"
  width={1920}
  height={1080}
  priority // hero image
  quality={75}
/>

// Vídeo: usar Cloudinary para transformações
<video poster="https://cloudinary.com/...">
  <source src="https://cloudinary.com/...?w=1920&q=auto" />
</video>
```

### 7.2 Backend Performance

| Métrica | Target | Estratégia |
|---------|--------|-----------|
| **API Response** | < 200ms | Cache Redis, índices BD |
| **Database Query** | < 100ms | EXPLAIN ANALYZE, índices compound |
| **Throughput** | > 1000 req/s | Horizontal scaling, rate limiting |

**Índices PostgreSQL:**
```sql
CREATE INDEX idx_content_slug ON content(slug);
CREATE INDEX idx_content_category ON content(category);
CREATE INDEX idx_user_email ON "user"(email);
CREATE INDEX idx_lead_created ON lead(createdAt DESC);
```

### 7.3 Caching Strategy

```
┌─────────────────────────────────────────┐
│ Browser Cache (30 dias)                  │
├─────────────────────────────────────────┤
│ Assets estáticos: /assets, CSS, JS       │
├─────────────────────────────────────────┤
│ Vercel Edge Cache (1 hora)               │
├─────────────────────────────────────────┤
│ GET /api/blog, GET /api/programs        │
├─────────────────────────────────────────┤
│ Redis Cache (5 min - 1 hora)             │
├─────────────────────────────────────────┤
│ Conteúdo dinâmico, resultados de quiz   │
├─────────────────────────────────────────┤
│ Database (PostgreSQL)                    │
└─────────────────────────────────────────┘
```

---

## 8. Segurança

### 8.1 Autenticação & Autorização

```
NextAuth.js + JWT:
├── Login: Magic Link (e-mail)
├── Sessions: HTTP-only cookies
├── Roles: PUBLIC → SUBSCRIBER → MEMBER → ADMIN
└── Proteção: CSRF, CORS, rate limiting
```

### 8.2 Validação & Sanitização

```typescript
// Zod para validação
const LeadSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2),
  source: z.enum(['quiz', 'newsletter', 'contact'])
});

// Sanitização no backend
const sanitized = DOMPurify.sanitize(userInput);
```

### 8.3 GDPR Compliance

- Consentimento explícito para newsletter
- Direito de apagar dados (GDPR DELETE)
- Transparência de processamento (Privacy Policy)
- Criptografia em trânsito (HTTPS/TLS)
- Backup seguro

### 8.4 Rate Limiting

```typescript
// Express rate-limiter
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // 100 requests por janela
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', limiter);
```

---

## 9. SEO Architecture

### 9.1 On-Page SEO

```typescript
// Next.js Metadata API
export const metadata = {
  title: 'Constrói uma Marca Pessoal Milionária | Manuel Manero',
  description: 'Ecossistema para empreendedores construirem marca pessoal forte...',
  openGraph: {
    title: '...',
    description: '...',
    image: '/og-image.png'
  }
};
```

### 9.2 Structured Data (Schema.org)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Manuel Manero",
  "url": "https://manuelmanero.com",
  "logo": "...",
  "description": "...",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "EUR",
    "offers": [
      { "@type": "Offer", "name": "PRIME", "price": "..." }
    ]
  }
}
```

### 9.3 Blog SEO

- URLs amigáveis: `/blog/como-construir-marca-pessoal`
- Headings estruturados: H1 → H2 → H3
- Internal linking entre artigos
- Meta descriptions dinâmicas
- Sitemaps + robots.txt automáticos

---

## 10. Monitoramento & Observabilidade

### 10.1 Erros & Logging

```
Sentry (frontend + backend)
├── Error tracking
├── Release tracking
└── Performance monitoring
```

### 10.2 Métricas de Negócio

```
PostHog (product analytics)
├── Conversão: visitante → lead → membro
├── Engagement: tempo na página, scroll depth
├── Retenção: repeat visitors, newsletter open rate
└── Revenue: programa/comunidade conversões
```

### 10.3 Infraestrutura

```
Datadog (logs, métricas, traces)
├── DB query latência
├── API response time
├── CPU/Memory utilização
└── Error rates por endpoint
```

---

## 11. Roadmap de Implementação

### Fase 1: MVP (4 semanas)
- [ ] Setup projeto (Next.js, Express, BD)
- [ ] Home page (hero, overview, newsletter capture)
- [ ] Página Sobre (storytelling)
- [ ] Blog básico (listagem, artigos)
- [ ] Contacto + Calendly

**Resultado:** Site estático + lead capture

### Fase 2: Programas & Comunidade (4 semanas)
- [ ] Página Programas (PRIME, MASTERY)
- [ ] Página Comunidade Milionária
- [ ] Integração Hotmart (checkout)
- [ ] Webhook handler (pagamentos)
- [ ] Quiz IA básico

**Resultado:** Fluxo de venda funcional

### Fase 3: IA & Personalização (3 semanas)
- [ ] Chat IA (OpenAI)
- [ ] Recomendações personalizadas
- [ ] Quiz assessment avançado
- [ ] Algolia busca semântica
- [ ] A/B testing

**Resultado:** Experiência personalizada

### Fase 4: Scale & Otimização (2 semanas)
- [ ] Performance tunning
- [ ] Sentry monitoring
- [ ] Analytics dashboard
- [ ] Segurança (GDPR, rate limiting)
- [ ] CI/CD automático

**Resultado:** Produção pronta e monitorada

---

## 12. Decisões Arquiteturais (ADRs)

### ADR-001: Next.js vs Remix
**Decisão:** Next.js
**Racional:** SSG para conteúdo estático, melhor ecossistema, Vercel deployment nativo
**Trade-off:** Menos controlo de roteamento vs velocidade de dev

### ADR-002: PostgreSQL vs MongoDB
**Decisão:** PostgreSQL
**Racional:** Dados relacionais (usuários, leads, membros), ACID compliance, queries complexas
**Trade-off:** Escalabilidade horizontal vs simplicidade

### ADR-003: External Hotmart vs Checkout Próprio
**Decisão:** External Hotmart (curto prazo)
**Racional:** Time reduzido, compliance de pagamentos, chargeback handling
**Trade-off:** Menos controlo vs time-to-market rápido

### ADR-004: Express vs Fastify
**Decisão:** Express
**Racional:** Comunidade, middleware ecosystem, documentação
**Trade-off:** Ligeiramente mais lento vs maturidade

---

## 13. Próximas Ações

1. **Aprovação Arquitetura** ← Esperar feedback
2. **Setup Repositório** (GitHub, branches)
3. **Criar Base de Dados** (Prisma schema, migrations)
4. **Kickoff Dev** (Frontend + API em paralelo)
5. **Design System** (Tailwind, componentes reutilizáveis)

---

## Contacto & Discussão

Esta arquitetura é um **living document**. Feedback é bem-vindo:

- **Performance concerns?** → Discutir caching, índices
- **Mudanças de requisitos?** → Atualizar scope, timeline
- **Questões técnicas?** → Detalhar padrões específicos

👑 **Aria, arquitetando o futuro** 🏗️
