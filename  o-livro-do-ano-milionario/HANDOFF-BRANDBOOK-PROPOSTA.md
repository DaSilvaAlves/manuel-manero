# HANDOFF — Brandbook & Proposta para Deploy Online

**Data:** 21/03/2026
**Sessão:** Brandbook Estratégico + Proposta Comercial + 9 Entregáveis Completos
**Agente QA:** Quinn (revisão e orquestração)
**Agentes executores:** copy-chief (×5), design-chief, @analyst, @dev (designer)
**Estado:** TUDO PRODUZIDO — pronto para deploy online e envio ao Manuel
**Branch:** `master`
**Pasta de trabalho:** `C:\Users\XPS\Documents\manuel-manero\ o-livro-do-ano-milionario`

---

## 1. O QUE FOI FEITO NESTA SESSÃO

### 1.1 Entregáveis Produzidos (9 documentos + 3 HTML)

| # | Entregável | Ficheiro | Tamanho | Estado |
|---|-----------|---------|---------|--------|
| 1 | Brandbook Estratégico (16 secções) | `docs/strategy/BRANDBOOK-ESTRATEGICO.md` | 76 KB | Concluído + acentuado |
| 2 | Auditoria Visual Capa | `docs/strategy/AUDITORIA-VISUAL-CAPA.md` | 8 KB | Concluído |
| 3 | Pesquisa 11 Pilares | `docs/research/11-pilares-research.md` | 10 KB | Concluído (precisa input do Manuel) |
| 4 | Pesquisa Tendências 2026 | `docs/research/book-launch-trends-2026.md` | 26 KB | Concluído (sessão anterior) |
| 5 | Copy de Lançamento (10 peças) | `docs/copy/COPY-LANCAMENTO.md` | 28 KB | Concluído |
| 6 | Calendário Social 60 Dias | `docs/social/SOCIAL-CALENDAR-60D.md` | 40 KB | Concluído |
| 7 | Email Sequences (29 emails) | `docs/emails/EMAIL-SEQUENCES.md` | 64 KB | Concluído |
| 8 | Playbook Feira do Livro | `docs/launch/LAUNCH-PLAYBOOK-FLL2026.md` | 48 KB | Concluído |
| 9 | Ad Campaigns (Meta + Google) | `docs/ads/AD-CAMPAIGNS.md` | 64 KB | Concluído |
| 10 | Proposta Comercial v1 | `docs/proposal/PROPOSTA-COMERCIAL.md` | 25 KB | Substituída pela v2 |
| 11 | Proposta Comercial v2 (sem preços) | `docs/proposal/PROPOSTA-COMERCIAL-V2.md` | 31 KB | ACTIVA — usar esta |

### 1.2 Ficheiros HTML para Apresentação (prontos para deploy)

| Ficheiro | O que é | Tamanho | Para Quem |
|----------|---------|---------|-----------|
| `docs/BRANDBOOK-V2.html` | Brandbook visual interactivo — 16 secções com componentes visuais live (swatches, tipografia, glassmorphism, botões, ícones) | 119 KB | Manuel + Portfolio |
| `docs/PROPOSTA-V2.html` | Proposta comercial standalone — sem preços, com acentuação, convida a reunião | 36 KB | Manuel |
| `docs/PORTFOLIO-VIEWER.html` | Viewer de todos os 9 docs com sidebar de navegação | 457 KB | Interno / Portfolio |

### 1.3 Build Scripts (para reconstruir os HTML)

| Script | Função | Comando |
|--------|--------|---------|
| `docs/build-brandbook-v2.js` | Gera `BRANDBOOK-V2.html` a partir do markdown | `node docs/build-brandbook-v2.js` |
| `docs/build-brandbook.js` | Gera versão anterior (v1) — obsoleto | — |

---

## 2. O QUE ENVIAR AO MANUEL

### 2.1 Ordem de Apresentação Recomendada

