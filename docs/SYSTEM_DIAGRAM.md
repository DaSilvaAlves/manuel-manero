# 📊 Diagrama de Arquitetura do Sistema

## 1. Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Browser)                                   │
│  Next.js Frontend (React 19 + Tailwind + Framer Motion)                     │
│  ├─ Pages: home, sobre, programas, comunidade, blog, contato              │
│  ├─ Components: Hero, Cards, Forms, Chat, Testimonials                    │
│  └─ State: TanStack Query + Zustand                                        │
└───────────────────────────┬──────────────────────────────────────────────────┘
                            │ HTTPS/TLS
            ┌───────────────┼───────────────┐
            │               │               │
        API REST      Webhooks        WebSocket
        (JSON)     (Hotmart, etc)    (Chat IA)
            │               │               │
┌───────────▼───────────────▼───────────────▼──────────────────────────────────┐
│                    BACKEND (Node.js + Express)                              │
│  API Routes:                                                                 │
│  ├─ POST /api/leads (captura leads)                                        │
│  ├─ GET  /api/blog (listagem de conteúdo)                                  │
│  ├─ POST /api/quiz (processa quiz IA)                                      │
│  ├─ POST /api/ai/chat (chat assistente)                                    │
│  ├─ GET  /api/recommendations (conteúdo personalizado)                     │
│  └─ POST /api/webhooks/hotmart (confirmação pagamento)                     │
│                                                                              │
│  Middleware:                                                                │
│  ├─ Authentication (NextAuth, JWT)                                        │
│  ├─ Validation (Zod)                                                       │
│  ├─ Error Handling                                                         │
│  └─ Rate Limiting                                                          │
│                                                                              │
│  Services:                                                                  │
│  ├─ activeCampaign (lead capture, automação)                              │
│  ├─ openai (chat IA, recomendações)                                       │
│  ├─ algolia (busca semântica)                                            │
│  └─ cloudinary (imagens, vídeos)                                          │
└───────────────────┬──────────────────────────┬──────────────────────────────┘
                    │                          │
                    │                          │
         ┌──────────▼───────────┐   ┌──────────▼──────────┐
         │  DATABASE LAYER       │   │  CACHE LAYER       │
         │  (PostgreSQL)         │   │  (Redis)           │
         │                       │   │                    │
         │  ├─ Users            │   │  ├─ Sessions       │
         │  ├─ Leads            │   │  ├─ Quiz Results   │
         │  ├─ Content          │   │  ├─ API Responses  │
         │  ├─ Programs         │   │  └─ Rate Limits    │
         │  └─ Events           │   │                    │
         └───────────────────────┘   └────────────────────┘
```

## 2. Fluxo de Requisição (Request-Response)

```
VISITANTE CLICA "Quero começar"
    │
    ├─ Frontend: Abre modal/página do Quiz
    │
    ├─ Utilizador responde 5-7 perguntas
    │
    ├─ Frontend: POST /api/quiz
    │     Payload: { email, name, answers: [...] }
    │
    └─ Backend:
        ├─ Validação (Zod)
        ├─ Busca/cria User & Lead na BD
        ├─ Chama OpenAI para análise (IA)
        ├─ Calcula score/recomendação
        ├─ Cria evento de tracking
        ├─ Chama ActiveCampaign para adicionar tag
        ├─ Armazena resultado em Redis (cache)
        └─ Retorna JSON: { score, recommendation, program_id }
    │
    └─ Frontend:
        ├─ Mostra resultado personalizado
        ├─ Dispara evento de tracking (Segment)
        └─ CTA para programa recomendado
```

## 3. Fluxo de Personalização (Real-time)

```
NAVEGAÇÃO DO SITE
    │
    ├─ Frontend: Rastreia eventos
    │   ├─ page_view (página visitada)
    │   ├─ scroll_depth (até onde scrollou)
    │   ├─ time_on_page (tempo na página)
    │   └─ content_type (tipo: blog, vídeo, programa)
    │
    ├─ Frontend: POST /api/events (batch a cada 30s)
    │
    ├─ Backend:
    │   ├─ Armazena eventos na BD
    │   ├─ Atualiza perfil do utilizador (preferências)
    │   └─ Calcula score de interesse por tema
    │
    ├─ GET /api/recommendations (chamado ao carregar)
    │   ├─ Backend analisa história do utilizador
    │   ├─ ML simples (TensorFlow.js ou regras)
    │   └─ Retorna: [ { content_id, title, relevance_score } ]
    │
    └─ Frontend: Renderiza seção "Recomendado para ti"
