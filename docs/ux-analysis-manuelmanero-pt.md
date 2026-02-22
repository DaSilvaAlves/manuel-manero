# Análise UX — manuelmanero.pt
**Data:** 21 Fev 2026 | **Agente:** @ux-design-expert (Uma)
**Objectivo:** Documentar estrutura completa para construir versão premium no `/site`

---

## 1. ESTRUTURA DE PÁGINAS

### Navegação Principal (6 itens)
1. Página inicial — home
2. Livros — venda de livros
3. New$letter — subscrição newsletter
4. Testemunhos — página de provas sociais
5. Escola — Escola de Empreendedorismo Digital
6. Contactos — formulário + dados de contacto

### Ecossistema externo (fora do domínio principal)
- Mentoria Privada → subscribepage.io/mentoriaprivada
- Personal Branding MASTERY → personalbrandingmastery.pt (WordPress+Elementor)
- Comunidade Milionária → comunidademilionaria.pt
- Programa de Mentoria Premium → Google Sites
- Sobre Mim → Google Sites

---

## 2. ESTRUTURA DA HOME (ordem top → bottom)

| # | Secção | Conteúdo | Propósito |
|---|--------|----------|-----------|
| 1 | Banner sticky topo | "Programa de Mentoria PREMIUM" + link | Captura imediata |
| 2 | Navbar | Logo + 6 links + hamburger mobile | Navegação |
| 3 | Hero | Foto Manuel em palco + overlay escuro + H1 + CTA | Identificação/autoridade |
| 4 | Sobre Manuel | Biografia, 15+ anos, credenciais, Método PRIME® | Credibilidade |
| 5 | "QUE SOLUÇÕES TENHO PARA TI" | Grid 4 cards de serviços | Conversão |
| 6 | Frase de filosofia | "Marcas pessoais constroem-se com estratégia" | Reforço de valor |
| 7 | Escola de Empreendedorismo | CTA "QUERO ENTRAR NA ESCOLA >" | Upsell educação |
| 8 | "Vamos trabalhar Juntos?" | Formulário de contacto Google Forms | Lead capture |
| 9 | Footer | Redes sociais (5) + copyright + legal | Confiança |

### Headline Hero (texto exacto)
> "Ajudo empreendedores a construir uma ™️ Presença forte no mercado, 📣 Comunicar com Impacto e ter 💲Resultados em escala através do Método PRIME®️"

### Grid de Soluções (4 cards)
1. **Mentoria Privada** — "Acelera resultados num ambiente privado e focado"
2. **Personal Branding MASTERY** — "Cria a tua marca pessoal e o teu legado"
3. **Comunidade Milionária** — "Um ecossistema para criar uma marca pessoal milionária"
4. **Programa de Mentoria Premium** — Transformar conhecimento em riqueza

### Fluxo de Conversão
```
Hero (quem sou + método PRIME)
→ Credibilidade (sobre + 15 anos)
→ Soluções (4 cards com CTAs)
→ Filosofia (reforço da proposta)
→ Acção final (contacto / escola)
→ Newsletter (follow-up)
```

---

## 3. PALETA DE CORES

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **Ouro/Amarelo** | `#FFD54F` | rgb(255,213,79) | CTA principal, botões, destaques |
| **Roxo escuro** | `#4F474E` | rgb(79,71,78) | Banner topo, backgrounds escuros |
| **Cinza escuro** | `#212121` | rgb(33,33,33) | Texto principal, headings |
| **Quase preto** | `#2B2A2A` | rgb(43,42,42) | Backgrounds, footer escuro |
| **Vermelho** | `#D92528` | rgb(217,37,40) | Comunidade, urgência, CTAs secundários |
| **Vermelho hover** | `#ED4E51` | rgb(237,78,81) | Hover state do vermelho |
| **Branco** | `#FFFFFF` | rgb(255,255,255) | Fundo principal |
| **Creme claro** | `#F5F2F0` | rgb(245,242,240) | Fundo alternativo de secções |
| **Creme alternativo** | `#F1EEE4` | rgb(241,238,228) | Variante quente |
| **Cinza claro** | `#F6F6F6` | rgb(246,246,246) | Background Comunidade |
| **Cinza médio** | `#666666` | rgb(102,102,102) | Texto secundário, nav |
| **Cinza borda** | `#CCCCCC` | rgb(204,204,204) | Bordas de cards, divisores |
| **Overlay escuro** | `rgba(0,0,0,0.5)` | — | Overlay sobre imagens hero |

