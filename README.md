# FEMICTEC App

Front-end institucional da FEMICTEC, construido em Next.js com integracao ao Strapi (Headless CMS).

## Visao geral

O projeto entrega:
- pagina inicial com banner/carrossel e destaques;
- modulo "A FEMICTEC" com 3 paginas institucionais;
- pagina "A Feira" com conteudo dinamico;
- modulo "Eventos da Feira" com lista, filtro e pagina de detalhe por evento;
- modulo "Noticias" com lista, filtros, detalhe e navegacao entre noticias.

A aplicacao segue arquitetura desacoplada:
- Strapi fornece conteudo via API REST;
- Next.js renderiza interface e consome os dados no servidor.

## Stack

- Next.js 16.1.7 (App Router)
- React 19.2.3
- TypeScript
- Tailwind CSS v4
- Strapi CMS (API REST)

## Estrutura principal

- `app/layout.tsx`: layout global com `Navbar` e `Footer`.
- `app/page.tsx`: home.
- `app/femictec/layout.tsx`: layout interno do modulo "A FEMICTEC".
- `app/femictec/page.tsx`: pagina de apresentacao institucional.
- `app/femictec/quem-realiza/page.tsx`: pagina "Quem Realiza".
- `app/femictec/historico/page.tsx`: pagina "Historico".
- `app/femictec/femictec-data.ts`: camada de dados do modulo "A FEMICTEC" (Strapi + fallback).
- `app/feira/page.tsx`: pagina "A Feira".
- `app/feira/layout.tsx`: layout interno do modulo "A Feira".
- `app/feira/cronograma/page.tsx`: pagina de cronograma da feira.
- `app/feira/programacao/page.tsx`: pagina de programacao da feira.
- `app/feira/feira-data.ts`: camada de dados da feira (modo hibrido).
- `app/eventos-da-feira/page.tsx`: lista de eventos.
- `app/eventos-da-feira/eventos-list-client.tsx`: filtro client-side da lista e thumbnail da imagem do evento no quadro pequeno.
- `app/eventos-da-feira/[slug]/page.tsx`: detalhe de evento.
- `app/eventos-da-feira/events-data.ts`: camada de dados de eventos (normalizacao + fallback).
- `app/noticias/page.tsx`: lista de noticias.
- `app/noticias/noticias-list-client.tsx`: filtros client-side e grid responsiva das noticias.
- `app/noticias/[id]/page.tsx`: detalhe da noticia com botoes anterior/proxima.
- `app/noticias/noticias-data.ts`: camada de dados de noticias (normalizacao + parser resiliente de imagem).
- `app/components/banner.tsx`: busca e normalizacao de banners.
- `app/components/banner-carousel.tsx`: carrossel e controles.
- `app/lib/strapi.ts`: funcoes base para URL e fetch seguro do Strapi.
- `app/lib/content-utils.ts`: funcoes utilitarias para normalizacao de texto, midia e data.

## Padrao de funcoes TypeScript

Para manter consistencia no projeto, as funcoes utilitarias devem seguir este padrao:

- nome explicito e responsabilidade unica;
- entrada `unknown` quando vier de CMS externo;
- saida tipada e previsivel (evitar `any`);
- fallback seguro para erro de rede, payload ausente ou campo invalido;
- normalizacao centralizada em `app/lib/*` para evitar duplicacao em componentes.

### `app/lib/strapi.ts`

- `STRAPI_BASE_URL`: origem unica do Strapi.
- `toStrapiUrl(path: string): string`
  - converte caminho relativo em URL absoluta.
- `fetchStrapiJson<T>(path: string, fallback: T): Promise<T>`
  - faz fetch com fallback tipado em caso de erro.

### `app/lib/content-utils.ts`

- `extractText(value: unknown): string`
  - converte texto simples ou blocos ricos em string limpa.
- `resolveMediaUrl(value: unknown): string | null`
  - resolve URL de midia para payloads variados (`data`, `attributes`, `formats`, etc.).
- `formatDateTimePtBr(value: unknown, fallback?: string): string`
  - padroniza data/hora para `pt-BR` com fallback controlado.

### Regras para novos utilitarios

