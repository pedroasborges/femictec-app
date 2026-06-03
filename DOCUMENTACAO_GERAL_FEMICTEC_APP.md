# Documentacao Geral - FEMICTEC App

Documento mestre do projeto `femictec_app`, consolidando o estado atual do frontend, a integracao com o Strapi e a validacao operacional executada em 02/06/2026.

## 1) Objetivo do projeto

Portal institucional da FEMICTEC em Next.js, com conteudo dinamico vindo do Strapi, paginas publicas institucionais, areas de eventos e noticias, e estados de indisponibilidade quando o CMS nao possui conteudo publicado.

## 2) Stack

- Next.js 16.1.7
- React 19.2.3
- TypeScript
- Tailwind CSS v4
- Strapi REST API

## 3) Estrutura principal do site

### Rotas publicas

- `/` home
- `/contato`
- `/localizacao`
- `/regulamentos`
- `/politica-de-privacidade`
- `/termo-de-uso`
- `/perguntas-frequentes`
- `/galeria`
- `/galeria/[slug]`
- `/noticias`
- `/noticias/[id]`
- `/eventos-da-feira`
- `/eventos-da-feira/[slug]`
- `/feira`
- `/feira/cronograma`
- `/feira/programacao`
- `/femictec`
- `/femictec/quem-realiza`
- `/femictec/historico`

### Componentes globais

- Navbar com logo vindo do Strapi
- Footer com logo compartilhado com o navbar e dados institucionais do Strapi
- Estado global de manutencao no layout

## 4) Conteudos dinamicos no Strapi

### 4.1 Navbar

- Endpoint: `GET /api/navbar?populate=*`
- Uso: logo institucional no navbar e no footer
- Fallback local: `public/femictec.png`

### 4.2 Footer

- Endpoint: `GET /api/footer?populate=*`
- Campos usados: `Email`, `Telefone`, `Instagram`, `Facebook`, `Youtube`
- O logo e compartilhado com o content type `navbar`

### 4.3 Home datas

- Endpoint principal: `GET /api/home-datas?populate=*`
- Fallbacks tecnicos:
  - `/api/datas-home?populate=*`
  - `/api/home-data?populate=*`
- Campos:
  - `tituloSecao`
  - `etapa1Titulo`
  - `etapa1Data`
  - `etapa2Titulo`
  - `etapa2Data`
  - `etapa3Titulo`
  - `etapa3Data`

### 4.4 FAQ

- Endpoint: `GET /api/faq?populate=*`
- Rota publica: `/perguntas-frequentes`
- Content type:
  - `Single Type`
  - `singularName`: `faq`
  - `displayName`: `Perguntas Frequentes`
- Campos:
  - `titulo`
  - `subtitulo`
  - `perguntas` repetivel
- Componente repetivel:
  - `faq.pergunta-faq`
  - `pergunta`
  - `resposta`
- Permissao obrigatoria:
  - role `Public` com `find` habilitado
- Comportamento:
  - se nao houver registro publicado ou a permissao nao estiver liberada, o frontend mostra estado de indisponibilidade

### 4.5 Politica de privacidade

- Endpoint: `GET /api/politica-de-privacidade?populate=*`
- Single Type com conteudo editavel e estado de indisponibilidade

### 4.6 Termo de uso

- Endpoint: `GET /api/termo-de-uso?populate=*`
- Single Type com conteudo editavel e estado de indisponibilidade

### 4.7 Contato

- Endpoint: `GET /api/contato?populate=*`
- Usado para:
  - telefone
  - email
  - endereco
  - templates de email
  - destinatarios institucionais

### 4.8 Localizacao

- Endpoint: `GET /api/localizacao?populate=*`
- Usado para endereco, coordenadas e exibicao do mapa

### 4.9 Regulamentos

- Endpoint: `GET /api/regulamento?populate=*`

### 4.10 A FEMICTEC

- Endpoint: `GET /api/femictec?populate=deep,5`

### 4.11 A FEIRA

- Endpoint: `GET /api/feira?populate=deep,5`
- Fallbacks de compatibilidade:
  - `/api/eventos-feiras?populate=*`
  - `/api/eventos-da-feira?populate=*`

### 4.12 Noticias

- Endpoint principal:
  - `/api/noticias?populate=imagem&sort[0]=publishedAt:desc&sort[1]=createdAt:desc&pagination[pageSize]=100`

### 4.13 Galeria

