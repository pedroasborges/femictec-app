# FEMICTEC App - Resumo Executivo

## 1) Objetivo
Portal institucional da FEMICTEC com conteudo dinamico, noticias, eventos, galeria por edicao e canal de contato com envio de email.

## 2) Escopo atual

- Home institucional.
- Modulo `A FEMICTEC`:
  - `/femictec`
  - `/femictec/quem-realiza`
  - `/femictec/historico`
- Modulo `A FEIRA`:
  - `/feira`
  - `/feira/cronograma`
  - `/feira/programacao`
- Modulo `Eventos da Feira`:
  - `/eventos-da-feira`
  - `/eventos-da-feira/[slug]`
- Modulo `Noticias`:
  - `/noticias`
  - `/noticias/[id]`
- Paginas institucionais:
  - `/regulamentos`
  - `/contato`
  - `/localizacao`
  - `/politica-de-privacidade`
  - `/galeria`
  - `/galeria/[slug]`

## 3) Arquitetura

- Front-end: Next.js 16 + React 19 + TypeScript + Tailwind.
- CMS: Strapi (REST).
- Padrao:
  - leitura server-side com normalizacao e fallback;
  - envio de contato por rota interna Next (`POST /api/contato`) com SMTP.

## 4) Integracoes principais

- Conteudo: `femictec`, `feira`, `eventos-feiras`, `noticias`, `regulamento`, `contato`, `footer`, `localizacao`, `politica-de-privacidade`, `edicao-galerias`.
- Email de contato:
  - leitura de configuracao do Strapi (`/api/contato`);
  - envio SMTP para equipe institucional e confirmacao ao usuario.

## 5) Fluxo de contato (estado atual)

1. Usuario envia nome, email, assunto e mensagem.
2. Next valida dados.
3. Next busca templates e destinatarios no Strapi (`contato`).
4. Next envia email institucional + confirmacao ao usuario com copia da mensagem.

Observacao:
- Fluxo atual nao usa protocolo em `mensagens-contatos` nem upload de anexo.

## 6) Dependencias operacionais

- Strapi com permissoes `Public` de leitura para os content-types usados.
- SMTP configurado no ambiente Next:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.
- Base URL do Strapi:
  - `STRAPI_BASE_URL` (ou `NEXT_PUBLIC_STRAPI_BASE_URL`).

## 7) Documentacao

- `README.md`
- `STRAPI_FEMICTEC_SETUP.md`
- `STRAPI_FEIRA_SETUP.md`
- `STRAPI_REGULAMENTOS_CONTATO_SETUP.md`
- `STRAPI_POLITICA_PRIVACIDADE_SETUP.md`
- `STRAPI_GALERIA_SETUP.md`
- `STRAPI_CONTATO_TEMPLATES.md`