```

## 4. Fluxo de Conversão (Compra)

```
UTILIZADOR CLICA "Inscrever-se na Comunidade"
    │
    ├─ Frontend: Dispara evento de tracking (Segment)
    │
    ├─ Frontend: Redireciona para Hotmart (externa)
    │   └─ URL: https://hotmart.com/checkout?id=COMUNIDADE_MILIONARIA
    │
    ├─ Hotmart: Processa pagamento (stripe/paypal)
    │
    ├─ Hotmart: Envia webhook para backend
    │   POST /api/webhooks/hotmart
    │   Payload: { buyer_email, product_id, transaction_id, status: 'completed' }
    │
    ├─ Backend:
    │   ├─ Valida assinatura do webhook (HMAC)
    │   ├─ Busca/cria User pelo email
    │   ├─ Cria CommunityMember (status: active)
    │   ├─ Envia e-mail de confirmação (ActiveCampaign)
    │   ├─ Fornece link de acesso à comunidade
    │   └─ Cria evento de conversão (analytics)
    │
    └─ Utilizador: Acessa comunidade (plataforma externa)
```

## 5. Stack de Integrações

```
┌────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                          │
│         (Cliente comunica com backend apenas)                  │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 │ HTTPS
                 │
┌────────────────▼─────────────────────────────────────────────────┐
│                    BACKEND (Express + Node.js)                  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Serviços de Integração                                  │   │
│  │                                                         │   │
│  │ ┌─────────────────────────────────────────────────┐    │   │
│  │ │ ActiveCampaign (E-mail + CRM)                   │    │   │
│  │ │ ├─ POST /api/v3/contacts (novo lead)           │    │   │
│  │ │ ├─ Tags dinâmicas (source, quiz result)        │    │   │
│  │ │ └─ Automações (welcome, nurture)               │    │   │
│  │ └─────────────────────────────────────────────────┘    │   │
│  │                                                         │   │
│  │ ┌─────────────────────────────────────────────────┐    │   │
│  │ │ OpenAI (Chat + IA)                              │    │   │
│  │ │ ├─ GPT-4 Turbo (chat responses)                │    │   │
│  │ │ ├─ Embeddings (busca semântica)                │    │   │
│  │ │ └─ Prompt engineering (brand voice)            │    │   │
│  │ └─────────────────────────────────────────────────┘    │   │
│  │                                                         │   │
│  │ ┌─────────────────────────────────────────────────┐    │   │
│  │ │ Hotmart (Checkout de Pagamentos)                │    │   │
│  │ │ ├─ Webhook (confirmação de pagamento)          │    │   │
│  │ │ ├─ HMAC validation (segurança)                 │    │   │
│  │ │ └─ Status update (transações)                  │    │   │
│  │ └─────────────────────────────────────────────────┘    │   │
│  │                                                         │   │
│  │ ┌─────────────────────────────────────────────────┐    │   │
│  │ │ Algolia (Busca)                                 │    │   │
│  │ │ ├─ Indexação (content, programs)               │    │   │
│  │ │ ├─ Busca full-text + semântica                 │    │   │
│  │ │ └─ Autocomplete                                │    │   │
│  │ └─────────────────────────────────────────────────┘    │   │
│  │                                                         │   │
│  │ ┌─────────────────────────────────────────────────┐    │   │
│  │ │ Cloudinary (Media)                              │    │   │
│  │ │ ├─ Imagens (otimização, transformações)        │    │   │
│  │ │ ├─ Vídeos (streaming, thumbnails)              │    │   │
│  │ │ └─ CDN global                                  │    │   │
│  │ └─────────────────────────────────────────────────┘    │   │
│  │                                                         │   │
│  │ ┌─────────────────────────────────────────────────┐    │   │
│  │ │ Segment (Analytics)                             │    │   │
│  │ │ ├─ Eventos (tracking unificado)                │    │   │
│  │ │ ├─ Integração com GA4, PostHog, HubSpot        │    │   │
│  │ │ └─ Identity resolution                         │    │   │
│  │ └─────────────────────────────────────────────────┘    │   │
│  │                                                         │   │
│  │ ┌─────────────────────────────────────────────────┐    │   │
│  │ │ Sentry (Error Tracking)                         │    │   │
│  │ │ ├─ Captura de erros (frontend + backend)       │    │   │
│  │ │ ├─ Performance monitoring                       │    │   │
│  │ │ └─ Release tracking                            │    │   │
│  │ └─────────────────────────────────────────────────┘    │   │
│  │                                                         │   │
│  │ ┌─────────────────────────────────────────────────┐    │   │
│  │ │ Calendly (Agendamento)                          │    │   │
│  │ │ ├─ Embed em página Contato                      │    │   │
│  │ │ └─ Webhook para triagem automática (IA)        │    │   │
│  │ └─────────────────────────────────────────────────┘    │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 6. Estrutura de Dados (Entidades Principais)