| Passo | O que enviar | Formato | Objectivo |
|-------|-------------|---------|-----------|
| **1** | Brandbook (BRANDBOOK-V2.html) | Link URL (após deploy) | Impressionar — mostrar o nível do trabalho |
| **2** | Proposta (PROPOSTA-V2.html) | Link URL (após deploy) | Criar desejo — sem revelar preço |
| **3** | Reunião de kickoff | Agendar (WhatsApp/email) | Discutir nível de serviço + preços |

### 2.2 Mensagem Sugerida para o Manuel

```
Manuel,

Preparámos dois documentos para ti sobre o lançamento de "O Livro do Ano Milionário":

1. Brandbook Estratégico — a identidade completa do livro (manifesto, posicionamento, BrandScript, identidade visual, componentes):
[URL do Brandbook]

2. Proposta de Serviços — o que podemos construir juntos para a Feira do Livro:
[URL da Proposta]

Quando tiveres oportunidade de ver, agendamos 30 minutos para alinhar o próximo passo.

Abraço,
[Nome]
```

### 2.3 Estratégia de Preço (IMPORTANTE)

A proposta v2 NÃO tem preços. Isto é intencional:
- O Manuel vê o que podemos fazer (3 níveis de serviço)
- Fica impressionado com o nível de detalhe
- Pergunta "quanto custa?"
- Aí sim apresentamos os valores numa reunião

**Valores de referência (NÃO enviar ao Manuel — usar na reunião):**

| Nível | Faixa | Inclui |
|-------|-------|--------|
| 1 — Fundação | 1.500 — 2.500 EUR | 5 entregáveis, 3 semanas |
| 2 — Amplificação (recomendado) | 3.500 — 5.000 EUR | 11 entregáveis, 5 semanas |
| 3 — Inédito | 7.500 — 12.000 EUR | 17 entregáveis, 8 semanas |

Estes valores estão guardados em `docs/proposal/PROPOSTA-COMERCIAL.md` (v1, com preços).

---

## 3. COMO COLOCAR ONLINE

### Opção A: Deploy no Vercel (recomendado — mais rápido)

Os ficheiros HTML são standalone — basta fazer deploy estático.

```bash
# 1. Criar directório de deploy
mkdir -p deploy-brandbook
cp docs/BRANDBOOK-V2.html deploy-brandbook/index.html

# 2. Deploy com Vercel CLI
cd deploy-brandbook
npx vercel --prod

# 3. Repetir para a proposta
mkdir -p deploy-proposta
cp docs/PROPOSTA-V2.html deploy-proposta/index.html
cd deploy-proposta
npx vercel --prod
```

**Resultado:** 2 URLs tipo:
- `https://brandbook-olam.vercel.app`
- `https://proposta-olam.vercel.app`

### Opção B: Deploy numa única página com subpaths

```bash
# 1. Criar directório de deploy com ambos
mkdir -p deploy-olam
cp docs/BRANDBOOK-V2.html deploy-olam/brandbook.html
cp docs/PROPOSTA-V2.html deploy-olam/proposta.html

# Criar index.html como redirect para brandbook
echo '<meta http-equiv="refresh" content="0;url=brandbook.html">' > deploy-olam/index.html

# 2. Deploy
cd deploy-olam
npx vercel --prod
```

**Resultado:** 1 URL com 2 páginas:
- `https://olam-launch.vercel.app/brandbook.html`
- `https://olam-launch.vercel.app/proposta.html`

### Opção C: GitHub Pages

```bash
# 1. Criar repo
gh repo create olam-brandbook --public --clone
cd olam-brandbook

# 2. Copiar ficheiros
cp ../docs/BRANDBOOK-V2.html index.html
cp ../docs/PROPOSTA-V2.html proposta.html

# 3. Push e activar Pages
git add . && git commit -m "feat: brandbook + proposta OLAM"
git push
gh repo edit --enable-pages --pages-branch main
```

### Opção D: Enviar directamente por email (sem deploy)

