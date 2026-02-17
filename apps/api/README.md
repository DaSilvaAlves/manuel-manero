# Manuel Manero Ecosystem - API Backend

Express.js API with Prisma ORM and PostgreSQL database.

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

**Key variables to set:**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/manuel_manero"
NODE_ENV="development"
API_PORT="3001"
FRONTEND_URL="http://localhost:3000"
```

### 3. Set Up Database

#### Option A: Local PostgreSQL

1. **Install PostgreSQL** (if not already installed)
   - macOS: `brew install postgresql`
   - Windows: Download from https://www.postgresql.org/download/windows/
   - Linux: `sudo apt-get install postgresql`

2. **Create database**

```bash
createdb manuel_manero
```

3. **Run migrations**

```bash
npm run migrate
```

#### Option B: Vercel Postgres (Cloud)

1. Create a Vercel Postgres database at https://vercel.com/postgres
2. Copy the connection string to `DATABASE_URL` in `.env.local`
3. Run migrations: `npm run migrate`

### 4. Seed Database (Optional)

```bash
npm run seed
```

This will create:
- 3 Programs (PRIME, MASTERY, Mentorias)
- Sample testimonials
- Sample content

### 5. Start Development Server

```bash
npm run dev
```

Server will start at `http://localhost:3001`

## 📚 API Documentation

### Health Check
- **GET** `/health` - Server health & database status

### Root API
- **GET** `/api/v1` - API information & available endpoints

### Leads
- **GET** `/api/v1/leads` - Fetch captured leads
  - Query params: `limit` (1-100), `offset` (default: 0)

### Programs
- **GET** `/api/v1/programs` - Fetch published programs with testimonials

### Content
- **GET** `/api/v1/content` - Fetch published content
  - Query params: `type` (blog/video/podcast), `category`, `limit`

## 🛠️ Available Scripts

```bash
# Development
npm run dev                # Start dev server with hot reload

# Production
npm run build             # Build TypeScript to dist/
npm run start             # Start from compiled dist/

# Database
npm run migrate           # Create/apply migrations
npm run migrate:deploy    # Run migrations in production
npm run studio            # Open Prisma Studio GUI

# Code Quality
npm run typecheck         # TypeScript type checking
npm run lint              # Run ESLint

# Data
npm run seed              # Seed database with sample data
```

## 📁 Project Structure

```
apps/api/
├── src/
│   └── index.ts              # Express app & routes
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── seed.ts              # Seed script
│   └── migrations/          # Migration files (auto-generated)
├── dist/                     # Compiled JavaScript (generated)
├── .env.example              # Environment variables template
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies & scripts
```

## 🗄️ Database Models

### User
- User accounts and preferences

### Lead
- Captured leads from forms, quizzes, newsletters

### Content
- Blog posts, videos, podcasts

### Program
- PRIME, MASTERY, Mentorias program details

### CommunityMember
- Community membership tracking

### TestimonialVideo
- Video testimonials with links to programs

### QuizAnswer
- Quiz responses and results

### Event
- Analytics events (CTAs, page views, etc.)

### WebhookLog
- Integration webhook logs (Hotmart, ActiveCampaign)

## 🔐 Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `API_PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Frontend origin for CORS (default: http://localhost:3000)
- `NODE_ENV` - development/production

Optional:
- `ACTIVECAMPAIGN_*` - CRM integration
- `OPENAI_API_KEY` - AI features
- `HOTMART_WEBHOOK_SECRET` - Hotmart webhooks
- `SENDGRID_API_KEY` - Email sending
- And others (see `.env.example`)

## 🧪 Testing Database Connection

```bash
# Start dev server - it will test DB connection on startup
npm run dev

# Or manually check with health endpoint
curl http://localhost:3001/health
```

## 📝 Migrations

Migrations are automatically generated when you change the Prisma schema.

```bash
# Create and run a new migration
npm run migrate

# Create migration without applying
npx prisma migrate dev --create-only

# View migration status
npx prisma migrate status
```

Migrations are reversible and stored in `prisma/migrations/`.

## 🚨 Common Issues

### "Port 3001 already in use"
- Change `API_PORT` in `.env.local` to another port
- Or kill the process: `lsof -ti:3001 | xargs kill -9`

### "DATABASE_URL is not set"
- Make sure `.env.local` exists and has `DATABASE_URL`
- Don't use `.env` - use `.env.local`

### "Migration failed"
- Check database URL is correct
- Ensure PostgreSQL is running
- Try resetting: `npx prisma migrate reset`

### "TypeScript errors"
- Run `npm run typecheck` to see all errors
- Check that all types are properly imported

## 🔗 Integration Points

### Frontend (Next.js)
- API endpoint: `http://localhost:3001/api/v1`
- CORS enabled for `http://localhost:3000`

### Third-Party Services
- **ActiveCampaign** - CRM integration for leads
- **Hotmart** - Webhook integration for purchases
- **OpenAI** - AI features (chat, recommendations)
- **SendGrid** - Email notifications
- **Cloudinary** - Image/media hosting
- **Algolia** - Search indexing

## 📖 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test locally
3. Commit: `git commit -m "feat: description"`
4. Push: `git push origin feature/name`

## 📄 License

Private project - Do not distribute.