```
USER (Utilizador)
├─ id (UUID)
├─ email (unique)
├─ name
├─ role (public, subscriber, member, admin)
├─ preferences (JSON: tema, idioma, etc)
├─ createdAt
└─ updatedAt

    ↓ HAS_MANY

LEAD
├─ id (UUID)
├─ email
├─ name
├─ source (quiz, newsletter, contact)
├─ data (JSON: quiz answers)
├─ createdAt

    ↓ HAS_MANY

EVENT
├─ id (UUID)
├─ type (page_view, cta_click, form_submit)
├─ data (JSON: página, tempo, etc)
└─ timestamp

CONTENT (Blog, Vídeo, Podcast)
├─ id (UUID)
├─ title
├─ slug (unique)
├─ type (blog, video, podcast)
├─ category
├─ content (markdown)
├─ image
├─ tags (array)
├─ seoTitle
└─ published

PROGRAM (Ofertas)
├─ id (UUID)
├─ name (PRIME, MASTERY)
├─ slug (unique)
├─ description
├─ price
├─ duration
└─ modules (JSON)

COMMUNITY_MEMBER
├─ userId (FK)
├─ joinedAt
├─ status (active, paused, cancelled)
└─ tier (standard, premium)
```

## 7. Fluxo de Deployment

```
LOCAL DEVELOPMENT
│
├─ git checkout -b feature/nova-pagina
│
├─ npm run dev (inicia Next.js + Express localmente)
│
├─ Faz mudanças, testa localmente
│
└─ git push origin feature/nova-pagina

GITHUB (Trigger)
│
├─ PR aberto
│
├─ GitHub Actions workflow:
│   ├─ npm run lint (ESLint)
│   ├─ npm run typecheck (TypeScript)
│   ├─ npm test (Jest/Vitest)
│   └─ npm run build (build Next.js + backend)
│
├─ Reviews (code review + Architect review)
│
└─ Merge para main

PRODUCTION DEPLOY
│
├─ Vercel (Frontend auto-deploy)
│   ├─ Build Next.js
│   ├─ SSG para conteúdo estático
│   └─ Deploy para edge network
│
├─ Railway (Backend auto-deploy)
│   ├─ Build imagem Docker
│   ├─ Run migrations do Prisma
│   └─ Restart serviço
│
├─ Database migrations (Prisma)
│
└─ Monitoramento:
    ├─ Sentry (erros)
    ├─ Datadog (logs)
    └─ Analytics (conversão)
```

## 8. Matriz de Responsabilidades

| Componente | Dono | Escalação |
|-----------|------|-----------|
| Frontend (Next.js) | @dev | @ux-design-expert para UX |
| Backend API (Express) | @dev | @architect para padrões |
| Database Schema | @data-architect | @architect para relações |
| Integrações (APIs) | @dev | @data-architect para dados |
| Deploy & CI/CD | @devops | @architect para estratégia |
| Performance | @qa + @architect | @dev para implementação |
| Segurança | @architect | @devops para infra |
| Analytics & Monitoring | @qa | @dev para implementação |
| Design Visual | @ux-design-expert | @architect para acessibilidade |

---

**Próximo Passo:** Aprovar esta arquitetura e começar com Setup do Projeto + Kickoff de Development.