Se a urgência for máxima, os ficheiros HTML abrem directamente no browser:
- Enviar `BRANDBOOK-V2.html` e `PROPOSTA-V2.html` como anexos
- O Manuel abre no browser — funciona offline, sem servidor

---

## 4. COMO RETOMAR NOUTRO TERMINAL

### 4.1 Comando de Retoma

```
Retoma o projecto "O Livro do Ano Milionário" de Manuel Manero.
Pasta de trabalho: C:\Users\XPS\Documents\manuel-manero\ o-livro-do-ano-milionario
Lê o HANDOFF-BRANDBOOK-PROPOSTA.md para contexto completo.

Estado: 9 entregáveis COMPLETOS + Brandbook HTML + Proposta HTML.
Próximo passo: deploy online (Vercel ou GitHub Pages) e envio ao Manuel.

Os ficheiros prontos para deploy são:
- docs/BRANDBOOK-V2.html (brandbook visual interactivo)
- docs/PROPOSTA-V2.html (proposta sem preços)

Opções de deploy: ver secção 3 do HANDOFF.
```

### 4.2 Para fazer deploy com @devops

```
@devops

Deploy estático de 2 ficheiros HTML para Vercel:
- docs/BRANDBOOK-V2.html → brandbook-olam.vercel.app
- docs/PROPOSTA-V2.html → proposta-olam.vercel.app

São ficheiros standalone (HTML + CSS + JS inline). Não têm dependências.
Pasta: C:\Users\XPS\Documents\manuel-manero\ o-livro-do-ano-milionario\docs\
```

### 4.3 Para reconstruir o Brandbook HTML (se editar o markdown)

```bash
cd "C:\Users\XPS\Documents\manuel-manero\ o-livro-do-ano-milionario\docs"
node build-brandbook-v2.js
```

Isto lê `strategy/BRANDBOOK-ESTRATEGICO.md` e gera `BRANDBOOK-V2.html`.

---

## 5. PENDÊNCIAS QUE DEPENDEM DO MANUEL

| Pendência | Impacto | Como Resolver |
|-----------|---------|---------------|
| **Nomes dos 11 pilares** | Brandbook secção 15 (ícones) tem placeholders I-XI sem nomes | Perguntar directamente ao Manuel |
| **"365 minutos" na capa vs "366 inspirações"** | Discrepância — o subtítulo da capa diz 365, o livro tem 366 | Confirmar com o Manuel se é intencional |
| **Foto profissional do autor** | Necessária para press kit, landing page, proposta | Pedir ao Manuel foto alta resolução |
| **URL de pré-venda** | Necessário para CTAs da landing page e emails | Definir com Manuel (Stripe/Hotmart) |
| **Nível de serviço escolhido** | Define o escopo de execução | Após apresentação da proposta |

---

## 6. ESTRUTURA DE PASTAS ACTUAL

