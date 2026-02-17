# Deployment Architecture Guide - Manuel Manero Ecosystem

**Version:** 1.0.0
**Date:** 2026-02-17
**Status:** Production-Ready
**Environment:** Vercel + Railway + PostgreSQL

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Vercel Frontend Deployment](#1-vercel-frontend-deployment)
4. [Railway Backend & Database](#2-railway-backend--database-deployment)
5. [Integration Layer](#3-integration-layer)
6. [CI/CD Pipeline](#4-cicd-pipeline-github-actions)
7. [Database Management](#5-database-management)
8. [Monitoring & Observability](#6-monitoring--observability)
9. [Security & Secrets Management](#7-security--secrets-management)
10. [Rollback & Disaster Recovery](#8-rollback--disaster-recovery)
11. [Cost Optimization](#9-cost-optimization)
12. [Deployment Checklist](#10-deployment-checklist)

---

## Overview

### Current Stack

| Component | Service | Technology |
|-----------|---------|------------|
| **Frontend** | Vercel | Next.js 15 + React 18 + TypeScript |
| **Backend** | Railway | Express.js + Node.js 20 + TypeScript |
| **Database** | Railway Postgres | PostgreSQL 15 + Prisma ORM |
| **CI/CD** | GitHub Actions | Automated testing & deployment |
| **Repository** | GitHub | Source code & version control |

### Deployment Flow

```
Developer pushes to main branch
         ↓
GitHub Actions triggered (lint, typecheck, test)
         ↓
Backend builds & deploys to Railway
         ↓
Database migrations run automatically
         ↓
Frontend builds & deploys to Vercel
         ↓
Post-deployment verification
         ↓
🚀 Production Live
```

### Key Metrics & Targets

| Metric | Target | Current Status |
|--------|--------|-----------------|
| Frontend Performance (Lighthouse) | > 90 | Optimizing |
| Backend Response Time | < 200ms | On track |
| Database Query Time | < 100ms | On track |
| Uptime SLA | 99.9% | TBD |
| Deployment Time | < 10 minutes | TBD |
| TTFB (Time to First Byte) | < 1s | Optimizing |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                         │
│  (manuel-manero / DaSilvaAlves/Manero)                           │
└────────────────────┬──────────────────────────────────────────────┘
                     │ (push to main)
                     ↓
        ┌────────────────────────────────┐
        │  GitHub Actions CI/CD Pipeline │
        │  ✓ Lint & Type Check          │
        │  ✓ Run Tests                  │
        │  ✓ Build Apps                 │
        └────────┬────────────┬──────────┘
                 │            │
         ┌───────┘            └────────┐
         ↓                             ↓
    ┌─────────────────┐        ┌──────────────────┐
    │  Railway Backend │        │  Vercel Frontend │
    │  (API Service)  │        │  (Next.js)       │
    │  :3001          │        │  Automatic CDN   │
    └─────────┬───────┘        │  Edge Functions  │
              │                └──────────────────┘
              ↓
    ┌────────────────────────────┐
    │  Railway PostgreSQL        │
    │  (Managed Database)        │
    │  Connection Pooling        │
    │  Automatic Backups         │
    └────────────────────────────┘

    ┌────────────────────────────────────────────────────┐
    │            External Services (Integrations)         │
    │  ├─ ActiveCampaign (CRM)                           │
    │  ├─ Hotmart (Payments)                             │
    │  ├─ OpenAI (IA Chat)                               │
    │  ├─ SendGrid (Email)                               │
    │  └─ Sentry (Error Tracking)                        │
    └────────────────────────────────────────────────────┘
```

---

## 1. Vercel Frontend Deployment

### 1.1 Initial Setup

#### Step 1: Connect GitHub Repository to Vercel

```bash
# 1. Go to https://vercel.com/dashboard
# 2. Click "Add New..." → "Project"
# 3. Connect GitHub account if not already done
# 4. Select repository: DaSilvaAlves/Manero
# 5. Import project
```

#### Step 2: Configure Build Settings

In Vercel Dashboard → Project Settings → Build & Development Settings:

```yaml
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install --legacy-peer-deps
Dev Command: npm run dev
```

**Root Directory:** Leave empty (monorepo auto-detected)

#### Step 3: Environment Variables

Go to **Settings → Environment Variables** and add:

```env
# Frontend API Configuration
NEXT_PUBLIC_API_URL=https://manuel-manero-api.railway.app
NEXT_PUBLIC_APP_NAME=Manuel Manero
NEXT_PUBLIC_ANALYTICS_ID=your-google-analytics-id

# Optional: Feature flags
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_QUIZ=true
```

**Important:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

### 1.2 Build Configuration

Create or update `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/next@latest",
      "config": {
        "maxLambdaSize": "50mb",
        "regions": ["cdg1", "iad1"]
      }
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url",
    "NEXT_PUBLIC_ANALYTICS_ID": "@analytics_id"
  },
  "headers": [
    {
      "source": "/api/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    },
    {
      "source": "/:path*",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/blog/:slug*",
      "destination": "/articles/:slug*",
      "permanent": true
    }
  ]
}
```

### 1.3 Preview Deployments

**Automatic:** Every pull request creates a preview deployment
- URL: `https://[branch-name].manuel-manero.vercel.app`
- Staging environment with backend pointing to production
- Automatic cleanup after PR merge

**Manual:** Test before production
```bash
git push origin feature/new-feature
# Vercel creates preview URL automatically
# Share preview link for QA testing
```

### 1.4 Domain & SSL Configuration

#### Add Custom Domain

1. Go to **Settings → Domains**
2. Add custom domain: `manuel-manero.com` (or production domain)
3. Update DNS:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel.com.`
4. Add root domain redirect (`.com` → `www.manuel-manero.com`)

#### SSL Certificate

Vercel **automatically provisions free SSL certificates** via Let's Encrypt:
- ✅ Automatic renewal
- ✅ TLS 1.3 support
- ✅ Wildcard certificates

### 1.5 Analytics & Monitoring (Vercel)

Enable in **Settings → Analytics**:

```yaml
Web Analytics:
  ✓ Enable by default
  ✓ Track Core Web Vitals
  ✓ Real-time monitoring

Speed Insights:
  ✓ Monitor performance
  ✓ LCP, FID, CLS metrics
  ✓ Real browser data
```

**Target Metrics:**
- LCP (Largest Contentful Paint): < 2.5s ✓
- CLS (Cumulative Layout Shift): < 0.1 ✓
- TTFB (Time to First Byte): < 1s

---

## 2. Railway Backend & Database Deployment

### 2.1 Railway Project Setup

#### Step 1: Create Railway Account & Project

```bash
# 1. Go to https://railway.app
# 2. Sign up with GitHub
# 3. Create new project
# 4. Add services:
#    - PostgreSQL (database)
#    - Node.js (API service)
```

#### Step 2: Deploy PostgreSQL

1. In Railway Dashboard → Select Project
2. Click **"Create New Service"** → **"PostgreSQL"**
3. Configure:

```yaml
Database:
  Name: manuel-manero
  Username: postgres
  Password: [Auto-generated - copy and save]
  Port: 5432

Backup:
  Automatic backups: ✓ Enabled
  Retention: 30 days

Scaling:
  Plan: Pro ($12/month - single pod)
  RAM: 1GB
```

4. Copy connection string from **Variables**:
```
DATABASE_URL=postgresql://postgres:[password]@[railway-host]:5432/manuel_manero
```

### 2.2 Deploy Node.js API Service

#### Step 1: Connect Repository

1. Railway Dashboard → Click **"Add Service"** → **"GitHub Repo"**
2. Select: `DaSilvaAlves/Manero`
3. Deploy from branch: `main`

#### Step 2: Configure Environment

In Railway → Project Settings → Variables, add:

```env
# Database
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/manuel_manero

# Server
NODE_ENV=production
API_PORT=3001
API_URL=https://manuel-manero-api.railway.app
FRONTEND_URL=https://manuel-manero.com

# Integrations
ACTIVECAMPAIGN_API_URL=https://yourinstance.api-us1.com
ACTIVECAMPAIGN_API_KEY=your-production-key

OPENAI_API_KEY=your-production-key

SENDGRID_API_KEY=your-production-key

# JWT
JWT_SECRET=your-production-secret-key
JWT_EXPIRY=7d

# Logging
LOG_LEVEL=info
```

#### Step 3: Configure Build & Start

In Railway → Service Settings → **Build & Deploy**:

```yaml
Build Command: npm run build
Start Command: node dist/apps/api/index.js
Root Directory: .

# Dockerfile: Use existing Dockerfile
Dockerfile: apps/api/Dockerfile
```

#### Step 4: Set Health Check (Railway)

Railway automatically detects health checks. Verify API health:

```bash
GET /health → 200 OK
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-17T10:00:00Z",
  "database": "connected"
}
```

### 2.3 Auto-Restart & Scaling

#### Restart Policy

Railway → Service Settings → **Auto Restart**:
- ✓ Automatically restart on failure
- Restart interval: 30 seconds
- Max retries: 3

#### Horizontal Scaling

```yaml
Pro Plan Features:
  ✓ Single pod (1 instance)
  ✓ Auto-restart on crash
  ✓ Shared database

For High Traffic:
  - Scale to 2-3 instances
  - Add Railway Postgres Pro (higher compute)
  - Implement connection pooling (PgBouncer)
```

### 2.4 Connection Pooling Setup

For production, add connection pooling to prevent database exhaustion:

#### Option 1: PgBouncer (Recommended)

Create `apps/api/pgbouncer.ini`:

```ini
[databases]
manuel_manero = host=[railway-postgres-host] port=5432 user=postgres password=[pwd] dbname=manuel_manero

[pgbouncer]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 25
min_pool_size = 5
reserve_pool_size = 5
reserve_pool_timeout = 3
max_db_connections = 100
max_user_connections = 100
```

Update `DATABASE_URL` to connect through PgBouncer:
```
DATABASE_URL=postgresql://postgres:[pwd]@pgbouncer-host:6432/manuel_manero
```

#### Option 2: Prisma Connection Pool

In `apps/api/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")

  // Connection pool settings
  directUrl = env("DIRECT_URL")  // Direct connection for migrations
}
```

Update `.env.production`:
```env
DATABASE_URL=postgresql://...?schema=public
DIRECT_URL=postgresql://...?schema=public
```

### 2.5 Railway Domain & SSL

#### Custom Domain

1. Railway → Service → **Settings → Domain**
2. Add domain: `manuel-manero-api.railway.app` or `api.manuel-manero.com`
3. SSL automatically provisioned by Railway (free)

#### Verify SSL

```bash
curl -I https://manuel-manero-api.railway.app/health
# Response: HTTP/2 200
```

---

## 3. Integration Layer

### 3.1 CORS Configuration

Update `apps/api/src/index.ts`:

```typescript
import cors from 'cors';

const allowedOrigins = [
  process.env.FRONTEND_URL, // https://manuel-manero.com
  'http://localhost:3000',  // Local development
  /\.manuel-manero\.vercel\.app$/, // Vercel preview deployments
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400, // 24 hours
  })
);
```

### 3.2 API Endpoint Configuration

Frontend uses environment variable to configure API URL:

```typescript
// apps/web/src/lib/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 3.3 Environment Sync

**Deployment Variable Convention:**

| Service | Var Name | Example Value |
|---------|----------|---------------|
| Vercel Frontend | `NEXT_PUBLIC_API_URL` | `https://manuel-manero-api.railway.app` |
| Railway Backend | `FRONTEND_URL` | `https://manuel-manero.com` |
| Railway Backend | `API_URL` | `https://manuel-manero-api.railway.app` |

**Sync Process:**
1. Update Railway backend environment variables
2. Deploy backend service
3. Verify `/health` endpoint responds with API_URL
4. Update Vercel frontend environment variables
5. Trigger frontend redeployment

### 3.4 Request/Response Logging

Add request logging middleware in `apps/api/src/index.ts`:

```typescript
import morgan from 'morgan';

// Development: detailed logs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Production: structured logs
if (process.env.NODE_ENV === 'production') {
  app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'));
}
```

### 3.5 Error Tracking Integration (Sentry)

Install Sentry for both frontend and backend:

```bash
# Backend
cd apps/api
npm install @sentry/node @sentry/tracing

# Frontend
cd apps/web
npm install @sentry/next
```

Configure in `apps/api/src/index.ts`:

```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({
      request: true,
      serverName: true,
    }),
  ],
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

---

## 4. CI/CD Pipeline (GitHub Actions)

### 4.1 Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

env:
  NODE_VERSION: '20'
  REGISTRY: ghcr.io

jobs:
  # Job 1: Validate Code Quality
  validate:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --legacy-peer-deps

      - name: Run linting
        run: npm run lint

      - name: Type checking
        run: npm run typecheck

      - name: Build validation
        run: npm run build

  # Job 2: Run Tests (when available)
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    timeout-minutes: 20

    services:
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_DB: manuel_manero_test
          POSTGRES_PASSWORD: test_password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --legacy-peer-deps

      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: postgresql://postgres:test_password@localhost:5432/manuel_manero_test

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  # Job 3: Deploy Backend to Railway
  deploy-backend:
    name: Deploy Backend (Railway)
    needs: [validate, test]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    timeout-minutes: 30

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Railway
        uses: railway-app/deploy-action@v1
        with:
          token: ${{ secrets.RAILWAY_TOKEN }}
          project: ${{ secrets.RAILWAY_PROJECT_ID }}
          service: api

      - name: Verify API health
        run: |
          for i in {1..30}; do
            if curl -f https://manuel-manero-api.railway.app/health; then
              echo "API is healthy"
              exit 0
            fi
            echo "Attempt $i: Waiting for API to be ready..."
            sleep 5
          done
          echo "API failed to become healthy"
          exit 1

      - name: Notify Slack (Success)
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ Backend deployed successfully",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "✅ *Backend Deployed*\nRef: ${{ github.ref }}\nCommit: ${{ github.sha }}\nAPI: https://manuel-manero-api.railway.app"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

      - name: Notify Slack (Failure)
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "❌ Backend deployment failed",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "❌ *Backend Deployment Failed*\nRef: ${{ github.ref }}\nCommit: ${{ github.sha }}\nCheck logs: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

  # Job 4: Deploy Frontend to Vercel
  deploy-frontend:
    name: Deploy Frontend (Vercel)
    needs: [validate, test, deploy-backend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    timeout-minutes: 20

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}
          prod: true

      - name: Notify Slack (Success)
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ Frontend deployed successfully",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "✅ *Frontend Deployed*\nRef: ${{ github.ref }}\nCommit: ${{ github.sha }}\nURL: https://manuel-manero.com"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

  # Job 5: Smoke Tests (Post-Deployment)
  smoke-tests:
    name: Smoke Tests
    needs: [deploy-backend, deploy-frontend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    timeout-minutes: 15

    steps:
      - name: Check API health
        run: |
          curl -f https://manuel-manero-api.railway.app/health || exit 1

      - name: Check Frontend
        run: |
          curl -f https://manuel-manero.com || exit 1

      - name: Test API endpoint
        run: |
          curl -f https://manuel-manero-api.railway.app/api/v1 || exit 1

      - name: Notify Slack (Passed)
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "✅ All smoke tests passed",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "✅ *Production Deployment Complete*\nAll systems operational"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

      - name: Notify Slack (Failed)
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "❌ Smoke tests failed",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "❌ *Post-Deployment Smoke Tests Failed*\nCheck systems immediately"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### 4.2 Set GitHub Secrets

Go to **GitHub Repository → Settings → Secrets and variables → Actions**

Add secrets:

```
RAILWAY_TOKEN              = [from Railway dashboard → Account → Tokens]
RAILWAY_PROJECT_ID         = [from Railway project URL]

VERCEL_TOKEN               = [from Vercel settings → Tokens]
VERCEL_ORG_ID              = [from Vercel team settings]
VERCEL_PROJECT_ID          = [from Vercel project settings]

SLACK_WEBHOOK_URL          = [from Slack workspace → Apps → Incoming Webhooks]
```

### 4.3 Workflow Triggers

The workflow runs on:

1. **Push to main branch** → Full deployment pipeline
2. **Pull request to main** → Validation only (no deployment)

### 4.4 Branch Protection Rules

Go to **GitHub Repository → Settings → Branches → main**

Enable:
```yaml
✓ Require a pull request before merging
✓ Require status checks to pass (select: validate, test)
✓ Require branches to be up to date
✓ Require code reviews: 1 approval
✓ Dismiss stale pull request approvals when new commits
✓ Require CODEOWNERS review
```

---

## 5. Database Management

### 5.1 Prisma Migration Strategy

#### Development Workflow

```bash
# 1. Create migration
cd apps/api
npx prisma migrate dev --name add_user_field

# 2. Prisma generates migration SQL and updates client
# 3. Changes applied to local database
# 4. Commit migration file to Git

git add prisma/migrations/
git commit -m "feat: add user field migration"
```

#### Production Deployment

Railway automatically runs migrations during deployment:

1. Backend service receives new code
2. Dockerfile runs: `prisma migrate deploy`
3. Migrations applied to production database
4. Service restarts with new schema

**Ensure in `apps/api/Dockerfile`:**

```dockerfile
# Before CMD, run migrations
RUN npx prisma generate
RUN npx prisma migrate deploy || true

CMD ["dumb-init", "node", "--", "apps/api/dist/index.js"]
```

### 5.2 Database Backups

#### Automatic Backups (Railway)

Railway automatically backs up PostgreSQL:
- Frequency: Daily
- Retention: 30 days
- Automatic WAL archiving

**Verify backups:**
```bash
# Railway Dashboard → PostgreSQL Service → Backups
# View backup history and restore points
```

#### Manual Backup

Export database locally:

```bash
# Export full database
PGPASSWORD=yourpassword pg_dump \
  -h railway-host \
  -U postgres \
  -d manuel_manero > backup-$(date +%Y%m%d-%H%M%S).sql

# Import backup
PGPASSWORD=yourpassword psql \
  -h localhost \
  -U postgres \
  -d manuel_manero < backup-20260217-103000.sql
```

#### Backup to S3 (Optional but Recommended)

Create backup script in `scripts/backup-db.sh`:

```bash
#!/bin/bash

# Set variables
DB_HOST=$DATABASE_URL_HOST
DB_USER=$DATABASE_URL_USER
DB_PASS=$DATABASE_URL_PASSWORD
DB_NAME=$DATABASE_URL_DB
S3_BUCKET=manuel-manero-backups
BACKUP_DATE=$(date +%Y%m%d-%H%M%S)

# Create backup
PGPASSWORD=$DB_PASS pg_dump \
  -h $DB_HOST \
  -U $DB_USER \
  -d $DB_NAME \
  > /tmp/backup-$BACKUP_DATE.sql

# Compress
gzip /tmp/backup-$BACKUP_DATE.sql

# Upload to S3
aws s3 cp /tmp/backup-$BACKUP_DATE.sql.gz s3://$S3_BUCKET/backups/

# Clean up
rm /tmp/backup-$BACKUP_DATE.sql.gz

echo "Backup completed: $BACKUP_DATE"
```

Schedule via Railway cron job or GitHub Actions:

```yaml
name: Daily Database Backup

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM UTC daily

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Backup database
        run: bash scripts/backup-db.sh
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### 5.3 Connection Pooling Configuration

Update `apps/api/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

In production `.env`:

```env
# Connection pooling (transaction mode for 25 connections)
DATABASE_URL="postgresql://user:password@pooling-proxy:6432/manuel_manero?schema=public&pgbouncer=true"

# Direct connection for migrations (bypass pooling)
DIRECT_URL="postgresql://user:password@actual-database:5432/manuel_manero?schema=public"
```

### 5.4 Database Seeding

Create seed file in `apps/api/prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create programs
  await prisma.program.createMany({
    data: [
      {
        name: 'PRIME',
        slug: 'prime',
        description: 'Foundation course for personal branding',
        price: 499,
        currency: 'EUR',
        duration: '8 weeks',
        modules: 8,
        published: true,
      },
      {
        name: 'MASTERY',
        slug: 'mastery',
        description: 'Advanced program for scaling personal brand',
        price: 1299,
        currency: 'EUR',
        duration: '12 weeks',
        modules: 12,
        published: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding completed successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

Run manually:

```bash
cd apps/api
npm run seed
```

Run automatically on Railway deployment by adding to `Dockerfile`:

```dockerfile
# Run seed after migrations
RUN npx prisma migrate deploy || true
RUN npm run seed || true

CMD ["dumb-init", "node", "--", "apps/api/dist/index.js"]
```

### 5.5 Query Monitoring & Optimization

Enable Prisma logging in `apps/api/src/index.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' },
  ],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Params: ' + JSON.stringify(e.params));
  console.log('Duration: ' + e.duration + 'ms');
});
```

Monitor in production using Railway Dashboard:
- Go to PostgreSQL service
- View query metrics
- Identify slow queries

---

## 6. Monitoring & Observability

### 6.1 Application Performance Monitoring (APM)

#### Vercel Analytics

Built-in to Vercel deployments:

```typescript
// apps/web/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout() {
  return (
    <html>
      <body>
        {/* Your content */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

Monitor in Vercel Dashboard:
- Web Analytics: User behavior
- Speed Insights: Performance metrics
- Real Experience Score (RES)

#### Railway Metrics

Railway automatically tracks:
- CPU usage
- Memory usage
- Disk I/O
- Network I/O

View in Railway Dashboard → Service → Metrics

### 6.2 Error Tracking (Sentry)

#### Setup Sentry

1. Create account at https://sentry.io
2. Create project for Manuel Manero
3. Get DSN from Project Settings

#### Backend Integration

In `apps/api/src/index.ts`:

```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express(),
    new Sentry.Integrations.Postgres({ measureConnectionPoolSize: true }),
  ],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  beforeSend(event, hint) {
    // Filter out specific errors
    if (event.exception) {
      const error = hint.originalException;
      if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
        return null; // Don't report connection errors
      }
    }
    return event;
  },
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

#### Frontend Integration

In `apps/web/instrumentation.ts`:

```typescript
import * as Sentry from '@sentry/next';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### 6.3 Database Query Monitoring

#### New Relic (Alternative Option)

```bash
npm install newrelic
```

In `apps/api/src/index.ts`:

```typescript
require('newrelic');
import express from 'express';

// Continue with normal app setup
```

#### Query Performance Dashboard

Monitor in Railway:
- Slow query log analysis
- Connection pool utilization
- Transaction performance

### 6.4 Logging Strategy

#### Log Levels

```
DEBUG   - Detailed debugging information
INFO    - General informational messages
WARN    - Warning messages (potential issues)
ERROR   - Error messages (failures)
FATAL   - Fatal errors (system down)
```

#### Centralized Logging (Optional)

Add to `apps/api/src/index.ts`:

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

app.use((req, res, next) => {
  res.on('finish', () => {
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      responseTime: res.getHeader('X-Response-Time'),
    });
  });
  next();
});
```

### 6.5 Uptime Monitoring

Use Uptime Robot or Railway's built-in monitoring:

```bash
# Add monitoring endpoint
GET /health
Response: { status: "healthy", timestamp: "...", database: "connected" }
```

Configure checks:
- Frontend: `https://manuel-manero.com` (check every 5 minutes)
- Backend: `https://manuel-manero-api.railway.app/health` (check every 5 minutes)
- Database: Verify response time < 500ms

Set alerts:
- Slack notification on downtime
- Page alert if down > 5 minutes
- Email alert if down > 30 minutes

---

## 7. Security & Secrets Management

### 7.1 Environment Variables Protection

#### Never Commit Secrets

Ensure `.gitignore` includes:

```gitignore
# Environment
.env
.env.local
.env.*.local
.env.production

# Secrets
*.key
*.pem
*.p12
secrets.json
```

Verify no secrets in Git history:

```bash
# Check for API keys in history
git log -p --all -S 'sk_live_' -- '*.js' '*.ts' '*.env*'

# If found, use git-filter-repo to clean history
# DO NOT just remove and commit - key is already exposed!
```

#### Use GitHub Secrets

Store sensitive values in GitHub → Settings → Secrets:

```yaml
✓ API Keys (OpenAI, ActiveCampaign, SendGrid)
✓ Database URLs
✓ JWT Secrets
✓ OAuth tokens
✓ Webhook secrets
```

### 7.2 API Key Rotation

#### Rotation Schedule

- **Monthly** for JWT secrets
- **Quarterly** for integration API keys (ActiveCampaign, OpenAI)
- **On breach** immediately

#### Rotation Procedure

1. Generate new key in service dashboard
2. Add new key to production secrets (keep both for 24h)
3. Update code to use new key
4. Deploy to production
5. Verify both keys work
6. Remove old key after 24 hours
7. Document rotation in changelog

### 7.3 Database Credentials Management

#### Railway-Managed Credentials

Railway manages PostgreSQL credentials automatically:
- Stored securely in Railway vaults
- Rotatable via dashboard
- Never exposed in logs

#### Connection String Security

Never log or expose connection strings:

```typescript
// ❌ WRONG
console.log('Connecting to:', process.env.DATABASE_URL);

// ✅ CORRECT
console.log('Connecting to PostgreSQL database');

// ✅ CORRECT - Masked URL
const maskedUrl = process.env.DATABASE_URL?.replace(/:[^@]+@/, ':***@');
console.log('Database:', maskedUrl);
```

### 7.4 CORS & HTTPS Enforcement

#### CORS Configuration

```typescript
// Only allow requests from known origins
const allowedOrigins = [
  'https://manuel-manero.com',
  'https://www.manuel-manero.com',
  /\.manuel-manero\.vercel\.app$/, // Preview deployments
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o =>
      typeof o === 'string' ? origin === o : o.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
```

#### HTTPS Enforcement

```typescript
// Redirect HTTP to HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect(301, `https://${req.get('host')}${req.url}`);
    }
    next();
  });
}
```

### 7.5 Rate Limiting & DDoS Protection

#### Express Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// General rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for forms
const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 requests per hour
  skipSuccessfulRequests: true,
});

app.use('/api/', limiter);
app.post('/api/leads', strictLimiter, handleLeadCapture);
```

#### Cloudflare DDoS Protection

1. Set up Cloudflare free tier
2. Point domain to Cloudflare nameservers
3. Enable DDoS protection:
   - Under/attack mode: Medium
   - Challenge mode for bots
   - Block countries if needed

### 7.6 Input Validation & Sanitization

Use Zod for all input validation:

```typescript
import { z } from 'zod';

const leadSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(2).max(100),
  program: z.string().optional(),
  gdprConsent: z.boolean(),
});

app.post('/api/leads', (req, res) => {
  try {
    const validated = leadSchema.parse(req.body);
    // Process validated data
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
  }
});
```

### 7.7 Content Security Policy (CSP)

Add CSP headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/:path*",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' https:; font-src 'self' https:;"
        }
      ]
    }
  ]
}
```

---

## 8. Rollback & Disaster Recovery

### 8.1 Version Pinning Strategy

#### Backend (Railway)

All deployments are version-tracked:

```bash
# View deployment history
railway deployment list

