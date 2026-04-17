# FEMICTEC App - Resumo Executivo

## 1) Objetivo
Portal institucional da FEMICTEC para divulgacao da feira, eventos e conteudos informativos, com gestao de conteudo via Strapi.

## 2) Escopo Entregue
- Pagina inicial com banner/carrossel e secoes institucionais.
- Modulo "A FEMICTEC" com 3 paginas:
  - apresentacao;
  - quem realiza;
  - historico.
- Modulo "A Feira" com 3 paginas:
  - visao geral;
  - cronograma;
  - programacao completa.
- Modulo "Eventos da Feira" completo:
  - listagem de eventos;
  - filtro por texto;
  - detalhe por evento (rota dinamica).
- Modulo "Noticias" completo:
  - listagem de noticias;
  - filtros por texto e periodo;
  - detalhe por noticia (rota dinamica);
  - navegacao entre noticia anterior/proxima.
- Integracao de imagem do evento em destaque (banner do detalhe) e bloco de imagem.

## 3) Arquitetura (alto nivel)
- Front-end: Next.js 16 + React 19 + TypeScript + Tailwind.
- CMS: Strapi (Headless, REST).
- Modelo operacional: conteudo no Strapi, renderizacao no Next.js.

## 4) Integracao de Dados
- Banners: `/api/banners?populate=*`
- Conteudo da FEMICTEC: `/api/femictec?populate=deep,5` (com fallback para `populate=*` e `/api/a-femictec`)
- Conteudo da feira: `/api/feira?populate=*` (com fallback para `/api/a-feira`)
- Eventos (modelo atual): `/api/eventos-feiras?populate=*`
- Noticias: `/api/noticias?populate=imagem&sort[0]=publishedAt:desc&sort[1]=createdAt:desc&pagination[pageSize]=100`
- Compatibilidade tecnica com formatos legados e variacoes de payload do Strapi.
- Feira em modo hibrido:
  - usa campos estruturados do single type `feira` quando disponiveis;
  - gera cronograma/programacao automaticamente a partir de `eventos-feiras` quando necessario.

## 5) Estado Atual
- Aplicacao funcional para os fluxos principais.
- Modulo `femictec` implementado com layout completo e fallback local.
- Layout padronizado entre home e paginas institucionais para visualizacao de banner.
- Parser de eventos ajustado para campos reais do CMS (`nomeEvento`, `miniDescricao`, `descricao`, `imagemEvento`, `dataHorario`).
- Parser de noticias ajustado para variacoes de midia (`data`, `attributes`, `formats`, `large/medium/small/thumbnail`) e renderizacao com `unoptimized` nas imagens.

## 6) Riscos/Dependencias
- Permissoes no Strapi (role Public) impactam leitura de eventos e noticias (`find`/`findOne`).
- Permissoes no Strapi (role Public) impactam leitura de `feira` e `femictec`.
- Parte das URLs do Strapi ainda esta hardcoded e deve migrar para variaveis de ambiente.
- Links de inscricao/regulamento permanecem placeholder (`#`) ate publicacao dos campos no CMS.

## 7) Proximos Passos Recomendados
1. Centralizar URL do Strapi em `.env` (`NEXT_PUBLIC_STRAPI_URL`).
2. Publicar e validar os single types `feira` e `femictec` com todos os campos/componentes.
3. Publicar no Strapi os links reais de inscricao, regulamento e galeria.
4. Consolidar tipagem dos payloads para reduzir manutencao.
5. Remover arquivos legados nao utilizados apos validacao final.

## 8) Beneficio para o Projeto
- Reducao de retrabalho ao separar conteudo (Strapi) e interface (Next).
- Agilidade para equipe de conteudo atualizar FEMICTEC, feira, eventos e noticias sem alterar codigo.
- Base estavel para evolucoes futuras (SEO, analytics e acessibilidade).