- criar em `app/lib/` quando reutilizavel por mais de um modulo;
- manter funcoes puras (sem efeitos colaterais);
- documentar fallback esperado no proprio arquivo;
- preferir compor funcoes existentes antes de criar novas variantes.

## Integracao com Strapi

### Utilitarios compartilhados (`app/lib/strapi.ts`)

- `STRAPI_BASE_URL`:
  - base da URL do Strapi usada em toda a aplicacao;
  - prioridade para `NEXT_PUBLIC_STRAPI_URL`;
  - fallback padrao: `http://127.0.0.1:1337`.

- `toStrapiUrl(path: string): string`:
  - recebe um caminho de recurso do Strapi e devolve URL absoluta;
  - se o valor ja vier com `http://` ou `https://`, retorna sem alterar;
  - normaliza caminhos relativos para sempre comecarem com `/` antes de concatenar com `STRAPI_BASE_URL`.

- `fetchStrapiJson<T>(path: string, fallback: T): Promise<T>`:
  - helper generico para buscar JSON no Strapi com tipagem em TypeScript;
  - executa `fetch` com `cache: "no-store"` para evitar dados stale em renderizacao server-side;
  - quando houver erro de rede, excecao, ou resposta nao-`ok`, retorna `fallback` em vez de quebrar o fluxo da pagina.

### Banner
- Endpoint: `GET /api/banners?populate=*`
- Renderizacao com `next/image` (`unoptimized`) para evitar bloqueios do otimizador local em ambiente de desenvolvimento.
- Compatibilidade de payload para midia: `Imagem` e `imagem` (inclusive dentro de `attributes`).

### Footer
- Endpoint: `GET /api/footer`
- Renderizacao server-side no componente `app/components/footer.tsx`.
- Campos mapeados:
  - `Email`
  - `Telefone`
  - `Instagram`

### A Feira
- Endpoint principal: `GET /api/feira?populate=*`
- Fallbacks tecnicos: `GET /api/feira?populate=deep,5`, `GET /api/a-feira?populate=*`, `GET /api/a-feira?populate=deep,5`
- Modo hibrido para cronograma/programacao:
  - prioridade para campos estruturados em `feira` (`cronogramaItens`, `programacaoDias`);
  - fallback automatico para dados de `eventos-feiras`.

### A FEMICTEC
- Endpoint principal: `GET /api/femictec?populate=deep,5`
- Fallbacks tecnicos: `GET /api/femictec?populate=*`, `GET /api/a-femictec?populate=deep,5`, `GET /api/a-femictec?populate=*`
- Rotas:
  - `/femictec`
  - `/femictec/quem-realiza`
  - `/femictec/historico`
- Modelo de conteudo suportado no Strapi:
  - legado (campos na raiz do single type);
  - recomendado (componentes por secao): `menuInterno`, `apresentacao`, `quemRealiza`, `historico`.
- Rotulos de menu internos (quando publicados no CMS):
  - `menuItemInicioLabel`
  - `menuItemQuemRealizaLabel`
  - `menuItemHistoricoLabel`
- Banner da pagina de apresentacao:
  - `bannerTitulo` e `bannerDestaque` (texto);
  - `bannerImagem` (imagem de fundo opcional no topo de `/femictec`).
- Quando o endpoint nao existe ou esta vazio, a interface exibe fallback local para preservar o layout.

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

Renderizacao na UI:
- lista (`/eventos-da-feira`): usa `imagemEvento` no quadro pequeno de cada card, com fallback visual quando nao houver imagem;
- detalhe (`/eventos-da-feira/[slug]`): usa `imagemEvento` no banner superior e no bloco lateral da secao de conteudo.

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
- atualizacao da navegacao para `A FEMICTEC -> /femictec`;
- criacao do modulo completo "A FEMICTEC":
  - pagina de apresentacao;
  - pagina "Quem Realiza";
  - pagina "Historico";
  - integracao preparada com Strapi + fallback local;
- reestruturacao da feira em 3 paginas:
  - visao geral;
  - cronograma;
  - programacao completa;
  - leitura em modo hibrido (single type + fallback por eventos);
- criacao do modulo completo de eventos:
  - lista com filtro;
  - rota dinamica de detalhe por `slug`;