# Rollback to previous version
railway deployment rollback [deployment-id]

# Or: Create new commit, revert code, push to main
git revert HEAD
git push origin main
```

#### Frontend (Vercel)

All deployments are stored:

```bash
# View deployment history
vercel deploy --list

# Rollback to specific deployment
vercel promote [deployment-url] --prod

# Or: Use Vercel dashboard → Deployments → Promote previous version
```

### 8.2 Database Migration Rollback

#### Rollback Procedure

```bash
# If latest migration caused issues:

cd apps/api

# Revert migration (creates rollback file)
npx prisma migrate resolve --rolled-back <migration-name>

# Or: Manually reverse migration
npx prisma migrate resolve --rolled-back add_user_field

# Test locally
npx prisma migrate dev

# Commit
git add prisma/migrations/
git commit -m "chore: rollback add_user_field migration"

# Deploy (automatic via Railway CI/CD)
git push origin main
```

#### Emergency Database Restore

From backup if migration causes data loss:

```bash
# 1. Stop all services
railway service scale api --replicas 0

# 2. Restore database from backup
railway db:restore [backup-id]

# 3. Restart service
railway service scale api --replicas 1
```

### 8.3 Zero-Downtime Deployments

#### Strategy: Blue-Green Deployment

1. Deploy new version to "green" environment
2. Verify health checks pass
3. Switch traffic from "blue" to "green"
4. Keep "blue" ready to rollback

Railway approach:

```bash
# Railway automatically handles zero-downtime:
# 1. New version starts in parallel
# 2. Health checks run
# 3. Traffic switches gradually
# 4. Old version scales down
```

#### Strategy: Canary Deployment

For risky changes:

```yaml
# Deploy to 10% of instances first
# Monitor for 15 minutes
# Then scale to 100%

