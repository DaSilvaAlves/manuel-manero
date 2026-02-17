# Ecossistema Digital "UAU" - Epic Breakdown

**Projeto:** Manuel Manero - Marca Pessoal Milionária
**Data:** 2026-02-16
**Status:** Planning
**Total Epics:** 5

---

## Epic 1.0: Frontend Foundation & Setup

### Objetivo
Configurar a infraestrutura frontend com Next.js 15, TypeScript, design system completo e estrutura de componentes reutilizáveis para acelerar implementação das páginas.

### Contexto Existente
- **Stack:** Next.js 15, React 18.3.1, TailwindCSS, TypeScript
- **Deploy:** Vercel
- **Status Atual:** Dependências corrigidas, pronto para desenvolvimento

### Descrição
Este epic estabelece a fundação técnica e visual do projeto. Inclui configuração do ambiente de desenvolvimento, design system com colors/tipografia, componentes base (Button, Card, Container, etc) e layout structure (navbar, footer, sidebar) que será reutilizado em todas as páginas.

### Stories

#### Story 1.1: Next.js Setup & Project Structure
**Descrição:** Configurar Next.js com ESLint, TypeScript strict mode, path aliases, ambiente multi-staging, build optimization.

**Predicted Agents:** @dev
**Quality Gates:**
- Pre-Commit: ESLint, TypeScript strict mode validation
- Pre-PR: Build performance check

**Focus Areas:**
- Next.js best practices (app router, server/client components)
- TypeScript strict mode enabled
- Path aliases for clean imports
- Environment configuration (dev, staging, production)
- Build optimization (code splitting, lazy loading)

---

#### Story 1.2: Design System & Base Components
**Descrição:** Criar design system com TailwindCSS config (colors, spacing, typography), criar componentes base (Button, Card, Container, Badge, Alert) documentados com Storybook (opcional) ou documentação inline.

**Predicted Agents:** @dev, @ux-design-expert
**Quality Gates:**
- Pre-Commit: Component accessibility check (WCAG 2.1)
- Pre-PR: Consistency validation against design specs

**Focus Areas:**
- Color palette implementation (deep blue, gold accents)
- Typography system (Bold titles, clean body text)
- Component reusability and consistency
- Accessibility (semantic HTML, ARIA labels)
- Responsive design (mobile-first approach)
- Dark/Light mode support

---

#### Story 1.3: Layout Structure & Navigation
**Descrição:** Implementar RootLayout com navbar, footer, sidebar (se necessário), theme switcher (dark/light mode), mobile-responsive navigation.

**Predicted Agents:** @dev, @ux-design-expert
**Quality Gates:**
- Pre-Commit: Mobile responsiveness validation
- Pre-PR: Navigation UX consistency check

**Focus Areas:**
- Responsive navbar (mobile hamburger, desktop horizontal)
- Footer with links and branding
- Theme toggle (dark/light mode persistence)
- Mobile-first responsive design
- Accessibility navigation (keyboard navigation, skip links)
- Performance optimization for layout

---

### Compatibility Requirements
- ✅ No breaking changes (new foundation)
- ✅ Mobile-first responsive design
- ✅ Performance target: Lighthouse >90
- ✅ WCAG 2.1 AA accessibility compliance

### Risk Mitigation
- **Primary Risk:** Design inconsistency across pages if components not standardized
- **Mitigation:** Centralized component library with clear APIs; Storybook documentation
- **Rollback Plan:** Components are non-breaking; can be refined iteratively

### Definition of Done
- [ ] Next.js project fully configured with best practices
- [ ] Design system documented and tested
- [ ] All base components created and accessible
- [ ] Layout structure responsive and themed
- [ ] No console errors or TypeScript warnings
- [ ] Lighthouse score >90
- [ ] Accessibility audit passes WCAG 2.1 AA

---

## Epic 2.0: Home & Core Pages

### Objetivo
Implementar páginas públicas principais (Home, Sobre, Programas, Comunidade) que convertem visitantes em leads qualificados, usando storytelling autêntico e CTAs claros.

