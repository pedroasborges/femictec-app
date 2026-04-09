# FEMICTEC App

Front-end institucional da FEMICTEC, construido em Next.js com integracao ao Strapi (Headless CMS).

## Visao geral

O projeto entrega:
- pagina inicial com banner/carrossel e destaques;
- pagina "A Feira" com conteudo dinamico;
- modulo "Eventos da Feira" com lista, filtro e pagina de detalhe por evento;
- modulo "Noticias" com lista, filtros, detalhe e navegacao entre noticias.

A aplicacao segue arquitetura desacoplada:
- Strapi fornece conteudo via API REST;
- Next.js renderiza interface e consome os dados no servidor.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Strapi CMS (API REST)

## Estrutura principal

- `app/layout.tsx`: layout global com `Navbar` e `Footer`.
- `app/page.tsx`: home.
- `app/feira/page.tsx`: pagina "A Feira".
- `app/eventos-da-feira/page.tsx`: lista de eventos.
- `app/eventos-da-feira/eventos-list-client.tsx`: filtro client-side da lista.
- `app/eventos-da-feira/[slug]/page.tsx`: detalhe de evento.
- `app/eventos-da-feira/events-data.ts`: camada de dados de eventos (normalizacao + fallback).
- `app/noticias/page.tsx`: lista de noticias.
- `app/noticias/noticias-list-client.tsx`: filtros client-side e grid responsiva das noticias.
- `app/noticias/[id]/page.tsx`: detalhe da noticia com botoes anterior/proxima.
- `app/noticias/noticias-data.ts`: camada de dados de noticias (normalizacao + parser resiliente de imagem).
- `app/components/banner.tsx`: busca e normalizacao de banners.
- `app/components/banner-carousel.tsx`: carrossel e controles.

## Integracao com Strapi

### Banner
- Endpoint: `GET /api/banners?populate=*`
- Renderizacao com `next/image` (`unoptimized`) para evitar bloqueios do otimizador local em ambiente de desenvolvimento.

### A Feira
- Endpoint: `GET /api/a-feira?populate=*`
- Conteudo renderizado com `@strapi/blocks-react-renderer`.

### Eventos da Feira
A camada atual prioriza a collection type nova e mantem fallback de compatibilidade.

Ordem de tentativa:
1. `GET /api/eventos-feiras?populate=*` (collection type `Eventos_Feira`)
2. `GET /api/eventos-da-feira?populate=*` (legado)
3. `GET /api/a-feira?populate=deep,5` (fallback tecnico)

Campos mapeados:
- `nomeEvento`
- `descricao`
- `miniDescricao`
- `imagemEvento`
- data/hora: `dados` ou `data` ou `dataHorario`

### Noticias
- Endpoint: `GET /api/noticias?populate=imagem&sort[0]=publishedAt:desc&sort[1]=createdAt:desc&pagination[pageSize]=100`
- Campos mapeados:
  - `titulo`
  - `imagem`
  - `miniDescricao`
  - `descricao`
- Lista com:
  - filtro por texto;
  - filtro por intervalo de data;
  - cards responsivos com destaque periodico.
- Detalhe com:
  - conteudo completo (`descricao`);
  - navegacao para noticia anterior/proxima com base na ordenacao da API.
- Parser de midia tolerante a variacoes de payload (`data`, `attributes`, `formats`, `large/medium/small/thumbnail`).
- Renderizacao de imagem com `next/image` usando `unoptimized` para evitar falhas com URLs remotas dinamicas do Strapi.

## Decisoes e ajustes implementados

- correcao de rota de navegacao para `/eventos-da-feira`;
- correcao de rota de navegacao para `/noticias`;
- criacao do modulo completo de eventos:
  - lista com filtro;
  - rota dinamica de detalhe por `slug`;
- criacao do modulo completo de noticias:
  - lista com filtros por texto e periodo;
  - rota dinamica de detalhe por `id`;
  - navegacao anterior/proxima no detalhe;
- suporte a multiplos formatos de midia do Strapi (`objeto`, `array`, `data`, `attributes`);
- normalizacao de data/hora para `pt-BR` com timezone `America/Sao_Paulo`;
- uso da `imagemEvento` no detalhe:
  - como banner superior (com overlay);
  - como imagem da secao do evento;
- padronizacao visual do banner da pagina `A Feira` para ficar igual ao da home;
- correcao de `className` no layout raiz.

## Situacao atual de qualidade

- `npm run lint`: sem erros, com 1 warning legado em `app/eventos-da-feira/events-data.ts` (`STRAPI_BASE_URL` nao utilizado).

## Pre-requisitos

- Node.js 20+
- npm
- Strapi rodando localmente em `http://127.0.0.1:1337` (ou URL equivalente)

## Como executar

1. Instalar dependencias:

```bash
npm install
```

2. Subir o front:

```bash
npm run dev
```

3. Acessar:

- `http://localhost:3000`

## Scripts uteis

- `npm run dev`: desenvolvimento
- `npm run build`: build de producao
- `npm run start`: iniciar build de producao
- `npm run lint`: analise estatica

## Configuracao de ambiente recomendada

Hoje parte das URLs esta no codigo. Recomenda-se centralizar em variavel de ambiente.

Exemplo (`.env.local`):

```bash
NEXT_PUBLIC_STRAPI_URL=http://127.0.0.1:1337
```

## Troubleshooting

### Eventos nao aparecem apos troca para collection type

Verifique permissoes do Strapi:
- `Settings -> Users & Permissions Plugin -> Roles -> Public`
- habilitar `find` e `findOne` para `Eventos_Feira`
- publicar os registros

Sem isso, a API pode responder `403` e a aplicacao cair no fallback local.

### Data/hora nao aparece

A colecao pode estar usando `dataHorario` em vez de `data`.
O parser ja suporta `dados`, `data` e `dataHorario`.

### Banner nao carrega no ambiente local

- confirmar URL do Strapi acessivel no browser;
- confirmar `imagemEvento` ou `Imagem` publicada no Strapi;
- reiniciar `npm run dev` apos alteracoes de configuracao.

### Imagens de noticias nao aparecem

- confirmar se o campo `imagem` esta publicado no Strapi;
- validar se a API de noticias retorna URL de imagem em algum nivel do payload (`data/attributes/formats`);
- conferir `NEXT_PUBLIC_STRAPI_URL` para geracao correta das URLs absolutas.

## Pendencias tecnicas mapeadas

- centralizar todas as URLs do Strapi em env;
- substituir links placeholder de inscricao/regulamento (`#`) por campos reais do CMS;
- remover o arquivo legado `app/layout_origin.tsx` se nao houver uso futuro.

## Licenca

Uso institucional (FEMICTEC / Governo Digital).