Railway steps:
1. Scale service to 3 instances: railway service scale api --replicas 3
2. Deploy new version
3. Monitor first instance (10% traffic)
4. If stable, scale remaining instances
```

### 8.4 Disaster Recovery Plan

#### Failure Scenarios & Responses

| Scenario | Action | Time |
|----------|--------|------|
| **API service down** | Railway auto-restart | < 1 min |
| **Database down** | Failover to backup | < 5 min |
| **Vercel frontend down** | Revert to previous deployment | < 2 min |
| **Network issues** | Check Cloudflare status | < 5 min |
| **Data corruption** | Restore from backup | < 30 min |
| **Security breach** | Rotate all keys, redeploy | < 1 hour |

#### Emergency Contacts

Create `docs/EMERGENCY.md`:

```markdown
# Emergency Contacts & Procedures

## Critical Incident

1. **Contact:** Lead Developer
2. **Escalate:** Technical Lead (after 5 min)
3. **Notify:** Product Owner (after 15 min)
4. **Communicate:** Slack #incidents

## Quick Fixes

### API Won't Start
```bash
railway logs -s api --tail 50
railway service restart api
```

### Database Connection Error
```bash
railway database status
railway database logs --tail 50
```

### Frontend Not Deploying
```bash
vercel deployment list
vercel promote [previous-deployment] --prod
```

