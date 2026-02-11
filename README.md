# 🎯 Ecossistema Digital "UAU" - Manuel Manero

Plataforma moderna para Manuel Manero posicionar-se como referência absoluta em **Marca Pessoal Milionária**, integrando autoridade, programas (PRIME, MASTERY), comunidade e conteúdos num único ecossistema escalável.

## 📊 Objetivo

Aumentar conversão de visitantes → leads → membros pagos através de:
- ✅ Storytelling autêntico e narrativa long-form
- ✅ IA para personalização e chat inteligente
- ✅ Fluxo de conversão otimizado (quiz → programa recomendado)
- ✅ Integração com programas existentes (Hotmart, ActiveCampaign, Comunidade)
- ✅ SEO e autoridade de conteúdo

---

## 🏗️ Stack Tecnológico

### Frontend
```
Next.js 15 (React 19)
TypeScript
Tailwind CSS
Framer Motion (animações)
TanStack Query (React Query)
Zustand (state management)
React Hook Form + Zod (validação)
```

### Backend
```
Node.js 20 LTS
Express.js
TypeScript
PostgreSQL 15
Redis (cache + sessions)
Prisma ORM
```

### Integrações
```
OpenAI GPT-4 (chat IA)
ActiveCampaign (e-mail + CRM)
Hotmart (checkout + webhooks)
Algolia (busca semântica)
Cloudinary (CDN imagens/vídeos)
Calendly (agendamento)
Segment (analytics unificado)
```

### Deploy
```
Frontend: Vercel (Next.js hosting + edge)
Backend: Railway (Node.js container)
Database: Vercel Postgres (PostgreSQL serverless)
Cache: Vercel KV (Redis serverless)
```

---

## 📁 Estrutura do Projeto

```
manuel-manero/
├── apps/
│   ├── web/              # Frontend (Next.js)
│   │   ├── app/          # Pages, layout
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities
│   │   └── public/       # Static assets
│   │
│   └── api/              # Backend (Express)
│       ├── src/
│       │   ├── routes/   # API endpoints
│       │   ├── services/ # Business logic
│       │   ├── models/   # Prisma
│       │   └── config/   # Configuration
│       └── prisma/       # Database schema
│
├── packages/
│   ├── shared-types/     # TypeScript shared types
│   ├── ui/               # Reusable components
│   └── utils/            # Helper functions
│
├── docs/                 # Documentation
│   ├── ARCHITECTURE.md   # System architecture
│   ├── COMPONENTS.md     # UI components catalog
│   ├── SYSTEM_DIAGRAM.md # Diagrams
│   └── SETUP_GUIDE.md    # Setup instructions
│
└── .github/workflows/    # CI/CD pipelines
```

---

## 🚀 Quick Start

### 1. Instalar Dependências

```bash
npm install
```

### 2. Setup Frontend

```bash
cd apps/web
npx create-next-app@latest . --typescript --tailwind --app
npm install react-hook-form zod @tanstack/react-query zustand framer-motion axios next-auth
```

### 3. Setup Backend & Database

```bash
cd ../../apps/api
npm init -y
npm install express typescript ts-node @types/express dotenv cors prisma @prisma/client axios zod
npx prisma init
```

### 4. Environment Variables

Criar `.env.local` em `apps/api/`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/manuel_manero"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-secret-key"
ACTIVECAMPAIGN_API_URL="https://yourinstance.api-us1.com"
ACTIVECAMPAIGN_API_KEY="your-api-key"
OPENAI_API_KEY="your-api-key"
NODE_ENV="development"
API_PORT="3001"
FRONTEND_URL="http://localhost:3000"
```

### 5. Iniciar Desenvolvimento

```bash
# Na raiz do projeto
npm run dev

