# Auditoria de Conteudo Dinamico (Strapi)

Atualizado em: 29/05/2026.

## Status de conectividade no ambiente local

Endpoints com resposta `200`:
- `/api/footer`
- `/api/feira?populate=*`
- `/api/regulamento?populate=*`
- `/api/noticias`
- `/api/eventos-feiras`

Endpoints ausentes ou nao habilitados:
- `/api/femictec` (nao retornou conteudo no teste local)
- `/api/contato` (retorno `404`)

Tentativa de criacao via API:
- `POST /api/contato` retornou `Method Not Allowed` (nao foi possivel criar pelo frontend sem ajuste no CMS/permissoes).

## O que ja vem dinamico do Strapi

- Navbar/Home:
  - banners (`/api/banners`)
  - dados institucionais da home (`/api/dado-institucional`)
- Footer:
  - email, telefone, instagram, facebook, youtube (`/api/footer`)
- A FEMICTEC:
  - conteudo principal das 3 paginas via `getFemictecContent()` (`/api/femictec` com fallbacks)
  - estatisticas publicas (`/api/public/femictec/stats`) quando disponivel
- A FEIRA:
  - conteudo geral + cronograma/programacao (`/api/feira` com fallbacks)
- Eventos da Feira:
  - listagem/detalhe (`/api/eventos-feiras` com fallback legado)
- Noticias:
  - listagem/detalhe (`/api/noticias`)
- Regulamentos:
  - titulo, subtitulo, texto e PDF (`/api/regulamento`)
- Contato:
  - configurado no frontend para consumir (`/api/contato`), mas endpoint ainda nao existe no CMS local

## Conteudos ainda estaticos no frontend e recomendados para Strapi

1. Pagina `/femictec`:
- titulo principal: `XII FEMICTEC`
- subtitulo principal: `Feira Municipal de Iniciacao Cientifica e Tecnologica`
- arte de fundo local: `/public/apresentacao.svg`

Campos sugeridos no Strapi (secao `apresentacao`):
- `tituloPrincipal` (Text)
- `subtituloPrincipal` (Text)
- `arteFundoApresentacao` (Media - single image)
- `arteFundoApresentacaoAlt` (Text)

2. Pagina `/contato`:
- labels fixas: `Ligue para nos`, `Localizacao`, `Siga-nos`

Campos sugeridos no Strapi (single type `contato`):
- `blocoContatoTitulo` (Text)
- `blocoLocalizacaoTitulo` (Text)
- `blocoRedesTitulo` (Text)

## Itens criados no Strapi nesta execucao

Nenhum item foi criado automaticamente no Strapi nesta execucao, porque o ambiente local retornou endpoint ausente (`404`) e bloqueio de metodo para criacao (`Method Not Allowed`) sem token/permissoes de escrita no CMS.