## Rollback Commands

```bash
# API - revert code and redeploy
git revert HEAD
git push origin main

# Database - restore backup
railway db:restore [backup-id]

# Frontend - promote previous deployment
vercel promote [deployment-id] --prod
```
```

### 8.5 Testing Rollback Procedures

Monthly drill to ensure rollback works:

```bash
# 1. Simulate failure
git revert HEAD --no-edit

# 2. Deploy rollback
git push origin main

# 3. Verify
curl https://manuel-manero-api.railway.app/health

# 4. Roll forward (revert the revert)
git revert HEAD --no-edit
git push origin main

# 5. Document result
echo "Rollback drill completed successfully" >> docs/INCIDENTS.md
```

---

## 9. Cost Optimization

### 9.1 Railway Pricing Analysis

#### Current Setup Costs

```
Plan: Pro
Services: 1 API + 1 PostgreSQL

Monthly Cost Breakdown:
├─ API Service: $12/month (1 pod, 1GB RAM, shared CPU)
├─ PostgreSQL: $12/month (shared resources)
├─ Outbound bandwidth: $0.10/GB (first 100GB free)
└─ Total: ~$24/month (minimum)

High Traffic Scenario:
├─ API: 3 pods: $36/month
├─ PostgreSQL Pro: $120/month (dedicated resources)
├─ Bandwidth: varies
└─ Total: ~$200/month
```

### 9.2 Vercel Pricing Analysis

#### Free Plan vs Pro

```
Free Plan:
├─ Builds: unlimited
├─ Deployments: unlimited
├─ Edge Middleware: ✓
├─ Automatic HTTPS: ✓
├─ Bandwidth: unlimited
└─ Cost: $0/month

