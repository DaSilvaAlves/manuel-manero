# 🚀 Setup Guide - Começar a Implementação

**Data:** 11 de fevereiro de 2026
**Versão:** 1.0

---

## 1. Pré-requisitos

### Ferramentas Necessárias

```bash
# Node.js & npm
node --version  # v20 ou superior
npm --version   # v10 ou superior

# Git
git --version   # v2.39 ou superior

# Opcional (recomendado)
- VS Code + extensões: ESLint, Prettier, TypeScript Vue Plugin
- Insomnia ou Postman (para testar API)
- PostgreSQL local (para dev, ou usar Vercel Postgres)
```

### Contas Externas Necessárias

```
[ ] GitHub (para repositório + CI/CD)
[ ] Vercel (para deploy frontend)
[ ] Railway (para deploy backend)
[ ] Vercel Postgres (para database)
[ ] ActiveCampaign (para e-mail + leads)
[ ] OpenAI (para IA)
[ ] Algolia (para busca)
[ ] Cloudinary (para media)
[ ] Hotmart (já existente)
[ ] Calendly (já existente)
```

---

## 2. Criação do Repositório

### 2.1 Inicializar Monorepo

```bash
# Criar diretório do projeto
mkdir manuel-manero-site
cd manuel-manero-site

# Inicializar Git
git init
git config user.name "Seu Nome"
git config user.email "seu@email.com"

# Criar package.json raiz (workspace)
npm init -w
```

### 2.2 Estrutura Inicial

```bash
# Criar pastas principais
mkdir -p apps/web apps/api packages/{shared-types,ui,utils}
mkdir docs .github/workflows

# Criar .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env.local
.env.*.local
dist/
build/
.next/
.vercel/
.DS_Store
*.log
EOF

# Criar README
cat > README.md << 'EOF'
# Ecossistema "UAU" - Manuel Manero

Site moderno para Manuel Manero com foco em marca pessoal, programas e comunidade.

## Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Backend:** Express, TypeScript
- **Database:** PostgreSQL + Redis
- **Deploy:** Vercel + Railway

## Getting Started

```bash
npm install
npm run dev
```

## Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Componentes](docs/COMPONENTS.md)
- [API](docs/API.md)
EOF

git add .
git commit -m "chore: initial project structure"
```

---

## 3. Frontend Setup (Next.js)

### 3.1 Criar aplicação Next.js

```bash
cd apps/web

npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --use-npm \
  --app

# Responder às perguntas:
# - ESLint: Yes
# - Src dir: No
# - App router: Yes
# - Customize import alias: No
```

### 3.2 Instalar dependências essenciais

```bash
npm install \
  react-hook-form zod @hookform/resolvers \
  @tanstack/react-query@next \
  zustand \
  framer-motion \
  axios \
  next-auth@beta \
  @next-auth/prisma-adapter \
  clsx class-variance-authority lucide-react

npm install -D \
  @types/node @types/react @types/react-dom \
  tailwindcss-animate \
  postcss autoprefixer
```

### 3.3 Configurar Tailwind & Componentes

```bash
# Copiar configuração de Tailwind
npx shadcn-ui@latest init -d  # Dark mode + default styles

# Adicionar componentes base
npx shadcn-ui@latest add button card form input label
```

### 3.4 Estrutura de Pastas (Frontend)

```
apps/web/
├── app/
│   ├── layout.tsx (root layout + header/footer)
│   ├── page.tsx (home)
│   ├── sobre/
│   │   └── page.tsx
│   ├── programas/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── comunidade/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contato/
│   │   └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   └── not-found.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── SideBar.tsx
│   ├── hero/
│   │   ├── HeroVideo.tsx
│   │   └── HeroStats.tsx
│   ├── cards/
│   │   ├── ProgramCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── ContentCard.tsx
│   ├── forms/
│   │   ├── LeadForm.tsx
│   │   └── QuizAssessment.tsx
│   ├── ai/
│   │   ├── ChatBubble.tsx
│   │   └── PersonalizedRecommendations.tsx
│   └── sections/
│       ├── TextImageSection.tsx
│       └── CarouselSection.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useScroll.ts
│   └── usePreferences.ts
├── lib/
│   ├── api-client.ts
│   ├── constants.ts
│   ├── cn.ts (clsx utility)
│   └── schemas.ts (Zod schemas)
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
└── package.json
```

