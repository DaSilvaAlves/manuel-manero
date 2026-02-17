# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Ecossistema Digital "UAU" - Manuel Manero** is a full-stack web platform for personal branding ("Marca Pessoal Milionária"). It's a **monorepo** using npm workspaces with two main applications:

- **Frontend (`apps/web`)**: Next.js 15 with React 18, TypeScript, TailwindCSS
- **Backend (`apps/api`)**: Express.js with Prisma ORM, PostgreSQL

**Current Status:** Epic 2 complete ✅ | Epic 3 (2 of 3 stories) in progress
**Development Methodology:** Story-driven development with detailed acceptance criteria in `docs/stories/stories-backlog.md`

---

## Common Development Commands

### Root Level (Monorepo)

```bash
npm run dev          # Start all workspaces in dev mode
npm run build        # Build all apps
npm run lint         # Run ESLint across all workspaces
npm run typecheck    # TypeScript type checking
npm test             # Run tests (when test framework is added)
npm run clean        # Remove all node_modules
```

### Frontend (`apps/web`)

```bash
cd apps/web
npm run dev          # Next.js dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run typecheck    # TypeScript strict mode check
```

### Backend (`apps/api`)

```bash
cd apps/api
npm run dev          # ts-node development server (localhost:3001)
npm run build        # Compile TypeScript to dist/
npm run start        # Run compiled Node.js
npm run typecheck    # TypeScript check
npm run lint         # ESLint check
npm run migrate      # Create/apply Prisma migrations
npm run migrate:deploy  # Deploy migrations in production
npm run studio       # Open Prisma Studio (GUI for database)
npm run seed         # Populate sample data
```

### Typical Development Workflow

```bash
# Terminal 1: Frontend
cd apps/web && npm run dev

# Terminal 2: Backend
cd apps/api && npm run dev

# Terminal 3: Database (if needed)
cd apps/api && npm run studio
```

---

## Project Architecture

### Monorepo Structure

```
manuel-manero/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── app/          # Routes & pages
│   │   ├── src/
│   │   │   ├── components/   # React components
│   │   │   ├── lib/          # Utilities & helpers
│   │   │   └── styles/       # Global styles
│   │   └── public/           # Static assets
│   │
│   └── api/              # Express backend
│       ├── src/
│       │   ├── index.ts      # Main app & middleware
│       │   ├── routes/       # API endpoint groups
│       │   ├── validation.ts # Zod schemas
│       │   └── services/     # Business logic
│       └── prisma/
│           ├── schema.prisma # Database schema
│           └── migrations/   # DB migrations
│
├── packages/             # Shared code (future)
├── docs/
│   ├── stories/          # User stories (task tracking)
│   ├── epics/            # Epic definitions
│   └── architecture/     # Architecture docs
│
├── HANDOFF.md           # Detailed handoff document
└── README.md            # Project overview
```

### Frontend Architecture

- **Framework**: Next.js 15 with App Router
- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Styling**: TailwindCSS with Framer Motion for animations
- **Routes**:
  - `/` - Home page
  - `/sobre` - About page
  - `/programas` - Programs page
- **Components**: Reusable UI components in `src/components/` (Button, Card, Input, Navbar, Footer, Timeline, etc.)

### Backend Architecture

- **Server**: Express.js with TypeScript
- **ORM**: Prisma (PostgreSQL)
- **Database**: 9 models (User, Lead, Content, Program, TestimonialVideo, QuizQuestion, QuizAnswer, CommunityMember, Event)
- **Validation**: Zod schemas for request/response validation
- **Middleware**: CORS, Morgan logging, custom error handling
- **Routing**: RESTful endpoints in `src/routes/`

### Current API Endpoints

**GET Endpoints (Working):**
- `/health` - Server status + DB check
- `/api/v1` - API info
- `/api/articles` - Paginated articles
- `/api/articles/:slug` - Single article
- `/api/testimonials` - Paginated testimonials
- `/api/testimonials/:id` - Single testimonial
- `/api/programs` - Paginated programs
- `/api/programs/:slug` - Single program

**POST Endpoints (Planned):**
- `/api/leads` - Lead capture (Story 3.3)
- `/api/webhooks/activecampaign` - CRM webhooks
- `/api/webhooks/hotmart` - Payment webhooks

---

## Code Standards & Patterns

### TypeScript Configuration

Both apps use **strict mode** (`strict: true`):
- No implicit `any` types
- Strict null/undefined checking
- All types must be explicit

