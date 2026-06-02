# AGENT.md - FEMICTEC_APP

## 1) Visao geral
- Projeto: `femictec-app`
- Stack: `Next.js 16` + `React 19` + `TypeScript` + `Tailwind CSS v4`
- Arquitetura: App Router consumindo Strapi (headless CMS)
- URL base Strapi (padrao): `http://127.0.0.1:1337`

## 2) Modulos principais
- Home (`app/page.tsx`): banner, dados institucionais, secao "Confira as datas" e noticias em destaque
- Navbar (`app/components/navbar.tsx` + `app/navbar/*`): logo institucional via Strapi
- Footer (`app/components/footer.tsx`): dados institucionais e logo compartilhado com o navbar
- Home datas (`app/home-datas/*`): secao editavel "Confira as datas" via Strapi
- A Feira (`app/feira/page.tsx`): conteudo rich text do CMS
- Eventos (`app/eventos-da-feira/*`): lista com filtro e detalhe por `slug`
- Noticias (`app/noticias/*`): lista com filtros, detalhe por `id` e navegacao anterior/proxima
- Paginas legais (`app/politica-de-privacidade/*`, `app/termo-de-uso/*`): conteudo editavel e estados de indisponibilidade
- Layout global (`app/layout.tsx`): `Navbar` + `Footer` + metadata SEO basica
- Modo de manutencao global via `SITE_MAINTENANCE_MODE` ou `NEXT_PUBLIC_SITE_MAINTENANCE_MODE`

## 3) Camada de dados
- `app/lib/strapi.ts`
  - `toStrapiUrl`: normaliza caminhos relativos/absolutos
  - `fetchStrapiJson`: fetch seguro com fallback
- `app/lib/content-utils.ts`
  - `extractText`: extracao de texto para string
  - `resolveMediaUrl`: resolve URL de midia para diferentes formatos de payload
  - `formatDateTimePtBr`: normaliza data/hora para `pt-BR`
- `app/lib/site-availability.ts`
  - `isSiteUnavailable`: verifica flags de manutencao

## 4) Endpoints consumidos
- Banner: `GET /api/banners?populate=*`
- Navbar: `GET /api/navbar?populate=*`
- Footer: `GET /api/footer?populate=*`
- Home datas: `GET /api/home-datas?populate=*` com fallbacks para `datas-home` e `home-data`
- A Feira: `GET /api/a-feira?populate=*`
- Eventos (ordem de tentativa):
  1. `/api/eventos-feiras?populate=*`
  2. `/api/eventos-da-feira?populate=*`
  3. `/api/a-feira?populate=deep,5`
- Noticias:
  - `/api/noticias?populate=imagem&sort[0]=publishedAt:desc&sort[1]=createdAt:desc&pagination[pageSize]=100`
- Politica de Privacidade: `GET /api/politica-de-privacidade?populate=*`
- Termo de Uso: `GET /api/termo-de-uso?populate=*`
- Localizacao: `GET /api/localizacao?populate=*`
- Regulamento: `GET /api/regulamento?populate=*`

## 5) Refactors recentes
- Remocao de duplicacao de parsing entre eventos/noticias/banner via `content-utils`
- Home conectada a noticias reais do Strapi
- Secao "Confira as datas" da home editavel pelo Strapi
- Navbar e footer com logo institucional vindo do Strapi
- Paginas legais com estados proprios de indisponibilidade
- Estado global de manutencao aplicado no layout
- Navegacao ajustada:
  - `Inscricoes` -> `/#inscricoes`
  - `Localizacao` -> `/#contato`
  - Footer com `id="contato"`
- `layout.tsx` com metadata institucional

## 6) Qualidade e validacao
- `npm run lint`: validar sempre antes de entregar mudancas
- `npm run build`: pode falhar com `EPERM` em `.next` quando arquivos estao bloqueados por processo ativo (ex.: dev server)

## 7) Pendencias conhecidas
- `linkInscricao` e `linkRegulamento` em eventos ainda em placeholder (`#`)
- `app/layout_origin.tsx` permanece legado (nao usado em runtime)

## 8) Convencoes para proximas tarefas
- Reutilizar `content-utils` para todo novo parser de payload Strapi
- Preferir tipagem por dominio (eventos, noticias, banners, paginas legais)
- Manter integracoes de rota sincronizadas com `Navbar`
- Validar sempre com `npm run lint`; build quando nao houver lock de `.next`

## 9) Padrao interno de funcoes TypeScript

Aplicar este padrao para manter consistencia do site:

- Funcoes de integracao com CMS devem receber `unknown` na entrada e retornar tipo explicito.
- Evitar `any`; usar `type`/`interface` locais por dominio.
- Toda funcao que toca rede deve ter fallback controlado.
- Normalizacao comum fica em `app/lib/*`, nunca duplicada em paginas/componentes.
- Nomes de funcao devem expressar acao/resultado (`fetch*`, `resolve*`, `extract*`, `format*`).

### Referencias oficiais no projeto

- `app/lib/strapi.ts`
  - `toStrapiUrl(path)` para URL absoluta
  - `fetchStrapiJson<T>(path, fallback)` para fetch seguro e tipado
- `app/lib/content-utils.ts`
  - `extractText(value)` para texto de blocos/CMS
  - `resolveMediaUrl(value)` para midia em payload variavel
  - `formatDateTimePtBr(value, fallback?)` para data/hora normalizada
