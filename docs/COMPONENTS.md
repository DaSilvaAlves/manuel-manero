# 🎨 Catálogo de Componentes UI

**Status:** Primeira Versão
**Última Atualização:** 11 de fevereiro de 2026

---

## 1. Componentes de Layout

### Header

```typescript
// components/layout/Header.tsx
- Logo (clicável para home)
- Nav Menu (home, sobre, programas, comunidade, blog, contato)
- Dark/Light Mode Toggle
- Mobile Hamburger Menu
- Newsletter Signup Mini-form (desktop)

Props:
├─ variant: 'default' | 'transparent' (hero)
├─ sticky: boolean (sticky ao scroll)
└─ onNavigate: (path: string) => void
```

**Comportamento:**
- Desktop: Menu horizontal + logo
- Mobile: Menu collapse em hamburger
- Sticky: Sumariz e muda estilo ao scroll

---

### Footer

```typescript
// components/layout/Footer.tsx
- Coluna 1: Links (Home, Sobre, Programas, Comunidade, Blog)
- Coluna 2: Links (Contato, Agendar, Parcerias, Media)
- Coluna 3: Social Links (Instagram, LinkedIn, YouTube, TikTok)
- Coluna 4: Newsletter Signup CTA
- Copyright & Privacy Links

Props:
├─ backgroundColor: string (tema)
└─ variant: 'default' | 'dark'
```

---

### SideBar (Mobile)

```typescript
// components/layout/SideBar.tsx
- Menu items com ícones
- Collapse/expand animado
- Closes ao click fora
- Newsletter form included

Animação: Framer Motion slide-in
```

---

## 2. Componentes Hero

### HeroVideo

```typescript
// components/hero/HeroVideo.tsx
Estrutura:
├─ Background: Vídeo em loop (sem som)
├─ Overlay: Gradiente semi-transparente
├─ Content:
│  ├─ Headline (H1 bold, 48px desktop / 32px mobile)
│  ├─ Subheadline (24px / 18px, secundária)
│  └─ CTA Buttons (2: "Quero começar" + "Ver programas")
└─ Assets: Scrolldown indicator (animado)

Props:
├─ headline: string
├─ subheadline: string
├─ videoUrl: string (Cloudinary)
├─ ctaText: string
├─ ctaHref: string
└─ onCTAClick: () => void

Animations:
├─ Fade-in ao load (texto)
├─ Parallax leve do vídeo
└─ Bounce animation (scrolldown indicator)
```

**Performance:**
- Lazy load vídeo (poster image primeiro)
- Auto-play muted (browser policy)
- Responsive video (mp4 + webm)

---

### HeroStats

```typescript
// components/hero/HeroStats.tsx
Estrutura:
├─ Grid de 4 cards:
│  ├─ "10,000+ empreendedores impactados"
│  ├─ "5,000+ na Comunidade Milionária"
│  ├─ "15+ anos de experiência"
│  └─ "1,000+ resultados alcançados"
├─ Números grandes com animação de contagem
└─ Ícones temáticos

Props:
├─ stats: { label: string, value: number | string, icon: Icon }[]
└─ animateOnScroll: boolean

Animação: CountUp ao entrar em viewport
```

---

## 3. Componentes de Cards

### ProgramCard

```typescript
// components/cards/ProgramCard.tsx
├─ Ícone temático (colorido)
├─ Título: "Método PRIME" / "Personal Branding MASTERY"
├─ Descrição (2 linhas max)
├─ 3 Bullets: Principais benefícios
├─ Tag: "Para quem quer começar" / "Avançado"
├─ Preço: €199 (se aplicável)
└─ CTA: "Conhecer mais" ou "Inscrever-se"

Props:
├─ program: Program
├─ onClick: () => void
└─ variant: 'default' | 'featured'

Hover State:
├─ Lift-up (transform translateY)
├─ Shadow expansion
└─ Button color change
```

