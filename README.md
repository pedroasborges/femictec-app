# FEMICTEC App

Front-end institucional da FEMICTEC em Next.js, com conteudo dinamico via Strapi.

## Visao geral

O projeto entrega:
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

## Stack

- Next.js 16.1.7 (App Router)
- React 19.2.3
- TypeScript
- Tailwind CSS v4
- Strapi (REST)

## Integracao com Strapi

Endpoints principais:
- `/api/banners?populate=*`
- `/api/footer`
- `/api/femictec?populate=deep,5` (com fallbacks)
- `/api/feira?...` (com populate aninhado e fallbacks)
- `/api/eventos-feiras?populate=*` (compatibilidade com `/api/eventos-da-feira`)
- `/api/noticias`
- `/api/regulamento?populate=*`
- `/api/contato?populate=*`
- `/api/localizacao?populate=*`
- `/api/politica-de-privacidade?populate=*`
- `/api/edicao-galerias?populate=*&sort[0]=dataEdicao:desc`

## Contato (email)

Fluxo atual:
1. Usuario envia `nome`, `email`, `assunto`, `mensagem` no formulario.
2. Next processa em `POST /api/contato`.
3. Destinatario institucional e templates sao lidos de `/api/contato`.
4. Next envia:
   - email de notificacao para equipe institucional;
   - email de confirmacao para o usuario com copia da mensagem.

Observacao:
- Nao ha mais protocolo via `mensagens-contatos` nem upload de anexo nesse fluxo atual.

## Variaveis de ambiente

Base Strapi:
- `STRAPI_BASE_URL` (recomendado)
- `NEXT_PUBLIC_STRAPI_BASE_URL` (alternativa)

Contato/email:
- `CONTACT_TO_EMAIL` (fallback institucional)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SMTP_TLS_REJECT_UNAUTHORIZED`

Arquivo de referencia:
- `.env.exemple`
- `.env.local.example`

## Como rodar

1. Instalar dependencias:
```bash
npm install
```

2. Configurar ambiente:
```bash
cp .env.exemple .env.local
```

3. Iniciar:
```bash
npm run dev
```

4. Abrir:
- `http://localhost:3000`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Documentacao complementar

- `STRAPI_FEMICTEC_SETUP.md`
- `STRAPI_FEIRA_SETUP.md`
- `STRAPI_REGULAMENTOS_CONTATO_SETUP.md`
- `STRAPI_POLITICA_PRIVACIDADE_SETUP.md`
- `STRAPI_GALERIA_SETUP.md`
- `STRAPI_CONTATO_TEMPLATES.md`
