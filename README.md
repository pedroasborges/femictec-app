# FEMICTEC App

Portal institucional da FEMICTEC em Next.js, com conteudo dinamico vindo do Strapi e estados de indisponibilidade para site e conteudos.

## Visao geral

O projeto entrega:
- Home institucional.
- Navbar e footer institucionais com logo e dados vindos do Strapi.
- Secao "Confira as datas" da home editavel pelo CMS.
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
  - `/termo-de-uso`
  - `/galeria`
  - `/galeria/[slug]`
- FAQ publica:
  - `/perguntas-frequentes`

## Stack

- Next.js 16.1.7 (App Router)
- React 19.2.3
- TypeScript
- Tailwind CSS v4
- Strapi (REST)

## Integracao com Strapi

Endpoints principais:
- `/api/banners?populate=*`
- `/api/navbar?populate=*`
- `/api/footer?populate=*`
- `/api/home-datas?populate=*`
- `/api/femictec?populate=deep,5`
- `/api/feira?populate=deep,5`
- `/api/eventos-feiras?populate=*` e compatibilidade com `/api/eventos-da-feira`
- `/api/noticias?populate=imagem&sort[0]=publishedAt:desc&sort[1]=createdAt:desc&pagination[pageSize]=100`
- `/api/regulamento?populate=*`
- `/api/contato?populate=*`
- `/api/localizacao?populate=*`
- `/api/faq?populate=*`
- `/api/politica-de-privacidade?populate=*`
- `/api/termo-de-uso?populate=*`
- `/api/edicao-galerias?populate=*&sort[0]=dataEdicao:desc`

Observacao:
- O content type `faq` precisa ter `Public -> find` habilitado no Strapi para a pagina `/perguntas-frequentes` exibir o conteudo.

## Indisponibilidade

O site possui dois niveis de indisponibilidade:
- global, ativado por `SITE_MAINTENANCE_MODE` ou `NEXT_PUBLIC_SITE_MAINTENANCE_MODE`;
- por conteudo, quando uma pagina do CMS ainda nao tem registro publicado.

## Contato por email

Fluxo atual:
1. Usuario envia `nome`, `email`, `assunto`, `mensagem`.
2. Next processa em `POST /api/contato`.
3. Destinatario institucional e templates sao lidos de `/api/contato`.
4. Next envia:
   - email de notificacao para a equipe institucional;
   - email de confirmacao para o usuario com copia da mensagem.

Observacao:
- Nao ha mais protocolo via `mensagens-contatos` nem upload de anexo nesse fluxo atual.

## Variaveis de ambiente

Base Strapi:
- `STRAPI_BASE_URL` (recomendado)
- `NEXT_PUBLIC_STRAPI_BASE_URL` (alternativa)

Modo de manutencao:
- `SITE_MAINTENANCE_MODE`
- `NEXT_PUBLIC_SITE_MAINTENANCE_MODE`

Contato/email:
- `CONTACT_TO_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SMTP_TLS_REJECT_UNAUTHORIZED`

Arquivos de referencia:
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

- Documento mestre do projeto: `DOCUMENTACAO_GERAL_FEMICTEC_APP.md`
- `SITE_MAINTENANCE_SETUP.md`
- `STRAPI_DYNAMIC_CONTENT_AUDIT.md`
- `STRAPI_HOME_DATAS_SETUP.md`
- `STRAPI_NAVBAR_SETUP.md`
- `STRAPI_FOOTER_SETUP.md`
- `STRAPI_TERMO_USO_SETUP.md`
- `STRAPI_FAQ_SETUP.md`
- `STRAPI_FEMICTEC_SETUP.md`
- `STRAPI_FEIRA_SETUP.md`
- `STRAPI_REGULAMENTOS_CONTATO_SETUP.md`
- `STRAPI_POLITICA_PRIVACIDADE_SETUP.md`
- `STRAPI_GALERIA_SETUP.md`
- `STRAPI_CONTATO_TEMPLATES.md`
