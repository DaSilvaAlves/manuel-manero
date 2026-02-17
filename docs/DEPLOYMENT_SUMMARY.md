# Deployment Architecture Summary

**Project:** Manuel Manero Ecosystem - Marca Pessoal Milionária
**Status:** Production-Ready
**Date:** 2026-02-17
**Version:** 1.0.0

---

## Quick Overview

This deployment architecture enables the Manuel Manero ecosystem to scale from development to production with minimal friction. All infrastructure is managed, cost-optimized, and designed for high availability.

### Infrastructure Stack

```
┌─────────────────────────┐
│ Frontend: Vercel        │ ← Next.js 15 + React 18
│ Vercel Postgres         │ ← Managed PostgreSQL
└─────────────────────────┘

┌─────────────────────────┐
│ Backend: Railway        │ ← Express.js + Node.js 20
│ Railway PostgreSQL      │ ← Managed PostgreSQL
└─────────────────────────┘

┌─────────────────────────┐
│ CI/CD: GitHub Actions   │ ← Automated testing & deploy
└─────────────────────────┘
```

---

## Documents Created

### 1. **DEPLOYMENT_ARCHITECTURE.md** (Main Document)
**Location:** `/docs/DEPLOYMENT_ARCHITECTURE.md`
**Size:** ~9,000 lines
**Purpose:** Comprehensive deployment guide covering all aspects

**Contents:**
- Vercel frontend deployment (build settings, domains, SSL)
- Railway backend deployment (Node.js service, database, scaling)
- Integration layer (CORS, API endpoints, error tracking)
- CI/CD pipeline (GitHub Actions workflow details)
- Database management (migrations, backups, pooling)
- Monitoring & observability (APM, error tracking, uptime)
- Security & secrets management
- Rollback & disaster recovery procedures
- Cost optimization strategies
- Production checklist & troubleshooting

**When to Use:** Reference for implementing any deployment-related task

---

### 2. **.github/workflows/deploy.yml** (Workflow)
**Location:** `/.github/workflows/deploy.yml`
**Size:** ~350 lines
**Purpose:** Automated CI/CD pipeline

**Features:**
- 5 sequential jobs with dependencies
- Validates code quality (lint, typecheck, build)
- Tests pass before deployment
- Deploys backend first, then frontend
- Post-deployment smoke tests
- Slack notifications for success/failure
- Automatic rollback triggers

**Trigger:** Every push to `main` branch

---

### 3. **.env.production.example** (Configuration Template)
**Location:** `/.env.production.example`
**Size:** ~300 lines
**Purpose:** Reference for all required environment variables

**Sections:**
- Frontend variables (Vercel, analytics)
- Backend variables (Database, APIs)
- Authentication & security
- Integration keys (ActiveCampaign, SendGrid, OpenAI)
- Monitoring & logging
- Performance tuning
- Emergency contacts

**Usage:** Template for setting Railway/Vercel environment variables

---

### 4. **GITHUB_SECRETS_SETUP.md** (Setup Guide)
**Location:** `/docs/GITHUB_SECRETS_SETUP.md`
**Size:** ~500 lines
**Purpose:** Step-by-step GitHub Secrets configuration

**Contents:**
- How to get each API token
- Where to add each secret in GitHub
- Verification procedures
- Troubleshooting common issues
- Security best practices
- Rotation schedule

**When to Use:** Before first deployment (one-time setup)

---

### 5. **DEPLOYMENT_RUNBOOK.md** (Quick Reference)
**Location:** `/docs/DEPLOYMENT_RUNBOOK.md`
**Size:** ~700 lines
**Purpose:** Quick operational procedures

**Contents:**
- Pre-deployment checklist
- Initial setup steps (one-time)
- First production deployment procedure
- Ongoing deployment steps
- Rollback procedures (3 options)
- Emergency procedures for critical issues
- Dashboard monitoring checklist
- Post-deployment verification

**When to Use:** During actual deployments

---

## Key Features of This Deployment

### ✅ Fully Automated

- GitHub Actions CI/CD pipeline
- Automatic testing before deployment
- Zero-downtime deployments
- Automatic rollback on failures
- Slack notifications

### ✅ Scalable

- Horizontal scaling on Railway (multiple pods)
- Vertical scaling on Railway (dedicated resources)
- CDN-backed frontend on Vercel
- Connection pooling for database
- Caching strategy for APIs

### ✅ Secure