### Contexto Existente
- **Stack:** Next.js 15, React 18.3.1, TailwindCSS
- **Design:** Long-form narrativo, quiet luxury aesthetic
- **Target Audience:** Empreendedores 25-50 anos (PT/BR)

### Descrição
Este epic entrega as páginas públicas que formam o coração do site. Cada página segue estrutura: Problema → Promessa → Método → Prova → CTA. Inclui animações leves (Framer Motion), responsividade, SEO otimizado e CTAs mapeados para lead capture.

### Stories

#### Story 2.1: Home Page - Hero + Overview
**Descrição:** Implementar hero de alto impacto (vídeo/imagem background), headline "Construa Marca Pessoal Milionária", CTAs "Comece Agora" e "Explore Programas", seção "Transformação Entregue" com 4 blocos ícones, preview do ecossistema com cards PRIME/MASTERY/Comunidade.

**Predicted Agents:** @dev, @ux-design-expert
**Quality Gates:**
- Pre-Commit: SEO meta tags, accessibility validation
- Pre-PR: Performance check (hero video optimization, lazy loading)

**Focus Areas:**
- Hero section with compelling visuals
- Clear headline and sub-headline
- High-contrast CTAs
- Responsive video/image handling
- SEO optimization (meta tags, structured data)
- Core Web Vitals optimization (LCP < 2.5s, CLS < 0.1)

---

#### Story 2.2: About Page - Storytelling & Timeline
**Descrição:** Implementar timeline interativa da história de Manuel (15+ anos, psicomarketing, growth), formação acadêmica, papel pessoal, micro-depoimentos integrados, CTA "Agende Conversa Gratuita" com Calendly embed.

**Predicted Agents:** @dev, @ux-design-expert
**Quality Gates:**
- Pre-Commit: Interactive element accessibility check
- Pre-PR: Content SEO validation

**Focus Areas:**
- Interactive timeline component
- Responsive layout for long-form content
- Image optimization and lazy loading
- Micro-testimonials display
- Calendly integration
- Accessibility for interactive elements
- Mobile-friendly long-form reading

---

#### Story 2.3: Programs Page - PRIME, MASTERY, Mentorships
**Descrição:** Implementar página com subseções para PRIME (iniciante), MASTERY (avançado), Mentorias 1:1/Mastermind. Cada programa: Problema → Promessa → Método → Prova (depoimentos selecionados) → CTA "Inscreva-se". IA para sugestões personalizadas.

**Predicted Agents:** @dev, @ux-design-expert, @architect
**Quality Gates:**
- Pre-Commit: Form validation, CTA tracking setup
- Pre-PR: API integration test (if connecting to backend for recommendations)

**Focus Areas:**
- Multi-section page architecture
- Card components with detailed information
- Form submission handling
- CTA tracking and analytics
- Responsive grid layouts
- AI personalization logic (if integrated)
- Loading states and error handling

---

### Compatibility Requirements
- ✅ All pages SEO-optimized (meta tags, structured data)
- ✅ Mobile-responsive across all breakpoints
- ✅ CTAs tracked in GA4
- ✅ Integration with Hotmart and ActiveCampaign

### Risk Mitigation
- **Primary Risk:** Poor conversion metrics if copy/CTAs not tested
- **Mitigation:** A/B test CTAs post-launch; Google Analytics for tracking; heat maps (Hotjar optional)
- **Rollback Plan:** Pages can be replaced without affecting backend

### Definition of Done
- [ ] All pages implemented and responsive
- [ ] SEO meta tags and structured data added
- [ ] CTAs functional and tracked in GA4
- [ ] Copy matches PRD requirements
- [ ] No console errors
- [ ] Lighthouse score >90
- [ ] Accessibility audit passes WCAG 2.1 AA

---

## Epic 3.0: Backend API Foundation

### Objetivo
Estabelecer infraestrutura backend com Express + PostgreSQL + Prisma, criar migrations de database, APIs básicas para conteúdos e estrutura para integrações externas (ActiveCampaign, Hotmart).