---

## 4. Backend Setup (Express + TypeScript)

### 4.1 Criar aplicação Node

```bash
cd ../../apps/api

npm init -y

npm install \
  express typescript ts-node @types/express @types/node \
  dotenv cors @types/cors \
  axios \
  prisma @prisma/client \
  zod \
  redis node-redis \
  bull bull-board \
  @sendgrid/mail \
  jsonwebtoken @types/jsonwebtoken

npm install -D \
  @types/node \
  ts-node \
  nodemon \
  eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 4.2 Estrutura de Pastas (Backend)

```
apps/api/
├── src/
│   ├── index.ts (entry point)
│   ├── routes/
│   │   ├── index.ts
│   │   ├── leads.ts
│   │   ├── blog.ts
│   │   ├── programs.ts
│   │   ├── ai.ts
│   │   └── webhooks.ts
│   ├── controllers/
│   │   ├── leadController.ts
│   │   ├── contentController.ts
│   │   ├── programController.ts
│   │   └── aiController.ts
│   ├── services/
│   │   ├── activeCampaign.ts
│   │   ├── openai.ts
│   │   ├── algolia.ts
│   │   └── hotmart.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   ├── validation.ts
│   │   └── auth.ts
│   ├── models/ (Prisma gerada aqui)
│   ├── lib/
│   │   ├── db.ts (Prisma client)
│   │   ├── redis.ts
│   │   └── logger.ts
│   ├── config/
│   │   └── env.ts
│   └── types/
│       └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── tsconfig.json
├── nodemon.json
└── package.json
```

### 4.3 Arquivo .env.example

```bash
cat > .env.example << 'EOF'
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/manuel_manero"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-secret-key-here"

# ActiveCampaign
ACTIVECAMPAIGN_API_URL="https://yourinstance.api-us1.com"
ACTIVECAMPAIGN_API_KEY="your-api-key"

# OpenAI
OPENAI_API_KEY="your-api-key"

# Algolia
ALGOLIA_APP_ID="your-app-id"
ALGOLIA_SEARCH_KEY="your-search-key"
ALGOLIA_ADMIN_KEY="your-admin-key"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Hotmart Webhook
HOTMART_WEBHOOK_SECRET="your-webhook-secret"

# Email
SENDGRID_API_KEY="your-api-key"

# Environment
NODE_ENV="development"
API_PORT="3001"
FRONTEND_URL="http://localhost:3000"
EOF

cp .env.example .env.local
```

---

## 5. Database Setup (PostgreSQL + Prisma)

### 5.1 Inicializar Prisma

```bash
cd apps/api

npx prisma init

# Isso cria:
# - prisma/schema.prisma
# - .env (não committar)
```

### 5.2 Configurar schema.prisma

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  name         String?
  role         String   @default("subscriber")
  newsletter   Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  leads        Lead[]
  quizAnswers  QuizAnswer[]
  community    CommunityMember?
}

model Lead {
  id        String   @id @default(cuid())
  email     String
  name      String?
  source    String
  data      Json?
  createdAt DateTime @default(now())

  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
}

model Content {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  content     String
  type        String
  category    String
  tags        String[]
  published   Boolean  @default(false)
  image       String?
  videoUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  seoTitle    String?
  seoDesc     String?

  @@index([slug])
  @@index([category])
}

model Program {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  price       Float?
  duration    String
  modules     Int
  modules_detail Json?
  createdAt   DateTime @default(now())

  testimonials TestimonialVideo[]
}

model CommunityMember {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  joinedAt  DateTime @default(now())
  status    String   @default("active")
  tier      String   @default("standard")
}

model TestimonialVideo {
  id        String   @id @default(cuid())
  name      String
  role      String
  videoUrl  String
  quote     String?
  result    String?
  createdAt DateTime @default(now())

  programs Program[]
}

model QuizAnswer {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  answers   Json
  result    String
  createdAt DateTime @default(now())

  @@index([userId])
}

model Event {
  id        String   @id @default(cuid())
  type      String
  data      Json?
  timestamp DateTime @default(now())

  @@index([type])
  @@index([timestamp])
}
```

### 5.3 Executar Migration