---

### TestimonialCard

```typescript
// components/cards/TestimonialCard.tsx
├─ Foto do cliente (avatar, 80px)
├─ Nome + Função (ex: "João Silva, Coach")
├─ Resultado quantificado (ex: "Aumentei receita em 50%")
├─ Quote: Depoimento (máx 3 linhas)
├─ Stars: Rating (5 stars filled)
└─ Video icon (se houver vídeo)

Props:
├─ testimonial: Testimonial
├─ variant: 'text' | 'video'
└─ onClick: () => void

Hover State:
├─ Play icon aparece (se vídeo)
└─ Quote color changes
```

---

### ContentCard

```typescript
// components/cards/ContentCard.tsx
├─ Imagem (16:9 ratio)
├─ Badge: "Blog" / "Vídeo" / "Podcast"
├─ Título (H3, max 60 chars)
├─ Descrição resumida (max 80 chars)
├─ Meta: Data + Tempo leitura / duração
└─ CTA: "Ler artigo" / "Ver vídeo"

Props:
├─ content: Content
├─ onClick: () => void
└─ layout: 'grid' | 'list'

Image Handling:
├─ Lazy load
├─ Responsive srcset
└─ Skeleton loading state
```

---

## 4. Componentes de Formulários

### LeadForm

```typescript
// components/forms/LeadForm.tsx
Campos:
├─ Email (required, validação de email)
├─ Nome (optional)
├─ Source dropdown (quiz, newsletter, contact)
└─ Checkbox: "Concordo com termos"

Buttons:
├─ Submit: "Começar agora"
└─ Loader ao submeter

States:
├─ idle
├─ loading
├─ success (mensagem: "Verifique seu email")
└─ error (mensagem de erro)

Props:
├─ onSubmit: (data: LeadData) => Promise<void>
├─ defaultSource: string
└─ successMessage: string

Validation:
├─ Client-side: Zod schema
└─ Server-side: Backend validation
```

---

### NewsletterSubscribe

```typescript
// components/forms/NewsletterSubscribe.tsx
├─ Descrição: "Receba tips semanais sobre marca pessoal"
├─ Input: Email apenas
├─ CTA: "Subscrever"
└─ Privacy message: "GDPR-compliant"

Placement:
├─ Hero (pequeno)
├─ Footer (integrado)
├─ Sidebar (mobile)
└─ Pop-up (exit intent, opcional)

Animação: Slide-in ao aparecer
```

---

### ContactForm

```typescript
// components/forms/ContactForm.tsx
Campos:
├─ Nome (required)
├─ Email (required)
├─ Assunto (dropdown: Parceria, Media, Mentoria, Outro)
├─ Mensagem (textarea, min 10 chars)
└─ Arquivo (optional, max 5MB)

Submit:
├─ Validação client-side
├─ Envio via API
├─ Success message
└─ Redireciona para agendamento (Calendly)

Honeypot:
├─ Campo hidden (spam protection)
```

---

### QuizAssessment (IA)

```typescript
// components/forms/QuizAssessment.tsx
Estrutura:
├─ Progresso (barra)
├─ Pergunta (H3)
├─ 4 Opções (radio buttons ou cards)
├─ Navegação: Voltar / Próxima
└─ Final: Botão "Ver resultado"

Perguntas (5-7):
1. "Qual é seu nível de experiência?"
2. "Qual é seu objetivo principal?"
3. "Qual é seu maior desafio?"
4. "Quanto tempo pode dedicar?"
5. "Qual é seu budget?"

Resultado:
├─ Score personalizado
├─ Recomendação de programa (IA)
├─ CTA para programa recomendado
└─ Lead capture automático

Props:
├─ onQuizComplete: (result: QuizResult) => void
└─ variant: 'modal' | 'page'

Animação:
├─ Fade between questions
└─ Progress bar smooth
```

---

## 5. Componentes de IA & Interatividade

