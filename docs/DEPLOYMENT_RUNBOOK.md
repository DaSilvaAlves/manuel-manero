# Deployment Runbook - Production Deployment Steps

**Quick Reference for Manuel Manero Ecosystem Deployment**
**Date:** 2026-02-17
**Environment:** Production (Vercel + Railway + PostgreSQL)

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Initial Setup (One-time)](#initial-setup-one-time)
3. [First Production Deployment](#first-production-deployment)
4. [Ongoing Deployments](#ongoing-deployments)
5. [Rollback Procedures](#rollback-procedures)
6. [Emergency Procedures](#emergency-procedures)

---

## Pre-Deployment Checklist

### Code Quality

```bash
# Run all checks before pushing
npm run lint
npm run typecheck
npm test
npm run build

# If any fail, fix before proceeding
```

### Security Review

```bash
# Check no secrets in code
grep -r "sk_live_" apps/
grep -r "api_key" apps/ | grep -v node_modules | grep -v ".example"

# Verify .gitignore has .env files
cat .gitignore | grep "\.env"
```

### Database

```bash
# If schema changes made:
cd apps/api
npx prisma migrate dev --name <description>

# Test migration
npx prisma migrate resolve --rolled-back <migration>
npx prisma migrate dev
```

---

## Initial Setup (One-time)

### Phase 1: Create Cloud Services (Day 1)

#### 1.1 Railway Setup

```bash
# Create account
https://railway.app/dashboard
# Sign up with GitHub

# Create project
Click "Create Project" → "GitHub Repo" → Select manuel-manero
```

#### 1.2 Railway - PostgreSQL Database

```bash
# In Railway Dashboard, add service:
Click "Add Service" → "Database" → PostgreSQL

Configure:
  Database name: manuel_manero
  Username: postgres
  Password: [auto-generated, copy it]
  Port: 5432

  Plan: Pro ($12/month)
  Backups: Enabled

  Save connection string: postgresql://postgres:PASSWORD@HOST:5432/manuel_manero
```

#### 1.3 Railway - Node.js API Service

```bash
# In Railway Dashboard, add service:
Click "Add Service" → "GitHub Repo"

Select:
  Repository: DaSilvaAlves/Manero
  Deploy from: main branch

Configure Build:
  Build Command: npm run build
  Start Command: node dist/apps/api/index.js
  Root Directory: [leave empty]

Add Environment Variables:
  DATABASE_URL: [from PostgreSQL above]
  NODE_ENV: production
  API_PORT: 3001
  API_URL: https://manuel-manero-api.railway.app
  FRONTEND_URL: https://manuel-manero.com
  JWT_SECRET: [generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
  LOG_LEVEL: info
```

#### 1.4 Vercel - Frontend Setup

```bash
# Create account
https://vercel.com/dashboard
# Sign up with GitHub

# Import project
Click "Add New" → "Project"
Select repository: manuel-manero
Import

Configure:
  Framework Preset: Next.js
  Build Command: npm run build
  Output Directory: .next
  Install Command: npm install --legacy-peer-deps
  Root Directory: apps/web
```

#### 1.5 Vercel - Environment Variables

```bash
# In Vercel → Project → Settings → Environment Variables:

NEXT_PUBLIC_API_URL=https://manuel-manero-api.railway.app
NEXT_PUBLIC_ANALYTICS_ID=[if using]
```

### Phase 2: Configure GitHub Actions (Day 1)

#### 2.1 Add GitHub Secrets

```bash
# Go to: GitHub → Settings → Secrets and variables → Actions

Add secrets:
  RAILWAY_TOKEN: [from Railway → Account → API Tokens]
  RAILWAY_PROJECT_ID: [from Railway project URL]
  VERCEL_TOKEN: [from Vercel → Account → Tokens]
  VERCEL_ORG_ID: [from Vercel account]
  VERCEL_PROJECT_ID: [from Vercel project]
  SLACK_WEBHOOK_URL: [from Slack app, optional]
```

#### 2.2 Test Workflow

```bash
# Create test branch
git checkout -b test/workflow
echo "test" >> TEST.md
git add TEST.md
git commit -m "test: workflow validation"
git push origin test/workflow

# Create pull request
# GitHub will run validation workflow
# Wait for all checks to pass

# If validation passes, PR is ready
# Merge when ready
```

---

## First Production Deployment

### Step 1: Prepare Database (Day 2)

```bash
# SSH into Railway or use Railway CLI
cd apps/api

# Run migrations on production
npx prisma migrate deploy

# Verify migrations ran
npx prisma migrate status

# Optionally seed data
npm run seed

# Verify data
npx prisma studio
```

### Step 2: Deploy Backend

```bash
# Push to main branch triggers GitHub Actions
git push origin main

# Monitor deployment:
GitHub → Actions → Watch workflow run
  1. Validate job (lint, typecheck)
  2. Test job (run tests)
  3. Deploy-backend job (deploy to Railway)
  4. Deploy-frontend job (deploy to Vercel)
  5. Smoke-tests job (verify endpoints)
```

### Step 3: Verify Backend

```bash
# Check API health
curl https://manuel-manero-api.railway.app/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2026-02-17T10:00:00Z",
  "database": "connected"
}

# Check API v1 endpoint
curl https://manuel-manero-api.railway.app/api/v1

# Expected response:
{
  "message": "Welcome to Manuel Manero API",
  "version": "1.0.0"
}
```

### Step 4: Verify Frontend

```bash
# Check frontend loads
curl https://manuel-manero.com

# Check browser console for errors
# Open https://manuel-manero.com in browser
# Press F12 → Console tab
# Verify no 404s or CORS errors
```

### Step 5: Smoke Tests

```bash
# Run manual tests
curl https://manuel-manero.com/          # Home page
curl https://manuel-manero.com/sobre     # About page
curl https://manuel-manero.com/programas # Programs page

# Test API endpoints
curl https://manuel-manero-api.railway.app/api/v1

# Check network waterfall
# Open https://manuel-manero.com in browser
# F12 → Network tab → Reload
# Verify:
#   - No failed requests
#   - API calls complete < 200ms
#   - Images load correctly
```

---

## Ongoing Deployments

### Standard Deploy Procedure

#### Step 1: Code Changes

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and test locally
npm run dev          # Run all services
npm run typecheck    # Verify types
npm run lint         # Check code style
npm test             # Run tests

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push branch
git push origin feature/my-feature
```

#### Step 2: Pull Request & Review

```bash
# Create PR on GitHub
# Add description and testing notes

# GitHub Actions runs validation automatically
# Wait for "All checks passed"

# Request code review from team member
# Respond to feedback

# Once approved, merge to main
```

#### Step 3: Automatic Deployment

```bash
# Merge PR to main branch
Click "Merge pull request" on GitHub

# GitHub Actions workflow triggers automatically
# Monitor in GitHub → Actions

# Workflow runs:
1. Validate (lint, typecheck)
2. Test (run tests)
3. Deploy Backend (Railway)
4. Deploy Frontend (Vercel)
5. Smoke Tests

# Check Slack for deployment notifications
```

#### Step 4: Production Verification

```bash
# After all jobs complete (takes ~10-15 minutes)

# Verify both services alive
curl https://manuel-manero-api.railway.app/health
curl https://manuel-manero.com

# Check error tracking (if using Sentry)
https://sentry.io/organizations/manuel-manero/issues/

# Check performance monitoring (Vercel)
https://vercel.com/dashboard/manuel-manero/analytics
```

---

## Rollback Procedures

### Rollback Option 1: Code Revert (Recommended)

**Fastest for code bugs**

```bash
# Identify commit to rollback
git log --oneline | head -10

# Revert the problematic commit
git revert [commit-sha]

# This creates a NEW commit that undoes changes
# Not a destructive operation

# Push to main (triggers deployment)
git push origin main

# Verify deployment completed
# Check services are back to normal
```

### Rollback Option 2: Railway Deployment Revert

**If code rollback fails**

```bash
# View deployment history
railway deployment list

# Rollback to specific deployment
railway deployment rollback [deployment-id]

# Or use Railway dashboard:
# Railway → Service → Deployments → Select previous → Click restart
```

### Rollback Option 3: Vercel Deployment Promote

**For frontend issues**

```bash
# View deployments
vercel deployment list

# Promote previous deployment to production
vercel promote [deployment-url] --prod

# Or use Vercel dashboard:
# Vercel → Deployments → Select previous → Click "Promote to Production"
```

### Database Rollback (Emergency Only)

**Only if migrations cause data loss**

```bash
# STOP API service first
railway service stop api

# Restore from backup
railway db:restore [backup-id]

# Verify backup restored
# Restart API service
railway service start api

# Check logs
railway logs -s api --tail 20
```

---

## Emergency Procedures

### API Service Down (Critical)

**Restore in < 5 minutes**

```bash
# 1. Check status
railway service status api
# Should show: Running

# 2. If not running, check logs
railway logs -s api --tail 100

# 3. If crashed, auto-restart should trigger
# If not, manually restart:
railway service restart api

# 4. Verify recovery
sleep 10
curl https://manuel-manero-api.railway.app/health

# 5. If still down, trigger rollback
git revert HEAD --no-edit
git push origin main
# Wait for deployment (5-10 minutes)

# 6. Notify team
# Slack #incidents channel
# Post: "API was down, root cause: [reason], fixed by: [action]"
```

### Database Connection Error (Critical)

**Restore in < 5 minutes**

```bash
# 1. Check database status
railway database status

# 2. If unhealthy, check connections
# Railway Dashboard → PostgreSQL → Metrics

# 3. If too many connections, scale down API temporarily
railway service scale api --replicas 0

# 4. Check connection logs
railway logs -s postgres --tail 50

# 5. Restart database
railway service restart postgres

# 6. Restart API
railway service scale api --replicas 1

# 7. Verify connection
curl https://manuel-manero-api.railway.app/health
```

### Frontend Not Loading (Critical)

**Restore in < 2 minutes**

```bash
# 1. Check Vercel deployment status
vercel deployment status

# 2. Check build logs
# Vercel Dashboard → Deployments → Select latest → Logs

# 3. If build failed, promote previous deployment
vercel promote [previous-deployment] --prod

# 4. If previous also fails, revert code
git revert HEAD --no-edit
git push origin main
# Wait for new build (2-5 minutes)

# 5. Verify
curl https://manuel-manero.com

# 6. Notify team
# #incidents channel: "Frontend was down, deployed [version]"
```

### Data Corruption (Emergency)

**Restore from backup < 30 minutes**

```bash
# 1. STOP ALL SERVICES IMMEDIATELY
railway service scale api --replicas 0

# 2. Assess damage
# Check Sentry or logs for what happened

# 3. Identify last good backup
railway database backups

# 4. Restore backup
railway db:restore [backup-id]
# This operation takes 5-10 minutes

# 5. Verify data integrity
npx prisma validate

# 6. Restart API
railway service scale api --replicas 1

# 7. Run post-incident tests
# Check all features work
# Verify no data loss in user-facing areas

# 8. Document incident
# File issue on GitHub with timeline & root cause
```

### Security Breach (CRITICAL)

**Quarantine in < 5 minutes**

```bash
# 1. DISABLE ALL SERVICES
railway service scale api --replicas 0
vercel deployment (set to maintenance)

# 2. Rotate all secrets
# GitHub → Settings → Secrets
# Update: RAILWAY_TOKEN, VERCEL_TOKEN, etc.

# 3. Review logs for unauthorized access
# Railway logs
# Vercel logs
# GitHub Actions logs

# 4. Assess compromised data
# Check if API keys, database credentials leaked
# If yes, rotate immediately

# 5. Fix vulnerability in code
# Create branch, fix issue, test

# 6. Redeployment
# Once fixed and tested
git push origin main
# Monitor deployment closely

# 7. Post-incident review
# Schedule meeting to discuss
# Update security procedures
# Add monitoring alert to prevent recurrence

# 8. Notify users (if data breach)
# Prepare communication
# Follow GDPR procedures
```

---

## Monitoring During Deployment

### Dashboard Checklist

**Vercel Dashboard:**
```
✓ Go to https://vercel.com/dashboard/manuel-manero
✓ Watch deployment progress (should complete in 2-5 minutes)
✓ Check "Deployments" tab to see history
✓ Verify "Preview URL" available
```

**Railway Dashboard:**
```
✓ Go to https://railway.app/dashboard
✓ Select Manuel Manero project
✓ Watch API service status (should show "Running")
✓ Check "Deployments" tab for latest
✓ Monitor "Metrics" for CPU/memory health
```

**GitHub Actions:**
```
✓ Go to GitHub → Actions
✓ Click "Deploy Pipeline" workflow
✓ Watch each job complete in order
✓ If any job fails, check logs immediately
```

### What to Watch For

| Metric | Good | Bad |
|--------|------|-----|
| **Deployment time** | < 10 minutes | > 15 minutes = timeout risk |
| **API response** | 200 OK, < 200ms | 5xx errors or timeout |
| **Frontend load** | < 2 seconds | > 5 seconds = performance issue |
| **Error rate** | 0% | > 1% = investigate |
| **Bundle size** | < 100kb | > 200kb = optimization needed |

---

## Post-Deployment Tasks

### Immediate (0-5 minutes after deploy)

```bash
# Verify endpoints
curl https://manuel-manero-api.railway.app/health
curl https://manuel-manero.com/

# Check for critical errors
# Open https://sentry.io → review any new issues

# Monitor Slack for alerts
```

### Short-term (15-30 minutes after deploy)

```bash
# Run feature tests
# Test any changed features manually

# Check error rate
# Should be same as before deployment

# Monitor performance
# Vercel Analytics
# Railway Metrics
```

### Same day (a few hours after deploy)

```bash
# Full QA of all features
# Verify no regressions introduced

# Check database queries
# Ensure migrations completed successfully

# Monitor for issues
# Check logs periodically
```

### Next morning

```bash
# Review overnight logs
# Check for any errors or anomalies

# Verify backups completed
# Railway should have created backup

# Prepare post-incident review (if needed)
```

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start all services locally
npm run lint             # Check code style
npm run typecheck        # Check types
npm test                 # Run tests
npm run build            # Build for production

# Database
npx prisma migrate dev   # Create migration
npx prisma migrate deploy # Apply migrations
npm run seed             # Seed data
npx prisma studio       # Open DB GUI

# Deployment
git push origin main     # Trigger GitHub Actions
railway logs -s api      # View API logs
vercel logs deployment   # View Vercel logs

# Verification
curl https://manuel-manero-api.railway.app/health
curl https://manuel-manero.com/

# Rollback
git revert HEAD --no-edit
git push origin main
```

---

## Team Communication Template

### Deployment Announcement

```
🚀 DEPLOYMENT STARTING

Repository: manuel-manero
Branch: main
Changes: [link to PR/commit]

Estimated time: 10-15 minutes
Affected services: API + Frontend + Database

Please avoid making changes during deployment.
```

### Deployment Complete

```
✅ DEPLOYMENT COMPLETE

Version: [version number]
Deployment time: [actual time]
Services: All operational

API Health: ✓ Connected
Frontend: ✓ Loading
Database: ✓ Responsive

Status: 🟢 LIVE IN PRODUCTION
```

### Deployment Failed (Rollback)

```
⚠️ DEPLOYMENT FAILED - ROLLING BACK

Error: [brief description]
Action: Automatically rolled back to previous version
Time: [time to rollback]

Services recovering now...
Status will update in 5 minutes.

Investigating root cause...
```

---

## Contacts & Escalation

**For deployment issues:**

1. Check this runbook first
2. Review GitHub Actions logs
3. Contact DevOps team
4. If critical: Post in #incidents channel

**Critical incident (API down > 5 min):**

1. Execute emergency rollback
2. Notify #incidents
3. Schedule post-incident review

---

**Document Version:** 1.0.0
**Last Updated:** 2026-02-17
**Next Review:** 2026-03-17

For questions or improvements, submit a PR to update this document.
