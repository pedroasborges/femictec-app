# FEMICTEC App

Front-end institucional da FEMICTEC, construido em Next.js, com consumo de conteudo via Strapi (Headless CMS).

## Visao geral

O projeto entrega:
- Home com banner/carrossel e secoes de destaque.
- Modulo `A FEMICTEC` com 3 paginas institucionais.
- Modulo `A FEIRA` com visao geral, cronograma e programacao.
- Modulo `Eventos da Feira` com listagem e detalhe dinamico.
- Modulo `Noticias` com listagem, filtros e detalhe dinamico.
- Pagina `Regulamentos` com conteudo textual e visualizacao de PDF do Strapi.
- Pagina `Contato` com dados institucionais e formulario de protocolo com anexo.

Arquitetura:
- Strapi entrega conteudo via API REST.
- Next.js renderiza a interface e normaliza payloads com fallback.
- Rota interna Next (`POST /api/contato`) intermedia envio de mensagem + upload para o Strapi.

## Stack

- Next.js 16.1.7 (App Router)
- React 19.2.3
- TypeScript (strict)
- Tailwind CSS v4
- Strapi CMS (REST)

## Estrutura principal

- `app/layout.tsx`: layout global com `Navbar` e `Footer`.
- `app/page.tsx`: home.
- `app/components/navbar.tsx`: navegacao principal (inclui `Regulamentos` e `Contato`).
- `app/components/footer.tsx`: contato institucional dinamico + atalhos para `Regulamentos` e `Contato`.
- `app/lib/strapi.ts`: URL base e fetch seguro.
- `app/lib/content-utils.ts`: normalizacao de texto, midia e data.
- `app/femictec/*`: modulo institucional `A FEMICTEC`.
- `app/feira/*`: modulo `A FEIRA`.
- `app/eventos-da-feira/*`: eventos com detalhe dinamico por `slug`.
- `app/noticias/*`: noticias com detalhe dinamico por `id`.
- `app/regulamentos/page.tsx`: pagina de regulamentos.
- `app/regulamentos/regulamentos-data.ts`: leitura de `regulamento` no Strapi.
- `app/contato/page.tsx`: pagina de contato.
- `app/contato/contato-form.tsx`: formulario com anexo e retorno de protocolo.
- `app/contato/contato-data.ts`: leitura de `contato` no Strapi.
- `app/api/contato/route.ts`: envio para `mensagens-contatos` + upload no Strapi.

## Rotas do front-end

- `/`
- `/femictec`
- `/femictec/quem-realiza`
- `/femictec/historico`
- `/feira`
- `/feira/cronograma`
- `/feira/programacao`
- `/eventos-da-feira`
- `/eventos-da-feira/[slug]`
- `/noticias`
- `/noticias/[id]`
- `/regulamentos`
- `/contato`

## Integracao com Strapi

Endpoints utilizados:
- `GET /api/banners?populate=*`
- `GET /api/footer`
- `GET /api/feira?populate=*` (com fallbacks tecnicos)
- `GET /api/femictec?populate=deep,5` (com fallbacks tecnicos)
- `GET /api/eventos-feiras?populate=*` (com fallback legado)
- `GET /api/noticias?...`
- `GET /api/regulamento?populate=pdfArquivo` (com fallback `populate=*`)
- `GET /api/contato?populate=*`
- `POST /api/mensagens-contatos` (via rota interna Next)
- `POST /api/upload` (via rota interna Next, quando houver anexo)

Documentacao de setup no repositorio:
- `STRAPI_FEMICTEC_SETUP.md`
- `STRAPI_FEIRA_SETUP.md`
- `STRAPI_REGULAMENTOS_CONTATO_SETUP.md`

## Formulario de contato (protocolo)

Fluxo:
1. Usuario envia nome, email, assunto, mensagem e anexo opcional.
2. Next.js recebe em `POST /api/contato`.
3. Se houver arquivo, envia para `/api/upload` no Strapi.
4. Cria registro em `/api/mensagens-contatos`.
5. Front exibe confirmacao com numero/ID de protocolo quando disponivel.

Variaveis:
- `NEXT_PUBLIC_STRAPI_URL`
- `STRAPI_API_TOKEN` (recomendado para escrita/upload)

Referencia: `.env.example`.

## Estado atual (06/05/2026)

- `npm run build`: sucesso.
- `npm run lint`: sem erros, com warnings preexistentes de `<img>` (`@next/next/no-img-element`) em paginas antigas de `feira` e `femictec`.

## Como executar

1. Instalar dependencias:
```bash
npm install
```

2. Configurar ambiente:
```bash
cp .env.example .env.local
```

3. Subir app:
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

## Licenca

Uso institucional (FEMICTEC / Governo Digital).