Pro Plan ($20/month recommended for production):
├─ Advanced analytics
├─ Monitoring dashboard
├─ Priority support
├─ Early feature access
└─ Cost: $20/month

Enterprise: Contact sales if >100k monthly requests
```

### 9.3 Optimization Strategies

#### Reduce Database Costs

1. **Connection Pooling**: Reduce per-request overhead
   - Cost savings: ~30% on database CPU

2. **Query Optimization**: Index frequently-searched fields
   - Cost savings: Faster queries = lower CPU

3. **Cache Strategy**: Implement Redis caching
   - Cost: +$5-10/month for Redis
   - Savings: Reduced database hits = lower compute

#### Reduce Compute Costs

1. **Right-size instances**: Start small, scale as needed
   - Monitor Railway metrics
   - Scale only when needed

2. **Optimize images**: Serve optimized images via CDN
   - Use Next.js Image component
   - Serve WebP format
   - Reduce bandwidth by 60%

3. **Code splitting**: Reduce bundle size
   - Frontend First Load JS: < 100kb (target)
   - Backend code: Only ship production dependencies

#### Reduce Bandwidth Costs

1. **Enable compression**: Gzip all responses
   ```typescript
   import compression from 'compression';
   app.use(compression());
   ```
   - Reduces bandwidth by 70%

2. **CDN caching**: Cache static assets
   ```json
   {
     "headers": [
       {
         "source": "/static/:path*",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=31536000"
           }
         ]
       }
     ]
   }
   ```

3. **API response optimization**: Return only needed fields
   - Instead of full user objects, return minimal data
   - Implement pagination for large datasets

### 9.4 Cost Monitoring Dashboard

Create custom dashboard tracking:

```bash
# Monthly cost tracking
Railway Dashboard → Billing → Usage
Vercel Dashboard → Settings → Billing