- Endpoint:
  - `/api/edicao-galerias?populate=*&sort[0]=dataEdicao:desc`
- Fallback de UID:
  - `galeria-edicoes`

## 5) Fluxos importantes

### 5.1 Contato

Fluxo:
1. Usuario envia nome, email, assunto e mensagem.
2. Next processa em `POST /api/contato`.
3. O content type `contato` fornece configuracao institucional e templates.
4. O sistema envia email para a equipe e confirmacao ao usuario.

### 5.2 FAQ

Fluxo:
1. Conteudo e criado no Strapi em `FAQ`.
2. O role `Public` precisa ter `find` liberado.
3. A pagina publica em `/perguntas-frequentes` exibe o acordeon.
4. O botao abaixo do formulario de contato aponta para essa pagina.

### 5.3 Indisponibilidade

Existem dois niveis:
- global: `SITE_MAINTENANCE_MODE` ou `NEXT_PUBLIC_SITE_MAINTENANCE_MODE`
- por conteudo: quando a pagina do CMS nao retorna registro publicado

## 6) Padrao visual da FAQ

- Titulo em azul `#223d67`
- Tipografia seguindo o design do site
- Acordeon simples, sem blocos coloridos
- Conteudo exibido e recolhido por `<details>` / `<summary>`
- O botao de acesso fica abaixo do formulario de contato

## 7) Validacao operacional executada

### 7.1 Lint

Comando executado:

```bash
npm run lint
```

Resultado:
- sucesso, sem erros
- avisos existentes e nao bloqueadores em:
  - `app/feira/cronograma/page.tsx`
  - `app/feira/page.tsx`
  - `app/galeria/[slug]/page.tsx`
  - `app/galeria/page.tsx`

Os avisos sao sobre uso de `<img>` em vez de `next/image`.

### 7.2 Build

Comando executado:

```bash
npm run build
```

Resultado:
- build concluido com sucesso
- a rota `/` foi tratada como dinamica durante a compilacao porque usa `fetch` com `no-store` no CMS
- rotas geradas no build:
  - `/`
  - `/contato`
  - `/eventos-da-feira`
  - `/eventos-da-feira/[slug]`
  - `/feira`
  - `/feira/cronograma`
  - `/feira/programacao`
  - `/femictec`
  - `/femictec/historico`
  - `/femictec/quem-realiza`
  - `/galeria`
  - `/galeria/[slug]`
  - `/localizacao`
  - `/noticias`
  - `/noticias/[id]`
  - `/perguntas-frequentes`
  - `/politica-de-privacidade`
  - `/regulamentos`
  - `/termo-de-uso`

## 8) Variaveis de ambiente

### Strapi

- `STRAPI_BASE_URL`
- `NEXT_PUBLIC_STRAPI_BASE_URL`

### Manutencao

- `SITE_MAINTENANCE_MODE`
- `NEXT_PUBLIC_SITE_MAINTENANCE_MODE`

### Email

- `CONTACT_TO_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SMTP_TLS_REJECT_UNAUTHORIZED`

## 9) Pontos de atencao

- O FAQ nao aparece no frontend sem `Public -> find`.
- O FAQ tambem precisa de pelo menos um registro publicado.
- O logo do footer depende do mesmo content type do navbar.
- A home usa fetch com `no-store`, entao o build produz saida dinamica na rota raiz.
- Os avisos de `img` nao quebram a build, mas permanecem como melhoria futura.

## 10) Documentacao auxiliar existente

Os arquivos abaixo seguem como referencias complementares, mas este documento deve ser a visao consolidada principal:

- `README.md`
- `RESUMO_EXECUTIVO.md`
- `AGENT.md`
- `STRAPI_DYNAMIC_CONTENT_AUDIT.md`
- `STRAPI_FAQ_SETUP.md`
- `STRAPI_HOME_DATAS_SETUP.md`
- `STRAPI_NAVBAR_SETUP.md`
- `STRAPI_FOOTER_SETUP.md`
- `STRAPI_TERMO_USO_SETUP.md`
- `STRAPI_POLITICA_PRIVACIDADE_SETUP.md`
- `STRAPI_REGULAMENTOS_CONTATO_SETUP.md`
- `STRAPI_GALERIA_SETUP.md`
- `STRAPI_FEIRA_SETUP.md`
- `STRAPI_FEMICTEC_SETUP.md`
- `STRAPI_CONTATO_TEMPLATES.md`
- `SITE_MAINTENANCE_SETUP.md`