- criacao do modulo completo de noticias:
  - lista com filtros por texto e periodo;
  - rota dinamica de detalhe por `id`;
  - navegacao anterior/proxima no detalhe;
- suporte a multiplos formatos de midia do Strapi (`objeto`, `array`, `data`, `attributes`);
- compatibilidade extra no banner para variacao de nome de campo (`Imagem`/`imagem`);
- migracao do footer de estatico para dinamico, consumindo `/api/footer`;
- normalizacao de data/hora para `pt-BR` com timezone `America/Sao_Paulo`;
- uso da `imagemEvento` no detalhe:
  - como banner superior (com overlay);
  - como imagem da secao do evento;
- uso da `imagemEvento` na lista de eventos:
  - como thumbnail no quadro pequeno de cada item;
  - com fallback de placeholder quando a imagem nao estiver publicada;
- padronizacao visual do banner da pagina `A Feira` para ficar igual ao da home;
- correcao de `className` no layout raiz.

## Situacao atual de qualidade

- Ultima validacao local: `27/04/2026`.
- `npm run build`: sucesso, sem erros.
- `npm run lint`: sem erros, com 7 warnings de `@next/next/no-img-element`.
- Arquivos com warning de `<img>`:
  - `app/feira/page.tsx`
  - `app/feira/cronograma/page.tsx`
  - `app/femictec/page.tsx`
  - `app/femictec/quem-realiza/page.tsx`
  - `app/femictec/historico/page.tsx`

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

### Footer nao aparece (403 em `/api/footer`)

Verifique permissoes do Strapi:
- `Settings -> Users & Permissions Plugin -> Roles -> Public`
- habilitar `find` para `Footer` (e recomendado `findOne`)
- publicar o registro do single type `Footer`

Sem isso, a API responde `403` e o frontend cai no fallback local.

### Imagens de noticias nao aparecem

- confirmar se o campo `imagem` esta publicado no Strapi;
- validar se a API de noticias retorna URL de imagem em algum nivel do payload (`data/attributes/formats`);
- conferir `NEXT_PUBLIC_STRAPI_URL` para geracao correta das URLs absolutas.

### Modulo A FEMICTEC nao aparece com dados do CMS

- confirmar existencia do single type `femictec`;
- validar endpoint `GET /api/femictec?populate=*`;
- verificar permissao `find` na role `Public`;
- publicar o registro do single type `Femictec`.

### Banner da Apresentacao (`/femictec`) sem imagem

- confirmar que o campo `bannerImagem` existe no tipo `Femictec` (ou em `apresentacao.bannerImagem` no modelo por secao);
- confirmar que a imagem foi selecionada e o registro foi publicado;
- validar retorno no endpoint `GET /api/femictec?populate=*`;
- se o JSON nao tiver `bannerImagem`, o frontend exibira apenas `bannerTitulo` e `bannerDestaque` (texto);
- reiniciar `npm run dev` apos alteracoes estruturais no Strapi.

### Mini guia visual: configurar `bannerImagem` no Strapi

1. Abrir `Content-Type Builder`.
2. Clicar em `Femictec` (single type).
3. Clicar em `Add another field`.
4. Selecionar `Media`.
5. Definir:
   - `Name`: `bannerImagem`
   - `Type`: `Single media`
6. Clicar em `Finish` e depois em `Save`.
7. Abrir `Content Manager -> Femictec`.
8. No campo `bannerImagem`, clicar em `Add media` e selecionar a imagem.
9. Clicar em `Save` e depois `Publish`.
10. Validar no browser:
    - `http://127.0.0.1:1337/api/femictec?populate=*`
    - confirmar retorno de `bannerImagem` (ou `apresentacao.bannerImagem` no modelo por secao).
11. Abrir `http://localhost:3000/femictec` e confirmar o banner com imagem.

## Pendencias tecnicas mapeadas

- centralizar todas as URLs do Strapi em env;
- substituir links placeholder de inscricao/regulamento (`#`) por campos reais do CMS;
- substituir placeholders de galeria/links institucionais no modulo `femictec`;
- remover o arquivo legado `app/layout_origin.tsx` se nao houver uso futuro.

## Licenca

Uso institucional (FEMICTEC / Governo Digital).