---

## 4. TIPOGRAFIA

### Famílias usadas
| Font | Tipo | Pesos | Plataforma |
|------|------|-------|-----------|
| **Roboto Condensed** | Sans-serif condensado | 400, 700 | Site principal |
| **Open Sans** | Sans-serif geométrico | 400, 700 | Site principal (body) |
| **Poppins** | Sans-serif arredondado | 400, 600, 700 | Comunidade, Mentoria Privada |
| **Roboto** | Sans-serif moderno | 100, 300, 400, 700 | Escola |

### Hierarquia tipográfica
| Nível | Font | Tamanho Desktop | Tamanho Mobile | Peso | Cor |
|-------|------|----------------|---------------|------|-----|
| H1 Hero | Roboto Condensed | 63pt | 28pt | 700 | Branco |
| H2 Secções | Roboto Condensed | 28–40pt | 20–24pt | 700 | `#212121` |
| H3 Cards | Open Sans | 15–20pt | 14–16pt | 700 | `#212121` |
| Body | Open Sans | 14–16pt | 13–14pt | 400 | `#212121` |
| Small | Open Sans | 12–13pt | 11–12pt | 400 | `#666666` |
| Botões | Open Sans / Roboto Cond. | 14–18pt | 14pt | 700 | Dark ou White |

### Características tipográficas premium
- Line-height: 1.5–1.55 para body text
- Letter-spacing: ligeiramente aumentado em headings uppercase
- Roboto Condensed cria feel sofisticado/streamlined nos títulos
- Uppercase em CTAs e headings de secção

---

## 5. COMPONENTES (Atomic Design)

### Atoms
- **Botão primário:** fundo `#FFD54F`, texto `#212121`, border-radius 5–10px, padding 10–15px/25–40px
- **Botão secundário (pill):** fundo `#D92528`, texto branco, border-radius 30px, padding 12–15px/40–50px
- **Input email:** Open Sans 14pt, border light
- **Ícone social:** 24–32px, 5 plataformas (Instagram, Facebook, LinkedIn, YouTube, Spotify)
- **Divider:** background change + padding 40–60px

### Molecules
- **Service card:** imagem + H3 + descrição + botão "SABER MAIS"
- **Book card:** capa + título + preço €16 + descrição + "COMPRAR >"
- **Benefit item:** ícone/emoji + texto 14pt
- **Testimonial item:** imagem quadrada com conteúdo embebido
- **Form field:** label + input + submit

### Organisms
- **Navbar:** logo + 6 links + hamburger (sticky, fundo branco/transparente)
- **Hero section:** imagem fundo + overlay 50% black + H1 + subtítulo + CTA
- **Solutions grid:** 4 colunas → 2 tablet → 1 mobile
- **Testimonials grid:** 8–9 itens, 4 colunas desktop
- **Contact section:** H2 + parágrafo + botão formulário
- **Footer:** social icons + copyright + links legais

---

## 6. CTAs — INVENTÁRIO COMPLETO

| # | Texto | Destino | Cor fundo | Cor texto | Página |
|---|-------|---------|-----------|-----------|--------|
| 1 | New$letter Milionária | comunidademilionaria.pt/newsletter | `#FFD54F` | `#212121` | Home hero |
| 2 | SABER MAIS (Mentoria Privada) | subscribepage.io/mentoriaprivada | `#FFD54F` | `#212121` | Grid soluções |
| 3 | SABER MAIS (PB MASTERY) | personalbrandingmastery.pt | `#FFD54F` | `#212121` | Grid soluções |
| 4 | SABER MAIS (Comunidade) | comunidademilionaria.pt | `#FFD54F` | `#212121` | Grid soluções |
| 5 | QUERO ENTRAR NA ESCOLA > | Google Sites escola | `#FFD54F` | `#212121` | Mid-page |
| 6 | FORMULÁRIO DE CONTACTO > | Google Forms | `#FFD54F` | `#212121` | Bottom section |
| 7 | QUERO CANDIDATAR-ME | Google Form / Hotmart | Dark/Contrast | Branco | PB MASTERY |
| 8 | Quero entrar na Comunidade MILIONÁRIA! | Hotmart pagamento | `#D92528` | Branco | Comunidade |
| 9 | Quero saber mais sobre a Mentoria Privada | Google Form | `#D92528` | Branco | Mentoria Privada |
| 10 | COMPRAR > | Pagamento manual | `#FFD54F` | `#212121` | Livros |
| 11 | SUBSCREVE AQUI O MINUTO MILIONÁRIO | Email subscription | `#FFD54F` | `#212121` | Contactos/footer |

