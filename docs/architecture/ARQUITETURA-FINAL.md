# 🏛️ Arquitetura Final - Manuel Manero Ecossistema

**Data:** 2026-02-17
**Status:** Aprovado para Implementação (Opção A - Migração)
**Tempo Estimado:** 2-3 horas

---

## 📐 Visão Geral

Sistema fullstack que integra:
- **Frontend:** Next.js 15 com design system profissional
- **Backend:** Express + Prisma + PostgreSQL
- **AI:** Google Gemini integrado (AIChat, AIQuiz)
- **Leads:** Captura com validação, rate limiting, CRM sync

---

## 📁 Estrutura Final

```
manuel-manero/
├── apps/
│   ├── api/                          ← MANTER (100%)
│   │   ├── src/
│   │   │   ├── index.ts              ✅ Server + CORS
│   │   │   ├── routes/
│   │   │   │   ├── leads.ts          ✅ POST /api/leads
│   │   │   │   ├── articles.ts       ✅ GET /api/articles
│   │   │   │   ├── testimonials.ts   ✅ GET /api/testimonials
│   │   │   │   └── programs.ts       ✅ GET /api/programs
│   │   │   ├── services/
│   │   │   │   └── activecampaign.ts ✅ CRM sync
│   │   │   └── validation.ts         ✅ Zod schemas
│   │   ├── prisma/
│   │   │   ├── schema.prisma         ✅ 9 modelos DB
│   │   │   └── migrations/           ✅ Lead + outros
│   │   └── package.json              ✅ ts-node → tsx
│   │
│   └── web/                          ← NOVA ESTRUTURA
│       ├── app/
│       │   ├── layout.tsx            📝 Next.js layout raiz
│       │   ├── page.tsx              📝 Home page
│       │   ├── contato/
│       │   │   └── page.tsx          📝 Página contato
│       │   └── api/
│       │       └── leads/
│       │           └── route.ts      📝 Proxy para backend (opcional)
│       │
│       ├── src/
│       │   ├── components/           📝 MIGRADO do GitHub
│       │   │   ├── Layout.tsx        ✅ De manero-github
│       │   │   ├── AIChat.tsx        ✅ De manero-github
│       │   │   ├── AIQuiz.tsx        ✅ De manero-github
│       │   │   ├── LeadForm.tsx      ✅ Nova (de manuel-manero)
│       │   │   └── index.ts          📝 Exports
│       │   │
│       │   ├── services/             📝 MIGRADO do GitHub
│       │   │   ├── gemini.ts         ✅ De manero-github
│       │   │   ├── api.ts            📝 NOVO - API client
│       │   │   └── index.ts          📝 Exports
│       │   │
│       │   ├── types/                📝 NOVO
│       │   │   └── index.ts          📝 Types compartilhados
│       │   │
│       │   ├── lib/
│       │   │   └── utils.ts          📝 Utilities
│       │   │
│       │   └── styles/
│       │       └── globals.css       ✅ De manuel-manero
│       │
│       ├── .env.local                ✅ NEXT_PUBLIC_API_URL
│       ├── next.config.ts            📝 Configuração Next.js
│       ├── tsconfig.json             📝 TypeScript strict
│       └── package.json              📝 Next.js + React 19
│
└── docs/
    ├── architecture/
    │   ├── ARQUITETURA-FINAL.md      ← ESTE FICHEIRO
    │   └── MIGRATION-CHECKLIST.md    📝 NOVO
    │
    └── stories/
        └── stories-backlog.md        ✅ Atualizar com nova estrutura

```

---

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                       FRONTEND (Next.js)                    │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │  Home Page     │  │  AIChat Page   │  │  AIQuiz Page │  │
│  │  + LeadForm    │  │  + Gemini      │  │  + Gemini    │  │
│  └────────┬───────┘  └────────┬───────┘  └──────┬───────┘  │
│           │                   │                  │          │
│           └───────────┬───────┴──────────────────┘          │
│                       │                                      │
│              API Client Service (services/api.ts)          │
└───────────────────┬──────────────────────────────────────────┘
                    │ HTTP
                    │ POST /api/leads
                    │ GET  /api/articles
                    │
┌───────────────────▼──────────────────────────────────────────┐
│                    BACKEND (Express)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Route: POST /api/leads                              │   │
│  │    ├─ Validação (Zod)                               │   │
│  │    ├─ Save to DB (Prisma)                           │   │
│  │    └─ Sync ActiveCampaign (async)                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Database (PostgreSQL)                               │   │
│  │    ├─ Lead table (para captura)                      │   │
│  │    ├─ Content table (artigos)                        │   │
│  │    └─ Program table (PRIME, MASTERY)                │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔧 Componentes Chave

### Frontend Components

