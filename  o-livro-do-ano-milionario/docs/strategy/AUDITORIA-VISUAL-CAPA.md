# Auditoria Visual — Capa vs Brandbook

**Data:** 21/03/2026
**Auditor:** Design Chief (routing: @marty-neumeier scope — brand identity alignment)
**Documento de referencia:** `BRANDBOOK-ESTRATEGICO.md`, seccao 11 — Marcas & Cores
**Artefacto auditado:** Capa fisica do livro "O Livro do Ano Milionario"

---

## 1 — Cores reais da capa (hex aproximados)

| Elemento | Cor real na capa | Hex aproximado | Notas |
|----------|-----------------|----------------|-------|
| Fundo principal | Betao/concreto cinzento claro | `#B8B0A8` a `#C8C0B8` | Textura mineral, nao cor solida |
| Faixa superior (gold leaf) | Dourado metalico com textura | `#C9A84C` a `#D4B050` | Folha de ouro real — nao flat |
| "&" decorativo | Cinzento escuro com sombra | `#4A4A50` a `#5A5A60` | Semi-transparente, cria profundidade |
| "O LIVRO DO" | Negro/escuro sobre fundo claro | `#1A1A1F` a `#2A2A30` | Contraste alto contra betao |
| "ANO MILIONARIO" | Gold metalico (dourado texturado) | `#C9A84C` a `#E8B94A` | Consistente com a faixa gold |
| Subtitulo | Branco | `#FFFFFF` a `#F5F0E8` | Sobre zona mais escura da capa |
| Nome do autor (topo) | Branco | `#FFFFFF` a `#F5F0E8` | Discreto, sobre faixa dourada |

---

## 2 — Texturas presentes na capa

| Textura | Localizacao | Efeito |
|---------|------------|--------|
| **Betao/concreto** | Fundo principal (~70% da area) | Material, terroso, autenticidade. Tons cinzento claro com variacao natural. |
| **Gold leaf (folha de ouro)** | Faixa horizontal no topo + texto "ANO MILIONARIO" | Metalico real, com reflexos e irregularidades proprias de folha de ouro. Premium tangivel. |
| **Sombra projectada** | "&" decorativo | Profundidade tridimensional, camadas visuais. |

---

## 3 — Discrepancias com o brandbook actual

### 3.1 — Discrepancias criticas

| # | Elemento | Brandbook define | Capa real mostra | Severidade |
|---|----------|-----------------|------------------|------------|
| D1 | **Fundo principal** | Onyx `#0A0A0F` (negro quase puro) | Betao cinzento claro `~#B8B0A8` | **CRITICA** |
| D2 | **Regra "Fundo SEMPRE escuro"** | "Onyx como base — nunca light mode" | Fundo e light (cinzento claro) | **CRITICA** |
| D3 | **Texto "O LIVRO DO"** | Ivory `#F5F0E8` (claro sobre escuro) | Negro/escuro `~#1A1A1F` (escuro sobre claro) | **ALTA** |
| D4 | **Materialidade** | Cores flat/solidas (digital-first) | Texturas fisicas (betao, gold leaf) | **MEDIA** |

### 3.2 — Elementos consistentes

| Elemento | Brandbook | Capa | Alinhamento |
|----------|-----------|------|-------------|
| Gold / dourado | `#C9A84C` | Gold leaf metalico (~`#C9A84C`) | Consistente (tom base identico) |
| Hierarquia tipografica | "ANO MILIONARIO" em destaque gold | Confirmado | Consistente |
| "&" decorativo | "Fundo, semi-transparente, profundidade" | Confirmado | Consistente |
| Nome do autor | "Topo, branco, discreto" | Confirmado | Consistente |
| Gold como acento (nao fundo) | "Gold e SEMPRE acento" | Faixa e acento, nao fundo | Consistente |

---

## 4 — Analise da raiz da discrepancia

A discrepancia nao e um erro — e uma **divergencia de meio**.

O brandbook foi construido com orientacao digital-first (landing pages, redes sociais, emails), onde o fundo escuro Onyx cria premium visual em ecra. A capa fisica, por sua vez, utiliza uma linguagem material (betao + gold leaf) que comunica a mesma mensagem de premium e autenticidade, mas atraves de tacto e textura em vez de luminosidade e contraste de ecra.

**Ambas as abordagens transmitem o mesmo posicionamento:**
- Premium, nao generico
- Materiais reais, nao plastico
- Profundidade e camadas
- Gold como acento de autoridade

A diferenca esta no **canal**, nao na **intencao**.

---

## 5 — Recomendacao

### Recomendacao: Manter ambas as versoes com regras claras de aplicacao

