# GitHub Secrets Setup Guide

**Purpose:** Configure GitHub Secrets for CI/CD deployment pipeline
**Date:** 2026-02-17
**Status:** Pre-Deployment

---

## Overview

GitHub Secrets are encrypted environment variables used by GitHub Actions workflows. They're required to authenticate with Vercel, Railway, and Slack during the deployment pipeline.

**Security Note:** Secrets are:
- ✅ Encrypted at rest
- ✅ Never logged in workflow output
- ✅ Only exposed to workflows explicitly
- ❌ Never visible in GitHub UI (one-way hash)
- ❌ Cannot be retrieved after creation (must regenerate)

---

## Step-by-Step Setup

### 1. Access GitHub Secrets

1. Go to: **GitHub Repository → Settings → Secrets and variables → Actions**
2. Click **"New repository secret"** for each secret below

### 2. Railway Secrets

#### RAILWAY_TOKEN

**Get token from Railway:**

1. Go to https://railway.app/dashboard
2. Click **Account Settings** (top right)
3. Click **API Tokens**
4. Click **Create Token**
5. Name: `GitHub Actions Deployment`
6. Copy token immediately (shown only once)

**Add to GitHub:**

- **Secret name:** `RAILWAY_TOKEN`
- **Value:** `[paste token]`
- Click **Add secret**

#### RAILWAY_PROJECT_ID

**Get project ID from Railway:**

1. Go to https://railway.app/dashboard
2. Select your **Manuel Manero** project
3. Click **Settings** (gear icon)
4. Copy **Project ID** (visible in URL: `/project/[ID]`)

**Add to GitHub:**

- **Secret name:** `RAILWAY_PROJECT_ID`
- **Value:** `[paste project ID]`
- Click **Add secret**

### 3. Vercel Secrets

#### VERCEL_TOKEN

**Get token from Vercel:**

1. Go to https://vercel.com/account/tokens
2. Click **Create Token**
3. Name: `GitHub Actions Deployment`
4. Scope: Full Account (if available)
5. Copy token immediately

**Add to GitHub:**

- **Secret name:** `VERCEL_TOKEN`
- **Value:** `[paste token]`
- Click **Add secret**

#### VERCEL_ORG_ID

**Get org ID from Vercel:**

1. Go to https://vercel.com/account/settings
2. Copy **Team/Account ID** (shown in URL: `/account/[ID]`)

**Add to GitHub:**

- **Secret name:** `VERCEL_ORG_ID`
- **Value:** `[paste org ID]`
- Click **Add secret**

#### VERCEL_PROJECT_ID

**Get project ID from Vercel:**

1. Go to https://vercel.com/dashboard
2. Select **Manuel Manero** project
3. Go to **Settings → General**
4. Copy **Project ID**

**Add to GitHub:**

- **Secret name:** `VERCEL_PROJECT_ID`
- **Value:** `[paste project ID]`
- Click **Add secret**

### 4. Slack Webhook Secret (Optional but Recommended)

#### SLACK_WEBHOOK_URL

**Setup Slack webhook:**

1. Go to https://api.slack.com/apps
2. Create new app **→ "From scratch"**
3. Name: `Manuel Manero Deployments`
4. Select workspace
5. Go to **Incoming Webhooks** in sidebar
6. Click **Activate Incoming Webhooks**
7. Click **Add New Webhook to Workspace**
8. Select channel: `#deployments` (create if needed)
9. Click **Allow**
10. Copy **Webhook URL** from "Webhooks" section

**Add to GitHub:**

- **Secret name:** `SLACK_WEBHOOK_URL`
- **Value:** `[paste webhook URL]`
- Click **Add secret**

---

## Secrets Checklist

Create a checklist to track setup completion:

```markdown
## GitHub Actions Secrets Setup Checklist

### Railway Authentication
- [ ] RAILWAY_TOKEN - Generated from Railway account
- [ ] RAILWAY_PROJECT_ID - From Manuel Manero project

### Vercel Authentication
- [ ] VERCEL_TOKEN - Generated from Vercel account
- [ ] VERCEL_ORG_ID - From Vercel account settings
- [ ] VERCEL_PROJECT_ID - From Manuel Manero project

### Notifications (Optional)
- [ ] SLACK_WEBHOOK_URL - From Slack app

### Verification
- [ ] Run test workflow to verify all secrets work
- [ ] Check GitHub Actions output for successful auth
- [ ] Verify no secret values leaked in logs
```

---

## Verifying Secrets Setup

### Method 1: Run Test Workflow

1. Go to **GitHub → Actions**
2. Select **Deploy Pipeline** workflow
3. Click **Run workflow** → **Branch: main**
4. Monitor execution:
   - ✅ Lint & Type Check succeeds
   - ✅ Tests pass (or skipped if no tests)
   - ❌ Deploy fails is expected (not pushing to main)

### Method 2: Create Test Branch & PR

```bash
git checkout -b test/workflow-validation

# Create dummy commit
echo "# Test" >> TEST.md
git add TEST.md
git commit -m "test: validate workflow setup"
git push origin test/workflow-validation

# Create pull request
# Go to GitHub → Pull Requests → Create PR
# Workflow will run on PR (validate only, no deploy)

# Check workflow runs without errors related to secrets
# Look for failed auth errors - if none, secrets are configured
```

### Method 3: Manual Secret Test

In GitHub Actions workflow (temporary):