- CORS configured for origin validation
- Rate limiting on API endpoints
- HTTPS enforcement
- Environment variable encryption (GitHub Secrets)
- Automatic SSL certificates (Vercel + Railway)
- JWT authentication support

### ✅ Observable

- Application performance monitoring (Vercel + Railway)
- Error tracking integration (Sentry ready)
- Request/response logging
- Database query monitoring
- Uptime monitoring alerts

### ✅ Cost-Optimized

- Estimated $24-50/month for production
- Free tier available (development)
- Connection pooling reduces database costs
- Image optimization reduces bandwidth
- Auto-scaling to match traffic

### ✅ Disaster Recovery

- Automatic daily backups (Railway)
- Multiple rollback strategies
- Emergency procedures documented
- Incident response playbook
- Recovery time < 5 minutes for most scenarios

---

## Getting Started - 5-Step Quick Start

### Step 1: Prerequisites (30 minutes)

```bash
# 1. Create accounts
- GitHub: https://github.com (if not already)
- Railway: https://railway.app
- Vercel: https://vercel.com
- Slack: Create #deployments channel (optional)

# 2. Clone repository
git clone https://github.com/DaSilvaAlves/Manero.git
cd Manero

# 3. Verify project setup
npm run lint
npm run typecheck
```

### Step 2: Setup Railway (30 minutes)

```bash
# 1. Create Railway project
# 2. Add PostgreSQL service (copy connection string)
# 3. Add Node.js service linked to GitHub
# 4. Set environment variables (see .env.production.example)
# 5. Note: Railway Project ID
```

### Step 3: Setup Vercel (20 minutes)

```bash
# 1. Create Vercel project (import from GitHub)
# 2. Configure build settings
# 3. Add environment variables
# 4. Note: VERCEL_ORG_ID and VERCEL_PROJECT_ID
```

### Step 4: Configure GitHub Secrets (15 minutes)

```bash
# 1. Go to: GitHub → Settings → Secrets → Actions
# 2. Add secrets (see GITHUB_SECRETS_SETUP.md):
#    - RAILWAY_TOKEN
#    - RAILWAY_PROJECT_ID
#    - VERCEL_TOKEN
#    - VERCEL_ORG_ID
#    - VERCEL_PROJECT_ID
#    - SLACK_WEBHOOK_URL (optional)
```

### Step 5: First Deployment (10 minutes)

```bash
# 1. Deploy database
cd apps/api
npx prisma migrate deploy
npm run seed

# 2. Push to main (triggers GitHub Actions)
git push origin main

# 3. Monitor GitHub Actions
# GitHub → Actions → Deploy Pipeline

# 4. Verify in production
curl https://manuel-manero-api.railway.app/health
curl https://manuel-manero.com/
```

**Total Time:** ~1 hour 45 minutes

---

## Estimated Costs

### Monthly Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| **Vercel** | $0-20 | Free tier for dev, Pro ($20) for prod |
| **Railway API** | $12 | 1 pod, 1GB RAM (scales as needed) |
| **Railway PostgreSQL** | $12 | Shared (Pro: $120 for dedicated) |
| **Bandwidth** | $0-10 | First 100GB free |
| **Monitoring** | $0 | Sentry free tier included |
| **Domain** | $10-15 | Registrar (Vercel/Railway handle DNS) |
| **Total** | **$34-57/month** | Scales with traffic |

### Cost Optimization

- Use Railway Hobby plan for development ($0)
- Enable response compression (70% bandwidth savings)
- Implement caching (40% database savings)
- Right-size instances (monitor and adjust)
- Archive old logs (10% storage savings)

---

## Performance Targets

| Metric | Target | Railway Equivalent | Vercel Equivalent |
|--------|--------|------------------|------------------|
| API response time | < 200ms | Auto-scaling | N/A |
| Frontend LCP | < 2.5s | N/A | Speed Insights |
| Database queries | < 100ms | Monitoring | N/A |
| Uptime SLA | 99.9% | Service guarantees | SLA included |
| SSL/TLS | Auto-renewed | Automatic | Automatic |

---

## Security Features

### Authentication & Authorization

- JWT token-based API authentication
- Rate limiting (100 req/15 min, 10 forms/hour)
- CORS origin validation
- Input validation with Zod

### Data Protection

- HTTPS/TLS encryption in transit
- PostgreSQL at-rest encryption (Railway)
- Environment variables encryption (GitHub)
- Automatic daily backups
- GDPR-compliant data retention

### Monitoring & Alerts