# Set alerts
- Railway: Alert if usage > $50/month
- Vercel: Alert if bandwidth > 50GB/month
```

### 9.5 Cost Reduction Plan

**Target:** Keep total infrastructure cost under $100/month

| Priority | Action | Estimated Savings |
|----------|--------|------------------|
| **P0** | Enable response compression | 70% bandwidth |
| **P0** | Optimize images | 50% CDN traffic |
| **P1** | Implement caching strategy | 40% database CPU |
| **P1** | Right-size instances | 20% compute |
| **P2** | Archive old logs | 10% storage |

---

## 10. Deployment Checklist

### Pre-Deployment (Before Pushing to Main)

```markdown
## Code Quality
- [ ] All tests pass locally: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] TypeScript strict mode passes: `npm run typecheck`
- [ ] No console.log or debug code
- [ ] No hardcoded secrets or API keys

## Database
- [ ] Prisma schema updated (if changes)
- [ ] Migration created: `npm run migrate`
- [ ] Migration tested locally
- [ ] Migration reversible (tested rollback)

## API
- [ ] New endpoints documented in `docs/API.md`
- [ ] Request/response examples added
- [ ] Error responses tested
- [ ] Rate limiting tested if applicable

## Frontend
- [ ] UI components tested across devices
- [ ] Mobile responsive verified
- [ ] Accessibility (a11y) checked
- [ ] Performance metrics < targets
- [ ] No broken links or images