### Contexto Existente
- **Stack:** Express.js, TypeScript, PostgreSQL 15, Prisma, Redis
- **Deploy:** Railway
- **Database:** Vercel Postgres (serverless)

### Descrição
Este epic cria a camada backend que alimenta o frontend. Inclui database schema (Users, Leads, Content, etc), Prisma migrations, REST APIs para conteúdos (artigos, vídeos, depoimentos), estrutura para webhooks (Hotmart), e preparação para futuras features de IA/chat.

### Stories

#### Story 3.1: Express Setup + Database Schema
**Descrição:** Configurar Express.js com middleware (CORS, logging, error handling), conectar Prisma ao PostgreSQL, criar schema base (Users, Leads, Content, Programs, Testimonials), executar migrations, setup variáveis ambiente, health check endpoint.

**Predicted Agents:** @dev, @data-architect, @architect
**Quality Gates:**
- Pre-Commit: Schema validation, migration reversibility check
- Pre-PR: Database backward compatibility validation

**Focus Areas:**
- Express middleware setup (CORS, error handling, logging)
- Prisma schema design (relationships, constraints)
- Migration strategy (reversible, versioned)
- Environment configuration (dev, staging, production)
- Database performance (indexes on key fields)
- Error handling patterns
- API documentation setup

---

#### Story 3.2: Content APIs (GET endpoints)
**Descrição:** Implementar endpoints para recuperar conteúdos: GET /api/articles, GET /api/articles/:id, GET /api/testimonials, GET /api/programs, com filtros, pagination, validação, error handling. Integração opcional com Algolia para busca semântica.

**Predicted Agents:** @dev, @architect
**Quality Gates:**
- Pre-Commit: Input validation, SQL injection prevention
- Pre-PR: API contract validation, performance testing

**Focus Areas:**
- RESTful endpoint design
- Input validation (Zod)
- Pagination and filtering
- Error response consistency
- API documentation (OpenAPI/Swagger)
- Query optimization (avoid N+1)
- Performance testing

---

#### Story 3.3: Lead Capture & CRM Integration
**Descrição:** Implementar POST /api/leads para capturar leads (email, name, programa preferido), integração ActiveCampaign para auto-add a tagging/automations, validação de email, rate limiting, webhooks para eventos (form submission, program signup).

**Predicted Agents:** @dev, @architect
**Quality Gates:**
- Pre-Commit: GDPR compliance validation, no hardcoded secrets
- Pre-PR: Integration security test, rate limiting validation

**Focus Areas:**
- Form submission API
- GDPR-compliant data storage
- ActiveCampaign API integration
- Rate limiting (prevent spam)
- Webhook signature validation
- Error handling for external APIs
- Retry logic for failed integrations
- Security (no credential leaks)

---

### Compatibility Requirements
- ✅ PostgreSQL schema backward compatible
- ✅ Existing functionality preserved during migrations
- ✅ GDPR-compliant (data privacy, consent)
- ✅ API versioning if future breaking changes

### Risk Mitigation
- **Primary Risk:** Database migration failure or data loss
- **Mitigation:** Reversible migrations; backup strategy; test in staging first
- **Rollback Plan:** Database can be rolled back to previous migration version

### Definition of Done
- [ ] Express server configured with middleware
- [ ] Prisma migrations created and tested
- [ ] All endpoints tested and documented
- [ ] ActiveCampaign integration working
- [ ] No hardcoded secrets or credentials
- [ ] Error handling comprehensive
- [ ] Database indexes optimized
- [ ] All APIs return consistent error responses

---

## Epic 4.0: Community & Checkout Integration

### Objetivo
Implementar página Comunidade Milionária com manifesto, benefícios, depoimentos, e integração Hotmart para checkout e webhook handling de pagamentos.

### Contexto Existente
- **Plataforma de Pagamento:** Hotmart
- **Comunidade Existente:** Externa (dirigir tráfego para Hotmart)
- **Target:** Empreendedores buscando network e recursos