### ChatBubble

```typescript
// components/ai/ChatBubble.tsx
├─ Icon (bubble, bottom-right corner)
├─ Click expande para chat window
├─ Minimizar / Fechar
├─ Input: User message
├─ Output: AI response (markdown)
├─ Histórico de conversa scrollável
└─ Suggested actions (chips)

Props:
├─ initialMessage: string
├─ onMessage: (message: string) => Promise<string>
└─ position: 'bottom-right' | 'bottom-left'

Comportamento:
├─ Persiste ao navegar (sessionStorage)
├─ Close ao sair do site
└─ Notificação badge (se tiver resposta pendente)

AI Context:
├─ Sistema prompt (brand voice)
├─ Histórico limitado (últimos 5 messages)
└─ Fallback se IA falhe
```

---

### PersonalizedRecommendations

```typescript
// components/ai/PersonalizedRecommendations.tsx
├─ Título: "Recomendado para ti"
├─ Carrossel de 3-4 cards
├─ Baseado em: quiz result, conteúdo visitado
├─ Relevance score (visual: stars ou bar)
└─ CTA por item

Props:
├─ userId: string
├─ currentPage: string
├─ maxItems: number = 4
└─ onItemClick: (contentId: string) => void

Data Source:
├─ Backend: GET /api/recommendations?userId=...
├─ Cache: Redis (5 min)
└─ Fallback: Popular content (se não tiver recs)

Animação:
├─ Skeleton loading
├─ Fade-in cards
└─ Carousel swipe mobile
```

---

## 6. Componentes de Navegação & CTAs

### Breadcrumb

```typescript
// components/navigation/Breadcrumb.tsx
├─ Estrutura: Home / Programas / PRIME
├─ Links clicáveis
├─ Último item não clicável (current page)
└─ Separador: "/"

Props:
├─ items: { label: string, href?: string }[]
└─ variant: 'default' | 'simple'

Mobile:
├─ Truncate se muito longo
└─ Mostrar apenas últimos 2 items
```

---

### CTAButton

```typescript
// components/buttons/CTAButton.tsx
├─ Texto customizável
├─ Ícone (optional)
├─ Variants: primary, secondary, outlined
├─ Tamanhos: sm, md, lg
├─ Estados: default, hover, active, disabled, loading

Props:
├─ children: ReactNode
├─ variant: 'primary' | 'secondary' | 'outlined'
├─ size: 'sm' | 'md' | 'lg'
├─ onClick: () => void
├─ disabled: boolean
├─ loading: boolean
├─ fullWidth: boolean
└─ icon: React.ReactNode

Animação:
├─ Hover: Subtle scale + shadow
└─ Click: Pulse feedback

Acessibilidade:
├─ ARIA labels
├─ Keyboard navigation
└─ Focus outline visible
```

---

### CTA Sections

```typescript
// components/sections/CTASection.tsx
├─ Headline + Subheadline
├─ 2-3 Buttons com diferentes CTAs
├─ Background: Gradiente ou cor
└─ Opcional: Imagem side

Placements:
├─ Entre seções (home)
├─ Final de artigo (blog)
├─ Modal (exit intent)
└─ Bottom sticky (mobile)

Variações:
├─ Light / Dark background
└─ 1-3 buttons
```

---

## 7. Componentes de Seções (Layout Patterns)

### TextImageSection

```typescript
// components/sections/TextImageSection.tsx
├─ Coluna 1: Texto (H2 + paragrafos + CTA)
├─ Coluna 2: Imagem / Vídeo
├─ Layout: Flexível (esquerda/direita alternado)
└─ Mobile: Stack vertical

Props:
├─ heading: string
├─ content: string (markdown)
├─ image: { src, alt }
├─ cta: { text, href }
├─ imagePosition: 'left' | 'right'
└─ variant: 'default' | 'featured'

Padrão em Home:
├─ Seção 1: Quem é Manuel (texto + foto editorial)
├─ Seção 2: Transformação entregue (4 blocos)
├─ Seção 3: Ecossistema (cards)
```