**Layout.tsx** (de manero-github)
- Navbar com navegação
- Sidebar (se aplicável)
- Footer

**AIChat.tsx** (de manero-github)
- Integração Google Gemini
- Chat interativo
- Histórico conversas

**AIQuiz.tsx** (de manero-github)
- Quiz com IA
- Pontuação dinâmica
- Recomendações

**LeadForm.tsx** (de manuel-manero, adaptado)
- Email + Nome
- Consentimento GDPR
- POST → /api/leads

### Backend Services

**routes/leads.ts** ✅ Já existe
- POST /api/leads
- Rate limiting (10 req/min)
- Validação Zod
- Response 201/400/429/500

**services/activecampaign.ts** ✅ Já existe
- Upsert contact
- Add tags
- Graceful errors

**services/api.ts** 📝 NOVO
- Fetch wrapper
- Error handling
- Retry logic

---

## 🛠️ Stack Técnico

### Frontend
- **Framework:** Next.js 15.5.12
- **UI:** React 18+
- **Routing:** Next.js App Router
- **Styles:** TailwindCSS (de manuel-manero)
- **AI:** @google/genai
- **HTTP:** Fetch API
- **Validação:** Zod
- **Build:** Next.js built-in

### Backend
- **Server:** Express 4.18
- **Database:** PostgreSQL 15
- **ORM:** Prisma 5.8
- **Validation:** Zod 3.22
- **Rate Limit:** express-rate-limit 8.2
- **Runtime:** Node.js 20 com tsx

### DevOps
- **Deployment:** Vercel (frontend) + Railway (backend)
- **Database:** Supabase (PostgreSQL managed)
- **Containerization:** Docker (development)

---

## 📋 Checklist de Implementação

### Fase 1: Preparação (15 min)

- [ ] Backup do manero-github (FEITO)
- [ ] Criar branch: `feature/migrate-to-nextjs`
- [ ] Listar todos os ficheiros do GitHub

### Fase 2: Estrutura (30 min)

- [ ] Remover apps/web atual
- [ ] Criar nova estrutura Next.js (app router)
- [ ] Copiar componentes do GitHub → src/components/
- [ ] Copiar serviços do GitHub → src/services/
- [ ] Copiar tipos do GitHub → src/types/
- [ ] Adicionar globals.css (de manuel-manero)

### Fase 3: Integração (45 min)

- [ ] Criar src/services/api.ts (API client)
- [ ] Adicionar .env.local com NEXT_PUBLIC_API_URL
- [ ] Copiar LeadForm.tsx (de manuel-manero)
- [ ] Integrar LeadForm na Home page
- [ ] Criar página /contato (opcional)
- [ ] Testar imports e exports

### Fase 4: Validação (30 min)

- [ ] npm install (todas as dependências)
- [ ] npm run typecheck (TypeScript strict)
- [ ] npm run build (Next.js build)
- [ ] npm run dev (iniciar em localhost:3000)
- [ ] Teste end-to-end (form → API → DB)
- [ ] Verificar Google Gemini funcionando

### Fase 5: Publicação (opcional)

- [ ] Commit com mensagem: `feat: migrate to Next.js + design system`
- [ ] Push para feature branch
- [ ] Criar PR (com @devops)

---

## 🚨 Pontos Críticos

### ✅ Mantém 100% compatível
- Backend Express totalmente intacto
- Database schema intacto
- POST /api/leads operacional

### ⚠️ Mudanças Frontend
- De `vite.config.ts` para `next.config.ts`
- De `React Router` para `Next.js App Router`
- De `SPA` para `SSR/SSG`

### 🔗 Integração Backend-Frontend
- API client service conecta a localhost:3001
- CORS já configurado no backend
- Environment variable: `NEXT_PUBLIC_API_URL`

---

## 📞 Comunicação com Backend

**Ficheiro:** `src/services/api.ts`

```typescript
// Exemplo de chamada
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/leads`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  }
)
```

---

## 🎯 Próximos Passos Após Migração

1. **Testar Google Gemini** - Verificar AIChat/AIQuiz funcionando
2. **Refinar design** - Adaptar componentes do GitHub para branding final
3. **Adicionar mais páginas** - Contato, Sobre, Programas
4. **Deploy** - Vercel (frontend) + Railway (backend)
5. **Monitoramento** - Logs, analytics, error tracking

---

## 📝 Notas

- Monorepo structure permite deploy independente (frontend vs backend)
- Database migrations já executadas
- Rate limiting ativo para prevenir abuso
- GDPR compliant (consent field)
- Design system reutilizado (melhor que recriar)

---

**PRONTO PARA IMPLEMENTAÇÃO! 🚀**

Próxima etapa: Ativar @dev para executar o plano.
