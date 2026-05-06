# FEMICTEC App - Resumo Executivo

## 1) Objetivo
Portal institucional da FEMICTEC para comunicacao da feira, publicacao de noticias/eventos e relacionamento com o publico via pagina de contato.

## 2) Escopo entregue (ate 06/05/2026)

- Home com banner/carrossel e secoes de destaque.
- Modulo `A FEMICTEC`:
  - `/femictec`
  - `/femictec/quem-realiza`
  - `/femictec/historico`
- Modulo `A FEIRA`:
  - `/feira`
  - `/feira/cronograma`
  - `/feira/programacao`
- Modulo `Eventos da Feira`:
  - listagem com filtro textual
  - detalhe por `slug`
- Modulo `Noticias`:
  - listagem com filtros por texto e periodo
  - detalhe por `id`
  - navegacao anterior/proxima
- Novo modulo `Regulamentos`:
  - conteudo textual dinamico do Strapi
  - visualizacao/download de PDF
- Novo modulo `Contato`:
  - dados institucionais dinamicos do Strapi
  - formulario para protocolar mensagem
  - anexo opcional
  - retorno de numero de protocolo ao usuario

## 3) Arquitetura

- Front-end: Next.js 16 + React 19 + TypeScript + Tailwind.
- CMS: Strapi (REST).
- Padrao operacional:
  - leitura: server-side com normalizacao e fallback;
  - escrita (contato): rota interna Next para manter token fora do browser.

## 4) Integracoes principais

- Conteudo institucional:
  - `/api/femictec`
  - `/api/feira`
  - `/api/eventos-feiras`
  - `/api/noticias`
  - `/api/regulamento`
  - `/api/contato`
  - `/api/footer`
  - `/api/banners`
- Protocolo de contato:
  - upload: `/api/upload`
  - criacao de mensagem: `/api/mensagens-contatos`
  - entrada do front: `POST /api/contato` (Next)

## 5) Estado atual de qualidade

- Build de producao validado em 06/05/2026.
- Lint sem erros bloqueantes.
- Warnings restantes: `@next/next/no-img-element` em arquivos legados de `feira` e `femictec`.

## 6) Dependencias e riscos

- Permissoes da role `Public` no Strapi influenciam disponibilidade dos dados.
- `STRAPI_API_TOKEN` e recomendado para upload/criacao segura de protocolos.
- Sem token, o fluxo de contato depende de permissoes publicas de escrita no Strapi.

## 7) Documentacao operacional

- `README.md`
- `STRAPI_FEMICTEC_SETUP.md`
- `STRAPI_FEIRA_SETUP.md`
- `STRAPI_REGULAMENTOS_CONTATO_SETUP.md`
- `.env.example`

## 8) Proximos passos recomendados

1. Configurar e validar os content-types no Strapi de homologacao/producao.
2. Reduzir warnings de `<img>` migrando para `next/image`.
3. Revisar campos de placeholder da home (inscricoes/datas) para publicacao completa via CMS.