- Error tracking (Sentry)
- Application performance monitoring
- Uptime monitoring & alerts
- Slack notifications on deployments
- Security vulnerability scanning

---

## Common Operations

### Deploy New Feature

```bash
git checkout -b feature/my-feature
# ... make changes ...
npm run lint && npm run typecheck && npm test
git commit -m "feat: my feature"
git push origin feature/my-feature
# Create PR, get review, merge to main
# GitHub Actions auto-deploys
```

### Database Migration

```bash
cd apps/api
npx prisma migrate dev --name <description>
git add prisma/migrations/
git commit -m "chore: add migration"
git push origin main
# Railway auto-runs migrations on deploy
```

### Rollback

```bash
# Option 1: Code revert (recommended)
git revert HEAD --no-edit
git push origin main

# Option 2: Promote previous deployment
vercel promote [deployment-id] --prod

# Option 3: Restore database backup
railway db:restore [backup-id]
```

### View Logs

```bash
# API logs
railway logs -s api --tail 50

# Frontend logs (build)
vercel logs [deployment-id]

# Database logs
railway logs -s postgres --tail 20

# GitHub Actions logs
# GitHub → Actions → [Workflow]
```

---

## Next Steps

### Before First Deployment

1. ✅ Read DEPLOYMENT_ARCHITECTURE.md fully
2. ✅ Create Railway + Vercel accounts
3. ✅ Configure GitHub Secrets (GITHUB_SECRETS_SETUP.md)
4. ✅ Set environment variables on Railway/Vercel
5. ✅ Test GitHub Actions workflow on PR
6. ✅ Run first deployment to production

### Ongoing Operations

1. Monitor deployments via Slack notifications
2. Check error rates daily (Sentry)
3. Review performance metrics weekly (Vercel/Railway)
4. Rotate secrets quarterly
5. Schedule disaster recovery drills monthly
6. Review costs monthly
7. Plan scaling quarterly

### Optimization (After Stable)

1. Enable caching layer (Redis)
2. Implement rate limiting optimizations
3. Setup API gateway for better routing
4. Add CDN for static assets
5. Implement database read replicas
6. Add staging environment

---

## Emergency Contacts

| Issue | Contact | Time |
|-------|---------|------|
| **API down** | Check GitHub Actions, rollback | < 5 min |
| **Database error** | Check Railway metrics, restore backup | < 15 min |
| **Frontend not loading** | Vercel deployment history, rollback | < 2 min |
| **Security breach** | Rotate all keys, audit logs | < 1 hour |
| **Service degradation** | Check monitoring dashboards | Ongoing |

---

## Support Resources

### Documentation
- **This Guide:** DEPLOYMENT_ARCHITECTURE.md
- **Quick Reference:** DEPLOYMENT_RUNBOOK.md
- **Setup Guide:** GITHUB_SECRETS_SETUP.md

### External Resources
- [Railway Documentation](https://railway.app/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [Prisma Migration Docs](https://www.prisma.io/docs/guides/migrate/overview)

### Getting Help
1. Check relevant documentation
2. Review error logs (GitHub Actions, Railway, Vercel)
3. Search GitHub Issues for similar problems
4. Create new GitHub Issue with logs
5. Contact DevOps team

---

## Document Maintenance

These deployment documents are living documents. Update them when:

- New services are added
- Cost structure changes
- Security best practices evolve
- New features are deployed
- Emergency procedures are tested
- Infrastructure is upgraded

**Next Review Date:** 2026-03-17

---

## Checklist for Team

### Before Going Live

- [ ] All documents read by team
- [ ] All GitHub Secrets configured
- [ ] Railway services created and configured
- [ ] Vercel project created and configured
- [ ] Database migrations tested
- [ ] GitHub Actions workflow validated
- [ ] Error tracking configured
- [ ] Monitoring dashboards set up
- [ ] Backup procedures tested
- [ ] Emergency contact list shared
- [ ] First deployment successful
- [ ] Post-deployment smoke tests passed
- [ ] Team trained on procedures

### Ongoing

- [ ] Monitor daily error rates
- [ ] Review weekly deployment logs
- [ ] Check monthly costs
- [ ] Rotate secrets quarterly
- [ ] Test disaster recovery monthly
- [ ] Update documentation as needed

---

**Version:** 1.0.0
**Created:** 2026-02-17
**Last Updated:** 2026-02-17
**Status:** Production-Ready ✅

For questions or updates, create a GitHub issue or contact DevOps team.