### Descrição
Este epic vende "belonging" e comunidade. Página Comunidade destaca benefícios (lives, networking, recursos personalizados, desafios), depoimentos em vídeo, e CTA "Entre na Comunidade" que redireciona para Hotmart. Backend recebe webhooks de Hotmart para rastrear conversões e atualizações de status.

### Stories

#### Story 4.1: Community Page - Sales & Social Proof
**Descrição:** Implementar página Comunidade com manifesto (purpose-driven community), seção benefícios (lives, networking, recursos IA-personalizados), "Para Quem É / Não É", depoimentos vídeo de membros, CTA "Entre na Comunidade" que redireciona Hotmart com utm_source.

**Predicted Agents:** @dev, @ux-design-expert
**Quality Gates:**
- Pre-Commit: Video optimization, CTA tracking setup
- Pre-PR: Conversion funnel validation

**Focus Areas:**
- Long-form persuasive copy
- Video testimonials display
- Responsive testimonial carousel
- High-contrast CTAs
- UTM tracking for analytics
- Mobile optimization for sales conversion
- Page load performance

---

#### Story 4.2: Hotmart Integration & Webhooks
**Descrição:** Integrar Hotmart API para webhook handling (purchase.completed, subscription.active, refund, etc), POST endpoint para recepcionar webhooks, validar assinatura Hotmart, atualizar lead status em database, rastreamento de conversão, logs de transações.

**Predicted Agents:** @dev, @architect
**Quality Gates:**
- Pre-Commit: Security validation (signature verification), no hardcoded keys
- Pre-PR: Integration test with Hotmart sandbox

**Focus Areas:**
- Webhook signature validation (HMAC)
- Idempotency (handle duplicate webhooks)
- Transactional updates (atomicity)
- Error handling for failed processing
- Webhook retry logic
- Event logging for audit trail
- PCI compliance considerations
- Security (no credential exposure)

---

### Compatibility Requirements
- ✅ Hotmart integration non-breaking
- ✅ External checkout flow preserved
- ✅ Webhook processing doesn't block HTTP response
- ✅ Graceful error handling for payment failures

### Risk Mitigation
- **Primary Risk:** Payment webhook failure could cause missed conversions
- **Mitigation:** Webhook retry logic; monitoring alerts; manual sync option
- **Rollback Plan:** Webhooks can be re-processed if system fails

### Definition of Done
- [ ] Community page fully implemented and responsive
- [ ] Hotmart integration tested in sandbox environment
- [ ] Webhooks receiving and processing correctly
- [ ] Lead status updates reflecting Hotmart transactions
- [ ] Conversion tracking in GA4
- [ ] Error handling comprehensive
- [ ] Security validation passed
- [ ] Documentation of webhook events

---

## Epic 5.0: IA Features & Optimization

### Objetivo
Implementar features de IA (chat assistente, quiz de assessment de marca personalizado, recomendações de conteúdo) e otimizações de performance para alcançar Lighthouse >90 e Core Web Vitals ideais.

### Contexto Existente
- **IA Provider:** OpenAI GPT-4
- **Stack:** Next.js, Express, Redis (para cache)
- **Performance Target:** Lighthouse >90, LCP <2.5s, CLS <0.1

### Descrição
Este epic adiciona features IA que diferenciam o site e aumentam engagement. Chat IA guia visitantes (ex: "Qual programa é ideal para mim?"), quiz personalizado de assessment de marca propõe recomendações, recomendações de conteúdo adaptam-se ao usuário. Também otimiza performance globalmente (image optimization, code splitting, caching).

### Stories

#### Story 5.1: Chat IA Assistente
**Descrição:** Implementar chat widget com OpenAI GPT-4, context sobre Manuel e programas, responde perguntas sobre marca pessoal/programas, sugere programa ideal baseado em conversa, integração com lead capture (opcionalmente).