---

## 7. FORMULÁRIOS

| Form | Plataforma | Campos principais | Destino |
|------|-----------|-------------------|---------|
| Contacto geral | Google Forms | Nome, email, mensagem | Lead capture |
| Newsletter | MailerLite | Email (+ nome opcional) | Lista email |
| PB MASTERY candidatura | Google Forms | Nome, email, tel, goals, background | Qualificação |
| Mentoria Privada | Google Forms | Nome, email, tel, objetivos | Consulta |
| Comunidade | MailerLite | Email | Lista email |
| Escola/enrollment | Hotmart | Checkout completo | Pagamento |

---

## 8. PROVAS SOCIAIS (Social Proof)

| Tipo | Detalhe | Impacto |
|------|---------|---------|
| Testemunhos | Página dedicada, 8–9 imagens | Alto |
| Anos de experiência | "15+ anos" | Autoridade |
| Limite de vagas | "24 participantes" PB MASTERY | Escassez |
| Arquivo de lives | "200+ gravações" Instagram | Actividade |
| Credenciais académicas | Licenciatura + Pós-grad + Mestrado | Credibilidade |
| Professor | Portugal Tourism School + Cruz Vermelha | Terceiros |
| Autor | 3 livros publicados | Autoridade |
| Contador regressivo | Comunidade Milionária | Urgência |
| Multi-plataforma | 5 redes sociais activas | Presença |
| Podcast Spotify | Show activo | Alcance |

---

## 9. MÉTODO PRIME® — ESTRUTURA DO CONTEÚDO

| Letra | Significado |
|-------|------------|
| **P** | Presença (forte no mercado) |
| **R** | Resultados (em escala) |
| **I** | Impacto (comunicação) |
| **M** | Método (estratégia) |
| **E** | Escala (crescimento) |

---

## 10. STACK TECNOLÓGICA (referência)

| Componente | Tech | Nota |
|-----------|------|------|
| Site principal | Google Sites | Limitado em customização |
| Programas (PB MASTERY, Comunidade) | WordPress + Elementor | Mais flexível |
| Landing pages | SubscribePage.io | Lead gen focado |
| Email | MailerLite | Newsletter semanal |
| Pagamentos | Hotmart + MB WAY + Transfer | PT + BR |
| Analytics | Google Analytics + Heatmaps | Tracking activo |
| Performance | WP Rocket (WordPress) | Lazy loading |

---

## 11. O QUE CRIAR NA VERSÃO PREMIUM

### Manter da versão actual
- Paleta ouro/dark — funciona, identidade estabelecida
- Método PRIME® como framework central
- Grid de 4 soluções
- Secção de testemunhos
- Formulário de contacto
- Social proof (anos, credenciais, livros)

### Elevar para premium
| Elemento | Versão actual | Versão premium |
|----------|--------------|----------------|
| Plataforma | Google Sites | Vite + React (controlo total) |
| Hero | Overlay básico + H1 | Cinematográfico, tipografia editorial, parallax |
| Ouro | `#FFD54F` flat | Gradiente metálico, texturas douradas |
| Tipografia hero | Roboto Condensed | Mistura serif premium + sans |
| Espaçamento | Comprimido | Whitespace generoso, secções respiradas |
| Botões | Rectangulares básicos | Design system consistente + micro-animações |
| Cards | Shadows básicos | Glassmorphism, hover animado, imagens cinematográficas |
| Navbar | Google Sites default | Glassmorphism, scroll behavior, transições suaves |
| Social proof | Imagens estáticas | Contadores animados, video testimonials |
| Footer | Minimalista | Mais completo, newsletter integrada |
| Mobile | Responsivo básico | Mobile-first, experiência premium em todos os ecrãs |

---

## 12. BREAKPOINTS

| Breakpoint | Largura | Colunas grid |
|-----------|---------|-------------|
| Mobile | ≤479px | 1 coluna |
| Tablet small | 480–767px | 2 colunas |
| Tablet | 768–1279px | 3 colunas |
| Desktop | ≥1280px | 4 colunas |

---

*Análise efectuada por @ux-design-expert (Uma) — 21 Fev 2026*
*Próximo passo: chamar @architect com este documento para planear a versão premium*