```
o-livro-do-ano-milionario/
├── HANDOFF.md                              # Handoff original (sessão anterior)
├── HANDOFF-BRANDBOOK-PROPOSTA.md           # ESTE FICHEIRO
├── capa.png                                # Capa do livro (620×861px)
├── O livro do ano milionário.txt           # Sinopse do autor
├── docs/
│   ├── BRANDBOOK-V2.html                   # ★ DEPLOY — Brandbook visual (119 KB)
│   ├── PROPOSTA-V2.html                    # ★ DEPLOY — Proposta sem preços (36 KB)
│   ├── PORTFOLIO-VIEWER.html               # Viewer de todos os docs (457 KB)
│   ├── build-brandbook-v2.js               # Script de build do Brandbook HTML
│   ├── build-brandbook.js                  # Script v1 (obsoleto)
│   ├── viewer.html                         # Viewer v1 (obsoleto)
│   ├── strategy/
│   │   ├── BRANDBOOK-ESTRATEGICO.md        # Brandbook fonte (76 KB, acentuado)
│   │   └── AUDITORIA-VISUAL-CAPA.md        # Auditoria capa vs paleta digital
│   ├── research/
│   │   ├── book-launch-trends-2026.md      # 28 tendências, 9 inéditas em PT
│   │   └── 11-pilares-research.md          # Pesquisa dos pilares (incompleta)
│   ├── copy/
│   │   └── COPY-LANCAMENTO.md              # 10 peças de copy completas
│   ├── social/
│   │   └── SOCIAL-CALENDAR-60D.md          # 60 dias de conteúdo (4 redes)
│   ├── emails/
│   │   └── EMAIL-SEQUENCES.md              # 29 emails (4 sequências)
│   ├── launch/
│   │   └── LAUNCH-PLAYBOOK-FLL2026.md      # Playbook Feira (dia a dia, 70+ checklists)
│   ├── ads/
│   │   └── AD-CAMPAIGNS.md                 # Meta Ads + Google Ads (10+5+9 criativos)
│   └── proposal/
│       ├── PROPOSTA-COMERCIAL-V2.md         # ★ ACTIVA — sem preços, acentuada
│       └── PROPOSTA-COMERCIAL.md            # v1 com preços (referência interna)
└── .claude/
    └── settings.local.json
```

---

## 7. NÚMEROS DA SESSÃO

| Métrica | Valor |
|---------|-------|
| Agentes lançados | 12 (copy-chief ×5, design-chief ×1, @analyst ×1, @dev ×1, designer ×1, + QA) |
| Documentos produzidos | 11 ficheiros markdown |
| HTML gerados | 3 (Brandbook, Proposta, Portfolio Viewer) |
| Headlines geradas | 10+ variantes |
| Emails completos | 29 (prontos a enviar) |
| Dias de conteúdo social | 60 dias mapeados |
| Criativos de anúncios | 24 (10 Meta + 5 Google + 9 retargeting) |
| Checklists de tarefas | 70+ items com datas |
| Orçamentos calculados | 3 cenários com ROI |
| Total de conteúdo produzido | ~424 KB de markdown + 612 KB de HTML |

---

## 8. DECISÕES TOMADAS NESTA SESSÃO

| Decisão | Razão | Quem Decidiu |
|---------|-------|-------------|
| Remover preços da proposta | O Manuel é mentor de vendas — apresentar valor antes de preço | Utilizador |
| Manter "365 minutos" como está | É o texto real da capa — não é erro nosso para corrigir | Utilizador |
| Brandbook documenta o que É | Não propor alterações à capa ou ao livro — não é da nossa competência | Utilizador |
| Nível 2 recomendado | Equilíbrio entre ambição e praticabilidade com 67 dias de prazo | Copy-chief |
| Paleta digital ≠ capa física | A capa tem fundo betão; o digital usa Onyx — são contextos diferentes | Design-chief |
| Truelines como cards gold | As 7 truelines são o elemento central de diferenciação verbal | Copy-chief |

---

## 9. PRÓXIMOS PASSOS (por ordem de prioridade)

| # | Acção | Agente | Urgência |
|---|-------|--------|----------|
| 1 | **Deploy BRANDBOOK-V2.html e PROPOSTA-V2.html online** | `@devops` | IMEDIATO |
| 2 | **Enviar links ao Manuel** | Utilizador (manual) | IMEDIATO |
| 3 | **Agendar reunião de kickoff** | Utilizador (manual) | Após resposta do Manuel |
| 4 | **Obter os 11 pilares do Manuel** | Utilizador (perguntar) | Antes da execução |
| 5 | **Obter foto profissional** | Utilizador (pedir ao Manuel) | Antes do press kit |
| 6 | **Definir URL de pré-venda** | `@dev` + Manuel | Antes da landing page |
| 7 | **Iniciar execução Fase 2** | Conforme nível escolhido | Após aprovação |

---

*HANDOFF criado por Quinn (QA) — 21/03/2026*
*Próximo passo: deploy online → enviar ao Manuel → agendar reunião*