**Predicted Agents:** @dev, @architect
**Quality Gates:**
- Pre-Commit: API key security validation, prompt injection prevention
- Pre-PR: Integration test with OpenAI sandbox

**Focus Areas:**
- OpenAI API integration
- Chat context management (conversation history)
- Token usage optimization (cost control)
- Prompt engineering for accurate responses
- Error handling for API failures
- Rate limiting
- User privacy (no data leaks to OpenAI)
- Responsive chat UI

---

#### Story 5.2: Assessment Quiz - Personalized Recommendations
**Descrição:** Criar quiz interativo (5-7 questões) sobre objetivo, nível experiência, desafios, com IA para processar respostas e recomendar programa ideal (PRIME para iniciante, MASTERY para avançado). Resultado pode capturar lead e enviar email com recomendação.

**Predicted Agents:** @dev, @ux-design-expert
**Quality Gates:**
- Pre-Commit: Form validation, quiz logic testing
- Pre-PR: Lead capture integration test

**Focus Areas:**
- Interactive quiz component
- IA-powered recommendation logic
- Lead capture on result
- Email integration (ActiveCampaign)
- Mobile-responsive quiz
- Accessibility for interactive forms
- Performance optimization

---

#### Story 5.3: Performance & SEO Optimization
**Descrição:** Aplicar image optimization (WebP, lazy loading), code splitting (dynamic imports), caching strategy (Redis para APIs), CDN setup, minification, tree-shaking, prefetching crítico, Google Page Speed Insights otimizado, SEO meta tags dinâmicos.

**Predicted Agents:** @dev, @architect
**Quality Gates:**
- Pre-Commit: Bundle size analysis, performance regression check
- Pre-PR: Lighthouse audit (target >90)

**Focus Areas:**
- Image optimization and WebP conversion
- Code splitting and lazy loading
- Caching strategy (browser cache, Redis)
- CSS/JS minification and tree-shaking
- Prefetching and preloading critical resources
- Database query optimization
- API response caching
- CDN integration
- Core Web Vitals optimization
- Monitoring and alerting

---

### Compatibility Requirements
- ✅ IA features non-breaking (chat optional, quiz optional)
- ✅ Performance improvements don't affect existing functionality
- ✅ OpenAI integration fails gracefully if API down
- ✅ Backward compatible APIs

### Risk Mitigation
- **Primary Risk:** IA costs could exceed budget if chat used heavily
- **Mitigation:** Rate limiting; token usage monitoring; cost alerts
- **Rollback Plan:** IA features can be disabled via feature flags

### Definition of Done
- [ ] Chat IA implemented and trained on project context
- [ ] Quiz recommendation logic validated
- [ ] All IA APIs integrated securely
- [ ] Performance optimizations applied
- [ ] Lighthouse score >90 across all pages
- [ ] Core Web Vitals in green (LCP <2.5s, CLS <0.1)
- [ ] No API key leaks or security issues
- [ ] Monitoring and cost tracking in place
- [ ] Feature flags for disabling IA features if needed

---

## Timeline & Dependencies

| Epic | Order | Duration | Dependencies |
|------|-------|----------|--------------|
| 1.0 | 1st | 2 weeks | None |
| 2.0 | 2nd | 3 weeks | Epic 1.0 ✓ |
| 3.0 | 3rd | 2 weeks | Epic 1.0 ✓ |
| 4.0 | 4th | 1.5 weeks | Epic 2.0 ✓, Epic 3.0 ✓ |
| 5.0 | 5th | 2 weeks | Epic 1.0 ✓, Epic 3.0 ✓ |

**Total Estimated Duration:** 10.5 weeks (~2.5 months)

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Conversion (visitor → lead) | >15% |
| Community signup rate | +25% trimestral |
| Lighthouse score | >90 |
| Core Web Vitals | LCP <2.5s, CLS <0.1 |
| Page load time (avg) | <3s |
| Mobile optimization | 95%+ responsive score |

---

**Status:** Ready for Story Manager (@sm) to create detailed user stories

— Morgan 📊