**Justificacao:** Forcar a capa fisica a ser escura (tipo Onyx) produziria um objecto visualmente pesado e pouco diferenciado em estante de livraria. Forcar o digital a adoptar o betao claro perderia o impacto premium que o fundo escuro gera em ecra. A solucao correcta e **formalizar duas paletas contextuais** dentro do mesmo brandbook.

### 5.1 — Paleta DIGITAL (manter como esta)

| Contexto | Fundo | Texto principal | Acento |
|----------|-------|-----------------|--------|
| Landing page | Onyx `#0A0A0F` | Ivory `#F5F0E8` | Gold `#C9A84C` |
| Redes sociais | Onyx `#0A0A0F` | Ivory `#F5F0E8` | Gold + Amber |
| Email marketing | Charcoal `#1A1A24` | Ivory `#F5F0E8` | Gold |
| Apresentacoes | Onyx `#0A0A0F` | Ivory `#F5F0E8` | Gold |

**Regra:** Toda peca digital usa fundo escuro. Sem excepcoes.

### 5.2 — Paleta FISICA (nova — a formalizar)

| Contexto | Fundo | Texto principal | Acento |
|----------|-------|-----------------|--------|
| Capa do livro | Betao `~#B8B0A8` (textura) | Negro `~#1A1A1F` | Gold leaf (metalico real) |
| Contra-capa | Betao `~#B8B0A8` (textura) | Negro `~#1A1A1F` | Gold leaf |
| Press kit (PDF impresso) | Ivory `#F5F0E8` | Charcoal `#1A1A24` | Gold `#C9A84C` |
| Business card | Frente: Betao ou Onyx / Verso: Gold leaf | Ivory ou Negro | Gold foil |
| Stand Feira do Livro | Betao ou Onyx (conforme dimensao) | Ivory `#F5F0E8` | Gold (iluminacao) |
| Marcadores / bookmarks | Betao `~#B8B0A8` | Negro `~#1A1A1F` | Gold foil |

**Regra:** Pecas fisicas podem usar a paleta clara (betao/ivory) quando a materialidade (textura, foil, relevo) compensa a ausencia de fundo escuro.

### 5.3 — Regras de decisao: quando usar cada paleta

| Pergunta | Se SIM | Se NAO |
|----------|--------|--------|
| A peca e digital (ecra)? | Paleta DIGITAL (escura) | Continuar abaixo |
| A peca e fisica com textura/material? | Paleta FISICA (clara) | Paleta DIGITAL (escura) |
| A peca e PDF para impressao? | Paleta FISICA (clara — press kit) | Paleta DIGITAL |
| A peca e fotografia de produto (mockup digital)? | Paleta DIGITAL | — |

### 5.4 — Elemento unificador entre paletas

O **Gold** (`#C9A84C` / gold leaf fisico) e o elemento que unifica ambas as paletas. Independentemente do fundo ser escuro ou claro, o dourado esta sempre presente como acento premium. Este e o fio condutor da marca.

---

## 6 — Accoes recomendadas

| # | Accao | Prioridade | Responsavel |
|---|-------|------------|-------------|
| A1 | Adicionar seccao "Paleta Fisica" ao brandbook (seccao 11) | Alta | Design Chief |
| A2 | Adicionar cores de betao (`~#B8B0A8`) e negro de texto (`~#1A1A1F`) a paleta secundaria | Alta | Design Chief |
| A3 | Reformular regra "Fundo SEMPRE escuro" para "Fundo SEMPRE escuro em digital" | Alta | Design Chief |
| A4 | Adicionar regras de decisao (5.3) ao brandbook | Media | Design Chief |
| A5 | Documentar texturas aprovadas (betao, gold leaf) na seccao de identidade visual | Media | Design Chief |
| A6 | Validar que mockups digitais do livro usam a paleta digital (nao a fisica) | Baixa | QA visual |

---

## 7 — Conclusao

A capa do livro nao contradiz a marca — expressa-a num meio diferente. O brandbook actual tem uma lacuna: assume que todas as pecas sao digitais. A formalizacao da paleta fisica resolve a discrepancia sem enfraquecer nenhuma das duas abordagens.

O Gold permanece como ancora visual transversal. A textura de betao na capa e uma decisao de design forte e correcta para o meio fisico — transmite autenticidade e materialidade que um fundo Onyx em papel nao conseguiria.

**Veredicto:** Reconciliar via expansao do brandbook (adicionar paleta fisica), nao via alteracao da capa nem da paleta digital.

---

*Auditoria concluida. Nenhuma alteracao feita ao brandbook. Este documento serve como base para a actualizacao futura da seccao 11.*