---

### CarouselSection

```typescript
// components/sections/CarouselSection.tsx
├─ Título
├─ Cards em carrossel (3 desktop, 1 mobile)
├─ Navegação: Setas + dots
├─ Auto-scroll (opcional)
└─ Touch swipe support (mobile)

Props:
├─ title: string
├─ items: Card[]
├─ autoScroll: boolean = false
├─ gap: number = 20
└─ itemsPerView: { desktop: 3, mobile: 1 }

Exemplo Uso:
├─ Depoimentos (TestimonialCard)
├─ Artigos destaque (ContentCard)
└─ Programas (ProgramCard)
```

---

## 8. Estados de Loading & Feedback

### SkeletonLoader

```typescript
// components/loading/SkeletonLoader.tsx
├─ Skeleton genérico (shimmer animation)
├─ Variações:
│  ├─ Text line
│  ├─ Card (imagem + texto)
│  └─ Circular (avatar)
└─ Customizável

Props:
├─ variant: 'line' | 'card' | 'avatar'
├─ width: string | number
├─ height: string | number
└─ count: number = 1

Animação: Shimmer suave (gradiente animated)
```

---

### Toast Notifications

```typescript
// components/notifications/Toast.tsx
├─ Posições: top-right, bottom-right, center
├─ Tipos: success, error, info, warning
├─ Auto-dismiss (5s)
├─ Close manual
└─ Stacking

Props:
├─ message: string
├─ type: 'success' | 'error' | 'info' | 'warning'
├─ duration: number = 5000
└─ action: { label: string, onClick: () => void }

Exemplo:
├─ Form submit success
├─ Newsletter subscribed
└─ Copy to clipboard
```

---

## 9. Acessibilidade (WCAG 2.1 AA)

### Requisitos para Todos os Componentes

- [ ] ARIA labels para elementos interativos
- [ ] Keyboard navigation completa (Tab, Enter, Escape)
- [ ] Color contrast ratio >= 4.5:1 (normal text)
- [ ] Focus outline visible (outline: 2px)
- [ ] Alt text para imagens
- [ ] Semantic HTML (<button>, <nav>, <main>)
- [ ] Zoom support até 200%
- [ ] Touch targets >= 44x44px
- [ ] Respeitação de `prefers-reduced-motion`
- [ ] Suporte a screen readers (NVDA, JAWS)

---

## 10. Design System (Tailwind Classes)

### Cores

```tailwind
Primary:     #1F2937 (deep blue/dark)
Accent:      #D4AF37 (gold subtle)
Success:     #10B981 (green)
Error:       #EF4444 (red)
Warning:     #F59E0B (orange)
Light BG:    #F9FAFB
Dark BG:     #1F2937

Gradients:
gradient-to-r from-primary to-accent
gradient-to-b from-white to-light
```

### Tipografia

```tailwind
H1: text-4xl font-bold (desktop) / text-2xl (mobile)
H2: text-3xl font-bold / text-xl
H3: text-2xl font-semibold / text-lg
Body: text-base leading-relaxed
Small: text-sm text-gray-600

Font family:
Primary: Inter (body)
Accent: Playfair Display (headings)
```

### Spacing

```tailwind
Container: max-w-6xl mx-auto px-4
Sections: py-16 (desktop) / py-8 (mobile)
Components: gap-4, gap-6, gap-8
```

---

## 11. Próximos Passos

1. **Aprovação de Componentes:** Feedback sobre estrutura
2. **Figma Design System:** Alinhamento visual
3. **Storybook Setup:** Documentação interativa de componentes
4. **Component Dev:** Começar por Layout (Header, Footer)

---

**Dúvidas?** Esta é uma proposta inicial. Componentes podem evoluir durante implementação.
