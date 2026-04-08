# FEMICTEC App

Front-end institucional da FEMICTEC, construído em Next.js com integração ao Strapi (Headless CMS).

## Visão geral

O projeto entrega:
- página inicial com banner/carrossel e destaques;
- página "A Feira" com conteúdo dinâmico;
- módulo "Eventos da Feira" com lista, filtro e página de detalhe por evento.

A aplicação segue arquitetura desacoplada:
- Strapi fornece conteúdo via API REST;
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
- `app/feira/page.tsx`: página "A Feira".
- `app/eventos-da-feira/page.tsx`: lista de eventos.
- `app/eventos-da-feira/eventos-list-client.tsx`: filtro client-side da lista.
- `app/eventos-da-feira/[slug]/page.tsx`: detalhe de evento.
- `app/eventos-da-feira/events-data.ts`: camada de dados de eventos (normalização + fallback).
- `app/components/banner.tsx`: busca e normalização de banners.
- `app/components/banner-carousel.tsx`: carrossel e controles.

## Integração com Strapi

### Banner
- Endpoint: `GET /api/banners?populate=*`
- Renderização com `next/image` (`unoptimized`) para evitar bloqueios do otimizador local em ambiente de desenvolvimento.

### A Feira
- Endpoint: `GET /api/a-feira?populate=*`
- Conteúdo renderizado com `@strapi/blocks-react-renderer`.

### Eventos da Feira
A camada atual prioriza a collection type nova e mantém fallback de compatibilidade.

Ordem de tentativa:
1. `GET /api/eventos-feiras?populate=*` (collection type `Eventos_Feira`)
2. `GET /api/eventos-da-feira?populate=*` (legado)
3. `GET /api/a-feira?populate=deep,5` (fallback técnico)

Campos mapeados:
- `nomeEvento`
- `descricao`
- `miniDescricao`
- `imagemEvento`
- data/hora: `dados` ou `data` ou `dataHorario`

## Decisões e ajustes implementados

- correção de rota de navegação para `/eventos-da-feira`;
- criação do módulo completo de eventos:
  - lista com filtro;
  - rota dinâmica de detalhe por `slug`;
- suporte a múltiplos formatos de mídia do Strapi (`objeto`, `array`, `data`, `attributes`);
- normalização de data/hora para `pt-BR` com timezone `America/Sao_Paulo`;
- uso da `imagemEvento` no detalhe:
  - como banner superior (com overlay);
  - como imagem da seção do evento;
- padronização visual do banner da página `A Feira` para ficar igual ao da home;
- correção de `className` no layout raiz.

## Situação atual de qualidade

- `npm run lint`: sem erros e sem warnings.

## Pré-requisitos

- Node.js 20+
- npm
- Strapi rodando localmente em `http://127.0.0.1:1337` (ou URL equivalente)

## Como executar

1. Instalar dependências:

```bash
npm install
```

2. Subir o front:

```bash
npm run dev
```

3. Acessar:

- `http://localhost:3000`

## Scripts úteis

- `npm run dev`: desenvolvimento
- `npm run build`: build de produção
- `npm run start`: iniciar build de produção
- `npm run lint`: análise estática

## Configuração de ambiente recomendada

Hoje parte das URLs está no código. Recomenda-se centralizar em variável de ambiente.

Exemplo (`.env.local`):

```bash
NEXT_PUBLIC_STRAPI_URL=http://127.0.0.1:1337
```

## Troubleshooting

### Eventos não aparecem após troca para collection type

Verifique permissões do Strapi:
- `Settings -> Users & Permissions Plugin -> Roles -> Public`
- habilitar `find` e `findOne` para `Eventos_Feira`
- publicar os registros

Sem isso, a API pode responder `403` e a aplicação cair no fallback local.

### Data/hora não aparece

A coleção pode estar usando `dataHorario` em vez de `data`.
O parser já suporta `dados`, `data` e `dataHorario`.

### Banner não carrega no ambiente local

- confirmar URL do Strapi acessível no browser;
- confirmar `imagemEvento` ou `Imagem` publicada no Strapi;
- reiniciar `npm run dev` após alterações de configuração.

## Pendências técnicas mapeadas

- centralizar todas as URLs do Strapi em env;
- substituir links placeholder de inscrição/regulamento (`#`) por campos reais do CMS;
- remover o arquivo legado `app/layout_origin.tsx` se não houver uso futuro.

## Licença

Uso institucional (FEMICTEC / Governo Digital).
