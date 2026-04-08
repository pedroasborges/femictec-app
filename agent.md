# AGENT.md - FEMICTEC_APP

## 1) Visao geral do projeto
- Nome: `femictec-app`
- Stack principal: `Next.js 16` + `React 19` + `TypeScript` + `Tailwind CSS v4`
- Arquitetura: front-end com App Router consumindo conteudo de um Strapi (`http://127.0.0.1:1337` por padrao).
- Objetivo atual: portal institucional com home, pagina "A Feira" e modulo "Eventos da Feira" (lista + detalhe).

## 2) Estrutura observada
- `app/layout.tsx`: layout raiz ativo com `Navbar` + `Footer`.
- `app/page.tsx`: home page; busca projetos via API do Strapi e renderiza cards.
- `app/feira/page.tsx`: pagina "A Feira"; renderiza rich text com `@strapi/blocks-react-renderer`.
- `app/eventos-da-feira/page.tsx`: pagina de lista de eventos.
- `app/eventos-da-feira/eventos-list-client.tsx`: filtro client-side da lista de eventos.
- `app/eventos-da-feira/[slug]/page.tsx`: pagina de detalhe do evento.
- `app/eventos-da-feira/events-data.ts`: camada de dados dos eventos (Strapi + fallback local).
- `app/components/banner.tsx`: busca e normaliza imagens de banner no Strapi.
- `app/components/banner-carousel.tsx`: carrossel client-side com autoplay e controles.
- `app/components/navbar.tsx`: navegacao desktop/mobile responsiva.
- `app/components/footer.tsx`: rodape institucional.
- `app/layout_origin.tsx`: layout legado (nao utilizado na rota principal).

## 3) Fluxo de dados (atual)
- Home:
  - `GET /api/projetos?populate=*`
- Banner:
  - `GET /api/banners?populate=*`
- Feira:
  - `GET /api/a-feira?populate=*`
- Eventos da Feira:
  - Tentativa principal (collection type `Eventos_Feira`): `GET /api/eventos-feiras?populate=*`
  - Compatibilidade temporaria: `GET /api/eventos-da-feira?populate=*`
  - Fallback adicional: `GET /api/a-feira?populate=deep,5`
  - Campos consumidos: `nomeEvento`, `descricao`, `miniDescricao`, `imagemEvento`, `data`/`dados`.

## 4) Mudancas recentes aplicadas
- Correcao do `className` no `app/layout.tsx`.
- Ajuste de rota no menu para `/eventos-da-feira`.
- Criacao do modulo completo de eventos em duas telas:
  - lista de eventos com filtro;
  - detalhe por slug.
- Integracao robusta com Strapi para eventos:
  - prioriza a rota nova de collection type (`/api/eventos-feiras`);
  - mantem compatibilidade com rota antiga durante migracao;
  - aceita variacoes de estrutura de midia (objeto/array/data/attributes);
  - aceita `data` e `dados` para data/hora;
  - formata data em `pt-BR` com timezone `America/Sao_Paulo`.
- Banner do detalhe do evento agora usa `imagemEvento` com overlay de contraste.

## 5) Estado de qualidade (verificado)
- Comando executado: `npm run lint`
- Resultado atual: sem erros e sem warnings.

## 6) Riscos e debitos tecnicos identificados
- `README.md` com conflito de merge nao resolvido (`<<<<<<<`, `=======`, `>>>>>>>`).
- Endpoints Strapi ainda hardcoded em partes do projeto (`127.0.0.1:1337`).
- Em `eventos-da-feira`, links de inscricao/regulamento ainda estao com `#` (placeholder).
- No Strapi, se `/api/eventos-feiras` retornar `403`, revisar permissoes do role `Public` para `find`/`findOne`.

## 7) Convencoes recomendadas para proximas tarefas
- Centralizar URL da API em variavel de ambiente unica (`NEXT_PUBLIC_STRAPI_URL` / `STRAPI_URL`).
- Definir tipos compartilhados para respostas do Strapi.
- Corrigir conflito no `README.md` e padronizar encoding UTF-8.
- Substituir placeholders de links de eventos por campos reais do CMS.

## 8) Comandos uteis
- Desenvolvimento: `npm run dev`
- Build de producao: `npm run build`
- Executar app de producao: `npm run start`
- Qualidade: `npm run lint`

## 9) Prioridade de saneamento (ordem sugerida)
1. Resolver conflito de merge no `README.md`.
2. Habilitar permissoes publicas de leitura para `/api/eventos-feiras` no Strapi.
3. Publicar/validar no Strapi os links reais de inscricao e regulamento.
4. Consolidar base URL do Strapi por env em todas as paginas/componentes.
5. Revisar e padronizar tipagem dos payloads do CMS.
