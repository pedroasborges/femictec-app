# Setup Strapi - Galeria por Edicao

Objetivo: permitir cadastrar varias edicoes da FEMICTEC, cada uma com data e varias imagens, e abrir uma pagina propria por edicao no Next.

## 1. Criar Collection Type

No Content-Type Builder, crie um **Collection Type**:

- Display name: `Edicao Galeria`
- API ID (UID): `edicao-galeria`

Campos:

- `tituloEdicao` (Text - short, obrigatorio)
- `slug` (UID baseado em `tituloEdicao`, obrigatorio e unico)
- `dataEdicao` (Date, obrigatorio)
- `imagens` (Media - multiple images, obrigatorio)

## 2. Permissoes publicas

Em `Settings > Users & Permissions > Roles > Public`, habilite para `edicao-galeria`:

- `find`
- `findOne` (opcional)

Clique em `Save`.

## 3. Publicacao

No Content Manager:

1. Crie um item por edicao (ex.: `XII FEMICTEC`, `XIII FEMICTEC`).
2. Preencha `dataEdicao`.
3. Preencha/confira o `slug` gerado (ex.: `xiii-femictec`).
4. Envie varias imagens em `imagens`.
5. Clique em `Publish`.

## 4. Endpoint esperado pelo Next

O Next esta preparado para consumir:

- `/api/edicao-galerias?populate=*&sort[0]=dataEdicao:desc`

Fallbacks tecnicos tambem aceitos:

- `/api/galeria-edicoes?...` (caso o UID tenha sido criado diferente)

## 5. Comportamento no front

- Rota: `/galeria`
- Lista de edicoes com preview
- Ordenacao das edicoes por data (mais recente primeiro)
- Rota de detalhe por edicao: `/galeria/[slug]`
- Grid com as imagens da edicao selecionada
