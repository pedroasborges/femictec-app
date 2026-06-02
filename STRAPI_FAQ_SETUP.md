# FAQ no Strapi

Este documento descreve o content type usado pela pagina de Perguntas Frequentes do site.

## Tipo

- `Single Type`
- `singularName`: `faq`
- `displayName`: `Perguntas Frequentes`
- `draftAndPublish`: habilitado

## Campos

- `titulo` - `string`
- `subtitulo` - `string`
- `perguntas` - componente repetivel `faq.pergunta-faq`

## Componente repetivel

### `faq.pergunta-faq`

- `pergunta` - `string`
- `resposta` - `text`

## Endpoint esperado

- `GET /api/faq?populate=*`

## Permissoes

- O role `Public` precisa ter a permissao `find` habilitada para `FAQ`.
- Sem essa permissao, a pagina do Next cai no estado de indisponibilidade mesmo com o schema criado.

## Fluxo no frontend

- A pagina publica fica em `/perguntas-frequentes`.
- O botao de acesso fica abaixo do formulario de contato.
- Se nao houver conteudo publicado, o site mostra estado de indisponibilidade em vez de perguntas vazias.