```yaml
- name: Test secrets access
  run: |
    test -n "$RAILWAY_TOKEN" && echo "✓ RAILWAY_TOKEN exists"
    test -n "$VERCEL_TOKEN" && echo "✓ VERCEL_TOKEN exists"
    test -n "$SLACK_WEBHOOK_URL" && echo "✓ SLACK_WEBHOOK_URL exists"
  env:
    RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## Troubleshooting Secrets Issues

### Issue: "Authentication Failed" in Railway Deployment

**Cause:** Invalid or expired RAILWAY_TOKEN

**Solution:**
```bash
# 1. Verify token in Railway dashboard
# 2. If expired, generate new token
# 3. Update GitHub Secret:
#    Settings → Secrets → Update RAILWAY_TOKEN
# 4. Re-run workflow
```

### Issue: "Deployment Verification Failed" for Vercel

**Cause:** Invalid VERCEL_TOKEN or VERCEL_PROJECT_ID

**Solution:**
```bash
# 1. Verify project exists in Vercel
# 2. Check VERCEL_ORG_ID and VERCEL_PROJECT_ID match
# 3. Regenerate token if needed
# 4. Update all three Vercel secrets
```

### Issue: Slack Notifications Not Received

**Cause:** Invalid SLACK_WEBHOOK_URL or channel deleted

**Solution:**
```bash
# 1. Test webhook manually:
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"Test message"}' \
  $SLACK_WEBHOOK_URL

# 2. If fails, regenerate webhook in Slack app settings
# 3. Update SLACK_WEBHOOK_URL GitHub Secret
# 4. Make sure #deployments channel exists and bot has access
```

### Issue: Secrets Not Available in Workflow

**Cause:** Secret not referenced in workflow, or typo in name

**Solution:**
```bash
# 1. Check workflow YAML references secrets correctly
# 2. Verify secret names exactly match GitHub (case-sensitive)
# 3. Common mistake: $RAILWAY_TOKEN vs ${{ secrets.RAILWAY_TOKEN }}
#    ✅ Correct: ${{ secrets.RAILWAY_TOKEN }}
#    ❌ Wrong: $RAILWAY_TOKEN (won't work)
```

---

## Security Best Practices

### DO

- ✅ Rotate tokens quarterly
- ✅ Use specific scope (not full account access if possible)
- ✅ Revoke old tokens after rotation
- ✅ Monitor GitHub Actions logs for secret exposure
- ✅ Use separate service accounts for CI/CD
- ✅ Enable branch protection rules requiring passing checks

### DON'T

- ❌ Commit secrets to repository
- ❌ Share secrets in Slack or email
- ❌ Use personal account tokens (use service accounts)
- ❌ Reuse secrets across projects
- ❌ Log secrets in workflow output
- ❌ Check secrets into version control

---

## Secret Rotation Schedule

### Monthly Rotation

```bash
# JWT_SECRET (internal only, not in GitHub Secrets)
# Check apps/api/.env
# Generate new: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Quarterly Rotation

```bash
# Railway Token
# 1. Generate new token in Railway → Account Settings → API Tokens
# 2. Update RAILWAY_TOKEN GitHub Secret
# 3. Delete old token

# Vercel Token
# 1. Generate new token in Vercel → Account → Tokens
# 2. Update VERCEL_TOKEN GitHub Secret
# 3. Delete old token
```

### Annual Rotation

```bash
# Complete audit
# 1. Review all GitHub Secrets
# 2. Verify each service still needs access
# 3. Rotate all tokens that haven't been rotated in 6+ months
# 4. Update documentation
# 5. Test workflow still works
```

---

## Secrets Reference for Each Workflow Job

### validate Job

No secrets used (public operations only)

### test Job

No secrets used (uses test database)

### deploy-backend Job

**Secrets Used:**
- `RAILWAY_TOKEN` - Authentication with Railway
- `RAILWAY_PROJECT_ID` - Identify project to deploy
- `SLACK_WEBHOOK_URL` - Notify on success/failure

### deploy-frontend Job

**Secrets Used:**
- `VERCEL_TOKEN` - Authentication with Vercel
- `VERCEL_ORG_ID` - Identify organization
- `VERCEL_PROJECT_ID` - Identify project to deploy
- `SLACK_WEBHOOK_URL` - Notify on success/failure

### smoke-tests Job

**Secrets Used:**
- `SLACK_WEBHOOK_URL` - Notify on test results

---

## Local Development Setup

To test deployment locally (optional):

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link project
cd apps/web
vercel link

# Set environment variables locally
vercel env pull .env.local

# Test build
vercel build --prod

# Deploy preview
vercel --prod
```

---

## Support & Troubleshooting

### Where to Find Help

| Issue | Resource |
|-------|----------|
| Railway auth issues | https://railway.app/support |
| Vercel deployment | https://vercel.com/support |
| GitHub Actions | https://docs.github.com/en/actions |
| Slack webhooks | https://api.slack.com/help |

### Emergency Access

If secrets are compromised:

1. **Immediately revoke:**
   ```bash
   # Railway
   https://railway.app/dashboard → Account → API Tokens → Delete token

   # Vercel
   https://vercel.com/account/tokens → Delete token

   # Slack
   https://api.slack.com/apps → Settings → Incoming Webhooks → Delete webhook
   ```

2. **Generate new tokens and update GitHub Secrets**

3. **Audit recent deployments** for unauthorized access

4. **Notify team** of rotation

---

## Next Steps After Setup

1. ✅ All secrets configured
2. ✅ Test workflow runs successfully
3. ✅ Configure Railway deployment variables (DATABASE_URL, API environment)
4. ✅ Configure Vercel environment variables (NEXT_PUBLIC_API_URL)
5. ✅ Create branch protection rules
6. ✅ First production deployment

See `DEPLOYMENT_ARCHITECTURE.md` for complete deployment guide.

---

**Document Version:** 1.0.0
**Last Updated:** 2026-02-17
**Next Review:** 2026-05-17

For questions, contact the DevOps team or create a GitHub issue.