# Ou separadamente:
cd apps/web && npm run dev
cd apps/api && npm run dev
```

**Frontend:** http://localhost:3000
**Backend:** http://localhost:3001

---

## 📖 Documentação

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Visão completa da arquitetura do sistema
- **[SYSTEM_DIAGRAM.md](docs/SYSTEM_DIAGRAM.md)** - Diagramas de fluxos e integrações
- **[COMPONENTS.md](docs/COMPONENTS.md)** - Catálogo de componentes UI
- **[SETUP_GUIDE.md](docs/SETUP_GUIDE.md)** - Guia detalhado de setup

---

## 🎯 Roadmap (8 semanas)

### Semana 1-2: Setup & Base
- [ ] Repositório + estrutura monorepo
- [ ] Frontend base (layout, routing)
- [ ] Backend API setup
- [ ] Database + migrations
- [ ] CI/CD (GitHub Actions)

### Semana 3-4: Páginas Estáticas
- [ ] Home page (hero, overview)
- [ ] Página Sobre (storytelling)
- [ ] Blog (listagem + artigos)
- [ ] Página Contato
- [ ] Design system completo

### Semana 5-6: Programas & Conversão
- [ ] Página Programas (PRIME, MASTERY)
- [ ] Página Comunidade Milionária
- [ ] Integração Hotmart (checkout)
- [ ] Lead capture forms
- [ ] Quiz assessment

### Semana 7-8: IA & Otimização
- [ ] Chat IA (OpenAI)
- [ ] Recomendações personalizadas
- [ ] Algolia busca
- [ ] Performance tuning
- [ ] Monitoring (Sentry, Datadog)
- [ ] Lançamento em produção

---

## 🔒 Segurança

- ✅ GDPR-compliant (consentimento explícito, direito de apagar)
- ✅ HTTPS/TLS em produção
- ✅ Rate limiting (API)
- ✅ Validação de inputs (Zod)
- ✅ JWT authentication (NextAuth.js)
- ✅ CSRF protection
- ✅ Sanitização de conteúdo

---

## 📊 Métricas de Sucesso

| Métrica | Target |
|---------|--------|
| Conversão (visitante → lead) | > 15% |
| Tempo na Home | > 2 min |
| Performance (Lighthouse) | > 90 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Inscrições Comunidade | +25% trimestral |

---

## 👥 Equipa de Desenvolvimento

| Agente | Responsabilidade |
|--------|-----------------|
| **@architect (Aria)** | Arquitetura, tech decisions, coordenação |
| **@dev** | Frontend + Backend implementation |
| **@qa** | Testes, validação, performance |
| **@data-architect** | Schema BD, queries, otimização |
| **@devops** | Deploy, CI/CD, infraestrutura |
| **@ux-design-expert** | Design visual, UX flows |

---

## 🔗 Integrações Externas

### CRM & E-mail
- **ActiveCampaign** → Lead capture, automações, segmentação

### Pagamentos
- **Hotmart** → Checkout (comunidade, programas), webhooks

### IA
- **OpenAI** → Chat assistente, análise quiz, recomendações

### Busca
- **Algolia** → Full-text search, busca semântica

### Media
- **Cloudinary** → CDN, otimização imagens, streaming vídeos

### Analytics
- **Segment** → Rastreamento unificado (GA4, PostHog, HubSpot)
- **Sentry** → Error tracking, performance monitoring

---

## 📝 Scripts Disponíveis

```bash
# Development
npm run dev          # Inicia todos os workspaces
npm run build        # Build all apps
npm run lint         # Lint all apps
npm run typecheck    # TypeScript check
npm run test         # Run tests

# Cleanup
npm run clean        # Remove node_modules
```

---

## 🐛 Troubleshooting

**Problema:** "Module not found"
```bash
npm run clean
npm install
```

**Problema:** "Port already in use"
```bash
# Frontend
PORT=3001 npm run dev

# Backend
API_PORT=3002 npm run dev
```

**Problema:** "Database connection failed"
```bash
# Verificar .env.local
echo $DATABASE_URL

# Resetar database
cd apps/api && npx prisma migrate dev --name init
```

---

## 📚 Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Express Documentation](https://expressjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📞 Suporte

Para dúvidas ou issues, consultar:
- Documentação em `/docs`
- Arquitetura system em `ARCHITECTURE.md`
- Setup guide em `SETUP_GUIDE.md`

---

**Versão:** 1.0.0
**Última atualização:** 11 de fevereiro de 2026
**Status:** 🟢 Em desenvolvimento