```bash
# Criar migration inicial
npx prisma migrate dev --name init

# Gerar Prisma Client
npx prisma generate

# Abrir Prisma Studio (interface gráfica)
npx prisma studio
```

---

## 6. Configuração de CI/CD (GitHub Actions)

### 6.1 Criar workflow de testes

```bash
mkdir -p .github/workflows

cat > .github/workflows/test.yml << 'EOF'
name: Test & Lint

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - uses: actions/checkout@v4

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm install

    - name: Lint
      run: npm run lint

    - name: Type check
      run: npm run typecheck

    - name: Build
      run: npm run build

    - name: Run tests
      run: npm test
EOF
```

### 6.2 Script de build no package.json raiz

```json
{
  "scripts": {
    "dev": "npm run dev --workspace=apps/web & npm run dev --workspace=apps/api",
    "build": "npm run build --workspace=apps/web && npm run build --workspace=apps/api",
    "lint": "npm run lint --workspaces",
    "typecheck": "npm run typecheck --workspaces",
    "test": "npm test --workspaces"
  }
}
```

---

## 7. Deploy Configuration

### 7.1 Vercel (Frontend)

```bash
# Fazer login
npx vercel login

# Link projeto
cd apps/web
npx vercel link

# Configurar variables
npx vercel env add NEXT_PUBLIC_API_URL
# Valor: https://seu-api-domain.com
```

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url"
  }
}
```

### 7.2 Railway (Backend)

```bash
# Fazer login
npm install -g railway
railway login

# Inicializar projeto
railway init

# Add database PostgreSQL
railway add

# Configurar env vars
railway env add DATABASE_URL
railway env add JWT_SECRET
# ... outros env vars
```

**railway.toml:**
```toml
[build]
builder = "dockerfile"

[deploy]
startCommand = "npm start"
```

---

## 8. Próximos Passos (Checklist)

### Semana 1: Setup
- [ ] Repositório criado no GitHub
- [ ] Monorepo estruturado (Frontend + Backend)
- [ ] Dependências instaladas
- [ ] PostgreSQL local configurado
- [ ] Prisma schema criado
- [ ] CI/CD workflow configurado
- [ ] Deploy staging funcional (Vercel + Railway)

### Semana 2: Componentes Base
- [ ] Layout (Header, Footer, SideBar)
- [ ] Hero components
- [ ] Cards (Program, Testimonial, Content)
- [ ] Design System Tailwind
- [ ] Storybook setup (opcional)

### Semana 3: Páginas Estáticas
- [ ] Home page (MVP)
- [ ] Sobre page
- [ ] Blog listing
- [ ] Contato page

### Semana 4: Backend + Integrações
- [ ] API routes setup
- [ ] Database CRUD operations
- [ ] ActiveCampaign integration
- [ ] OpenAI integration
- [ ] Hotmart webhook handler

### Semana 5+: Features Avançadas
- [ ] IA Chat
- [ ] Recomendações
- [ ] Quiz Assessment
- [ ] Performance optimization
- [ ] Analytics

---

## 9. Comandos Úteis

```bash
# Development
npm run dev              # Start all apps
cd apps/web && npm run dev
cd apps/api && npm run dev

# Database
npx prisma migrate dev --name <name>
npx prisma migrate deploy  # Production
npx prisma studio          # Visual browser

# Linting
npm run lint
npm run lint --fix

# Testing
npm test
npm test -- --watch

# Build
npm run build

# Deploy
cd apps/web && npm run build && npx vercel deploy --prod
cd apps/api && railway up
```

---

## 10. Recursos & Referências

- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com/en/api.html)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Query](https://tanstack.com/query/latest)
- [Zod Validation](https://zod.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 11. Suporte & Problemas Comuns

### Problema: "Module not found"
```bash
# Solução: Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Problema: "Database connection failed"
```bash
# Solução: Verificar DATABASE_URL no .env
echo $DATABASE_URL
npx prisma db push --force-reset  # Reset database
```

### Problema: "Port already in use"
```bash
# Frontend (3000)
PORT=3001 npm run dev

# Backend (3001)
API_PORT=3002 npm run dev
```

---

**Pronto para começar?** 🚀

Próximo passo: Ativar o @dev para começar a implementar!