**Frontend** (`apps/web/tsconfig.json`):
- Strict linting enabled (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
- Path alias `@/*` points to `src/`
- Bundler module resolution

**Backend** (`apps/api/tsconfig.json`):
- ES2020 target & module
- CommonJS interop (`esModuleInterop`)
- Declaration maps for debugging

### Validation Pattern

Use **Zod** for all input validation:

```typescript
// Frontend: React Hook Form + Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

const form = useForm({ resolver: zodResolver(schema) });

// Backend: Express middleware
import { z } from 'zod';

const leadSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  program: z.string().optional(),
});

app.post('/api/leads', (req, res) => {
  const validated = leadSchema.parse(req.body);
  // ... process
});
```

### Error Handling Pattern

**Backend** (consistent error responses):
```typescript
try {
  // operation
} catch (error) {
  console.error(`Error in operation:`, error);
  res.status(500).json({
    error: 'Operation failed',
    message: error instanceof Error ? error.message : 'Unknown error'
  });
}
```

### Component Pattern (Frontend)

Keep components focused and use props for customization:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  // Component implementation
};
```

---

## Development Workflow

### Story-Driven Development

All work is organized in **stories** (user stories with acceptance criteria):

1. **Stories Location**: `docs/stories/stories-backlog.md`
2. **Each story has:**
   - Clear description
   - Acceptance criteria (checkboxes)
   - Subtasks/implementation tasks
   - Related files & components
3. **Track Progress**: Update checkboxes as you complete tasks
4. **File Updates**: Add completed files to story's "File List" section

### Naming Conventions

- **Commits**: Use conventional commits with story reference
  ```
  feat: implement lead capture API [Story 3.3]
  fix: resolve dark mode toggle [Story 1.2]
  docs: update API documentation [Story 3.2]
  ```
- **Branch Names**: Feature branches follow story IDs
  ```
  feature/story-3-3-lead-capture
  fix/bug-description
  ```

### When to Use Agents

This project uses the **AIOS framework** with specialized agents:

- `@dev` or `@architect` - For implementation tasks
- `@qa` - For testing and validation
- `@pm` or `@po` - For story planning
- `@sm` - For story creation and management

**To activate an agent:**
```
@dev *develop 3.3
@architect *plan
@qa *test
```

---

## Database Schema

Prisma is used with PostgreSQL. Key models:

- **User**: Subscribers/members with roles (subscriber, member, admin)
- **Lead**: Captured leads from forms with source tracking
- **Content**: Blog posts, videos, podcasts with SEO fields
- **Program**: Courses/programs (PRIME, MASTERY) with pricing
- **TestimonialVideo**: Video testimonials linked to programs
- **QuizQuestion & QuizAnswer**: Assessment quiz system
- **CommunityMember**: Community membership tracking
- **Event**: Community events and webinars

**Database Operations:**
```bash
# Create/update schema
npx prisma migrate dev --name <description>

# Apply migrations in production
npx prisma migrate deploy

# View/edit data graphically
npm run studio

# Seed sample data
npm run seed
```

---

## Testing Strategy

**Current Status**: Testing framework not yet integrated (planned for future epics)

When tests are added, follow this pattern:
- Unit tests for business logic (services, utilities)
- Integration tests for API endpoints
- Component tests for React components
- E2E tests for critical user flows

**Test file locations:**
- Backend: `apps/api/src/**/*.test.ts`
- Frontend: `apps/web/src/**/*.test.tsx`

---

## Important Files & Locations

| File | Purpose |
|------|---------|
| `HANDOFF.md` | Detailed handoff with current status |
| `README.md` | Project overview & setup guide |
| `docs/stories/stories-backlog.md` | All 14 stories with acceptance criteria |
| `apps/web/app/globals.css` | Theme colors and global styles |
| `apps/api/prisma/schema.prisma` | Database schema definition |
| `apps/api/src/validation.ts` | Zod validation schemas |
| `.npmrc` | npm configuration (`legacy-peer-deps=true`) |
| `.env.example` | Environment variables template |

---

## Key Environment Variables

Required in `apps/api/.env.local`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/manuel_manero

# Server
NODE_ENV=development
API_PORT=3001
FRONTEND_URL=http://localhost:3000

# Integrations (add as needed)
ACTIVECAMPAIGN_API_URL=https://yourinstance.api-us1.com
ACTIVECAMPAIGN_API_KEY=your-key-here
OPENAI_API_KEY=your-key-here
JWT_SECRET=your-secret-key
```

Never commit `.env.local` (in `.gitignore`)

---

## Performance & Quality Checks

Before committing code:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build validation
npm run build

# Run tests (when available)
npm test
```

**Frontend Performance Targets:**
- Lighthouse score: > 90
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1

**Backend Requirements:**
- All endpoints return consistent JSON format
- Input validation with Zod
- Proper HTTP status codes
- Error messages are descriptive

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Module not found | Run `npm run clean && npm install` |
| Port 3000/3001 in use | Use `PORT=3000 npm run dev` or `API_PORT=3001 npm run dev` |
| Database connection error | Check `DATABASE_URL` in `.env.local` and PostgreSQL is running |
| TypeScript errors in vscode | Run `npm run typecheck` to see full errors |
| ESLint not working | Run `npm run lint -- --fix` to auto-fix issues |
| Prisma migrations failing | Delete `apps/api/prisma/migrations/` and run `npm run migrate` |

---

## Next Development Tasks

Current progress: **Epic 3.0 (67% complete - 2 of 3 stories)**

- ✅ Story 3.1: Express Setup + Database Schema
- ✅ Story 3.2: Content APIs with validation & optimization
- ⏳ **Story 3.3: Lead Capture & CRM Integration** (NEXT)

After 3.3, continue with:
- Epic 4.0: Community & Checkout Integration
- Epic 5.0: IA Features & Optimization

See `HANDOFF.md` and `docs/stories/stories-backlog.md` for complete task lists and acceptance criteria.

---

## Quick Reference

```bash
# Development
npm run dev              # All apps
npm run typecheck        # Verify types
npm run lint             # Check code quality

# Building
npm run build            # Compile all

# Database
cd apps/api && npm run studio    # GUI database editor
cd apps/api && npm run migrate   # Create migrations
cd apps/api && npm run seed      # Add sample data

# Cleanup
npm run clean            # Remove node_modules
```