## Security
- [ ] No secrets in code or .env files
- [ ] CORS configuration verified
- [ ] Input validation on all endpoints
- [ ] HTTPS enforced in production config
- [ ] Rate limiting enabled for forms
```

### Deployment (Push to Main)

```markdown
## GitHub Actions Checks
- [ ] All workflows run successfully
- [ ] Lint job: ✅ PASSED
- [ ] Type check job: ✅ PASSED
- [ ] Test job: ✅ PASSED
- [ ] Build job: ✅ PASSED

## Backend Deployment (Railway)
- [ ] Backend service deploying...
- [ ] Migrations running...
- [ ] Health check endpoint responding
- [ ] Database connection verified
- [ ] API responding at https://api.railway.app
```

### Post-Deployment (Verify in Production)

```markdown
## Health Checks
- [ ] API health endpoint: https://manuel-manero-api.railway.app/health
- [ ] Frontend accessible: https://manuel-manero.com
- [ ] Database connected and responsive
- [ ] External integrations working

## Functionality Testing
- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] API endpoints responding correctly
- [ ] Forms submitting without errors
- [ ] No JavaScript console errors

## Performance
- [ ] Lighthouse score > 90 (frontend)
- [ ] API response time < 200ms
- [ ] Database queries < 100ms
- [ ] No 5xx errors in logs

## Monitoring & Alerts
- [ ] Sentry receiving errors (if any)
- [ ] Analytics tracking events
- [ ] Monitoring alerts active
- [ ] Slack notifications configured
- [ ] Team notified of successful deployment
```

### Incident Response

```markdown
## If Deployment Fails

1. [ ] Check GitHub Actions logs
2. [ ] Review error messages
3. [ ] Determine scope: Frontend | Backend | Database
4. [ ] Attempt fix or rollback

## Rollback Checklist
- [ ] Stop production traffic (if critical)
- [ ] Identify last working version
- [ ] Create rollback commit: `git revert HEAD`
- [ ] Push to main: `git push origin main`
- [ ] Monitor deployment
- [ ] Verify services healthy
- [ ] Post incident in Slack
- [ ] Schedule retrospective
```

---

## Production Deployment Step-by-Step

### Phase 1: Pre-Deployment Setup (Day 1)

```bash
# 1. Verify repository ready
git status
git log --oneline | head -5

# 2. Create GitHub Actions secrets
# Go to GitHub → Settings → Secrets and add all required secrets

# 3. Set up Railway project
# - Create PostgreSQL service
# - Create Node.js service
# - Add environment variables

# 4. Set up Vercel project
# - Connect repository
# - Add environment variables
# - Configure build settings

# 5. Run final quality checks
npm run lint
npm run typecheck
npm test
npm run build
```

### Phase 2: Initial Deployment (Day 2)

```bash
# 1. Deploy database schema
cd apps/api
npx prisma migrate deploy

# 2. Seed initial data
npm run seed

# 3. Push to main (triggers CI/CD)
git push origin main

# 4. Monitor deployments
# Railway Dashboard → Deployments
# Vercel Dashboard → Deployments

# 5. Verify health
curl https://manuel-manero-api.railway.app/health
curl https://manuel-manero.com

# 6. Smoke tests
- Test frontend loads
- Test API responds
- Test database connected
- Test integrations
```

### Phase 3: Production Monitoring (Day 3+)

```bash
# Daily checks
- [ ] Review error logs (Sentry)
- [ ] Check performance metrics (Vercel, Railway)
- [ ] Verify backups completed
- [ ] Monitor cost usage
- [ ] Check for alerts or incidents

# Weekly checks
- [ ] Database query performance
- [ ] External API integration status
- [ ] User-facing feature validation
- [ ] Security scan (if available)

