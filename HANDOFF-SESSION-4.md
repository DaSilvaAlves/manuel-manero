# HANDOFF — Sessão 4 → Sessão 5
**Data:** 21 Fev 2026 | **Prioridade:** ALTA

---

## 🎯 ESTADO ACTUAL (o que está funcional)

### Site Live
- **URL produção:** https://manuel-manero.vercel.app
- **Deployment protegido:** `dpl_8KMj9rJDjSWS6FdikwYr3m4hHcZN` (18 Fev 2026)
- **Status:** ✅ Online, impecável, igual ao que foi mostrado ao Manuel Manero

### O que o site tem (confirmado por screenshots)
- Logo M dourado + "MANUELMANERO" na navbar
- Foto real de Manuel Manero em palco como hero background
- "POSICIONAMENTO DE ELITE" badge + headline "Construa uma Marca Pessoal Milionária."
- AI Quiz (Diagnóstico AI - 3 perguntas)
- O Ecossistema (PRIME, MASTERY, Comunidade)
- Formulário de leads ("Pronto para Transformar a sua Marca?")
- Secção "Impacto Real" (stats + testimonials)
- AI Chat widget flutuante "Mentoria AI Manuel Manero"
- Botão "Começar Agora" (âmbar)

### Protecções aplicadas (NÃO REMOVER)
- `deploy-frontend` no GitHub Actions está **`if: false`** — Vercel NÃO auto-deploya
- Para fazer deploy manual: `vercel alias set [url-nova] manuel-manero.vercel.app`

---

## 🔴 TAREFA PRINCIPAL DA PRÓXIMA SESSÃO

### Objectivo: Sincronizar código-fonte completo para git

**O problema:** O código no git (`/site`) é uma versão INCOMPLETA. Faltam:
- Logo M dourado (SVG ou componente)
- Foto real de palco (URL ou ficheiro)
- Formulário de leads completo
- Possivelmente mais páginas (Sobre, Programas expandidos)

**A solução:** O utilizador tem o projecto a correr em **localhost**. Basta:
1. Pedir o caminho da pasta do localhost (ex: `C:\Users\XPS\alguma-pasta`)
2. Copiar todos os ficheiros para `/site` no repo
3. Commit + push (sem fazer deploy ao Vercel)

### Passos exactos:
```
1. Utilizador fornece caminho da pasta localhost
2. Claude faz: cp -r [caminho-localhost]/* /site/
3. git add site/ && git commit -m "feat: sync complete source from localhost"
4. git push (NÃO fazer vercel deploy)
5. Verificar build local: cd site && npm install && npm run dev
```

---

## 📁 ESTRUTURA DO REPO ACTUAL

```
manuel-manero/
├── apps/
│   ├── web/        # Next.js (NÃO É O SITE LIVE - ignorar)
│   └── api/        # Express backend (Railway)
├── site/           # ← FONTE DO SITE VITE (incompleta, actualizar)
│   ├── App.tsx           # Router: /, /sobre, /programas
│   ├── components/
│   │   ├── Layout.tsx    # Navbar + Footer
│   │   ├── AIChat.tsx    # Chat widget flutuante
│   │   └── AIQuiz.tsx    # Diagnóstico AI
│   ├── pages/
│   │   └── Home.tsx      # Página principal
│   ├── services/
│   │   └── gemini.ts     # API Gemini
│   ├── constants.tsx     # PROGRAMS, TESTIMONIALS, QUIZ_QUESTIONS
│   ├── index.html        # Tailwind CDN + Google Fonts
│   └── package.json      # Vite + React 19 + react-router-dom
├── .github/
│   └── workflows/
│       └── deploy.yml    # deploy-frontend: if: false (PROTEGIDO)
└── HANDOFF-SESSION-4.md  # Este ficheiro
```

---

## ⚙️ STACK TÉCNICA

| Componente | Tech | URL |
|-----------|------|-----|
| Frontend live | Vite + React 19 + TailwindCSS CDN | manuel-manero.vercel.app |
| AI Chat/Quiz | Google Gemini API | via NEXT_PUBLIC_GEMINI_API_KEY |
| Backend | Express + Prisma + PostgreSQL | railway.app |
| Hosting frontend | Vercel (free tier) | - |
| Hosting backend | Railway | manuel-manero-api.railway.app |
| Repo | GitHub | github.com/DaSilvaAlves/manuel-manero |

---

## 🔑 VARIÁVEIS DE AMBIENTE IMPORTANTES

```bash
# No .env.local do /site (NÃO commitar)
GEMINI_API_KEY=real-key-aqui  # Necessária para o AI Chat funcionar

# No Vercel (já configurado)
VERCEL_ORG_ID, VERCEL_PROJECT_ID, VERCEL_TOKEN
```
**Nota:** O AI Chat está a responder "Desculpe, estou em mentoria agora" porque a GEMINI_API_KEY não está definida no ambiente de produção. É uma funcionalidade para adicionar depois.

---

## 🚀 ACTIVAÇÃO AIOS PARA PRÓXIMA SESSÃO

Cole isto no início da nova janela:

```
@devops

Contexto da sessão anterior (HANDOFF-SESSION-4.md):

Projeto: Manuel Manero - Ecossistema UAU
Site live PROTEGIDO em: https://manuel-manero.vercel.app
Repo: C:\Users\XPS\Documents\manuel-manero

TAREFA: Sincronizar código-fonte completo do localhost para /site no git.

O utilizador vai fornecer o caminho da pasta do localhost.
O deploy-frontend está desactivado (if: false) - NÃO reactivar.
NÃO fazer vercel deploy - apenas commitar o código.

Aguardar o utilizador fornecer o caminho da pasta.
```

---

## ⚠️ REGRAS CRÍTICAS PARA PRÓXIMA SESSÃO

1. **NÃO fazer `vercel deploy --prod`** sem aprovação explícita do utilizador
2. **NÃO alterar `if: false`** no deploy.yml
3. **NÃO fazer `git push --force`** em nenhuma circunstância
4. **NÃO tocar em `apps/web/`** — é o Next.js legado, irrelevante para o site
5. **Apenas trabalhar em `/site/`** para o frontend

---

## 📋 BACKLOG PÓS-SINCRONIZAÇÃO

Após ter o código completo em git, as próximas tarefas são:

1. **Configurar Gemini API Key** no Vercel para o AI Chat funcionar
2. **Adicionar páginas** em falta (Comunidade, Escola)
3. **Melhorar formulário de leads** — integrar com ActiveCampaign/CRM
4. **Configurar domínio** `manuel-manero.com` → apontar para Vercel
5. **Setup deploy automático seguro** — branch `deploy` separada do `master`