# Monthly checks
- [ ] Full backup restore test
- [ ] Rollback procedure drill
- [ ] Cost analysis and optimization
- [ ] Capacity planning for growth
```

---

## Emergency Procedures

### API Service Down

```bash
# 1. Immediate: Check status
railway service status api

# 2. Check logs
railway logs -s api --tail 100

# 3. Restart if crashed
railway service restart api

# 4. Monitor recovery
railway service status api

# 5. If stuck, rollback
git revert HEAD --no-edit
git push origin main

# 6. Verify
curl https://manuel-manero-api.railway.app/health
```

### Database Connection Error

```bash
# 1. Check database status
railway database status

# 2. Check connection pool
# Railway Dashboard → PostgreSQL → Metrics

# 3. Verify environment variables
railway environment list

# 4. If connection string wrong
# Update DATABASE_URL in Railway
# Restart API service

# 5. If data corrupted, restore backup
railway db:restore [backup-id]
```

### Frontend Not Deploying

```bash
# 1. Check build logs
vercel logs [deployment-id]

# 2. Common issues:
# - Missing environment variables (check vercel.json)
# - Build command failing
# - Deploy preview stale

# 3. Retry build
vercel redeploy

# 4. If still failing, use previous deployment
vercel promote [previous-deployment] --prod
```

---

## Configuration Files Reference

### Essential Configuration Files

| File | Purpose | Location |
|------|---------|----------|
| `vercel.json` | Vercel build & routing config | Root |
| `apps/api/Dockerfile` | Backend container config | apps/api/ |
| `apps/api/prisma/schema.prisma` | Database schema | apps/api/prisma/ |
| `.github/workflows/deploy.yml` | CI/CD pipeline | .github/workflows/ |
| `apps/api/.env.example` | Environment template | apps/api/ |

### Environment Variables Template

Create `.env.production` for reference:

```env
# ============= FRONTEND (Vercel) =============
NEXT_PUBLIC_API_URL=https://manuel-manero-api.railway.app
NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://...

# ============= BACKEND (Railway) =============
NODE_ENV=production
API_PORT=3001
API_URL=https://manuel-manero-api.railway.app
FRONTEND_URL=https://manuel-manero.com

# ============= DATABASE =============
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# ============= JWT =============
JWT_SECRET=[production-secret-key-32-chars-min]
JWT_EXPIRY=7d

# ============= CRM & INTEGRATIONS =============
ACTIVECAMPAIGN_API_URL=https://yourinstance.api-us1.com
ACTIVECAMPAIGN_API_KEY=[your-key]

SENDGRID_API_KEY=[your-key]

OPENAI_API_KEY=[your-key]

# ============= MONITORING =============
SENTRY_DSN=https://[key]@[host]/[project]
LOG_LEVEL=info

# ============= OPTIONAL =============
REDIS_URL=redis://...
HOTMART_WEBHOOK_SECRET=[your-secret]
```

---

## Troubleshooting Common Deployment Issues

### Issue: "Module not found" Error

**Cause:** Missing dependencies or monorepo workspace issue

**Solution:**
```bash
npm run clean
npm install --legacy-peer-deps
npm run build
```

### Issue: Database Migration Fails

**Cause:** Schema mismatch or migration error

**Solution:**
```bash
# Check migration status
npx prisma migrate status

# View migration history
npx prisma migrate history

# Resolve migration
npx prisma migrate resolve --rolled-back migration_name
```

### Issue: CORS Error in Browser

**Cause:** Frontend origin not in CORS allowlist

**Solution:**
```bash
# Add origin to apps/api/src/index.ts
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://new-domain.com', // Add new domain
];

# Redeploy API
```

### Issue: API Rate Limit Triggered

**Cause:** Too many requests from same IP

**Solution:**
```typescript
// Increase limits for specific endpoints
const looseLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
});

app.use('/api/search', looseLimiter);
```

### Issue: High Memory Usage on API

**Cause:** Memory leak or inefficient queries

**Solution:**
```bash
# Check memory usage
railway metrics

# Check slow queries
railway logs -s api --tail 200 | grep "Duration:"

# Optimize queries and redeploy
```

### Issue: Vercel Build Timeout

**Cause:** Build taking too long

**Solution:**
```json
{
  "builds": [
    {
      "config": {
        "maxLambdaSize": "50mb"
      }
    }
  ]
}
```

---

## Additional Resources

### Documentation Links
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Railway Documentation](https://railway.app/docs)
- [Prisma Migration Guide](https://www.prisma.io/docs/guides/migrate/overview)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [Sentry Setup Guide](https://docs.sentry.io/platforms/node/)

### Support Channels
- **Railway Support:** https://railway.app/support
- **Vercel Support:** https://vercel.com/support
- **GitHub Support:** https://github.com/support/contact
- **PostgreSQL Docs:** https://www.postgresql.org/docs/

### Team Communication
- **Incident Channel:** #incidents (Slack)
- **Deployment Notifications:** #deployments (Slack)
- **General Questions:** #development (Slack)

---

## Maintenance Schedule

### Daily
- [ ] Review error logs
- [ ] Monitor API uptime
- [ ] Check database performance

### Weekly
- [ ] Review deployment logs
- [ ] Analyze performance metrics
- [ ] Check for security alerts

### Monthly
- [ ] Full backup test
- [ ] Capacity planning review
- [ ] Cost analysis
- [ ] Rollback procedure drill
- [ ] Security audit

### Quarterly
- [ ] Dependencies update review
- [ ] Performance optimization
- [ ] Architecture review
- [ ] Disaster recovery drill

---

**Document Version:** 1.0.0
**Last Updated:** 2026-02-17
**Next Review:** 2026-03-17

For questions or updates to this document, contact the DevOps team or create a GitHub issue.
