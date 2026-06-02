# Setup Strapi - Datas da Home

Este projeto Next esta preparado para consumir a secao da home:

- `GET /api/home-datas?populate=*`
- `GET /api/datas-home?populate=*`
- `GET /api/home-data?populate=*`

Arquivo consumidor no frontend:

- `app/home-datas/home-datas-data.ts`

## 1. Criar o tipo no Strapi

No **Content-Type Builder**, crie um **Single Type** com:

- Display name: `Datas da Home`
- API ID (UID): `home-datas`

Campos:

- `tituloSecao` (Text, short)
- `etapa1Titulo` (Text, short)
- `etapa1Data` (Text, short)
- `etapa2Titulo` (Text, short)
- `etapa2Data` (Text, short)
- `etapa3Titulo` (Text, short)
- `etapa3Data` (Text, short)

## 2. Public permissions (Read)

Em **Settings > Users & Permissions plugin > Roles > Public**, habilite:

- `find` para `home-datas`

## 3. Conteudo para publicar

`tituloSecao`

`CONFIRA AS DATAS`

`etapa1Titulo`

`INSCRICAO`

`etapa1Data`

`XX/XX`

`etapa2Titulo`

`SUBMISSAO`

`etapa2Data`

`XX/XX`

`etapa3Titulo`

`AVALIACAO`

`etapa3Data`

`XX/XX`

## 4. Observacao tecnica

Se o conteudo nao estiver publicado, a home exibe um estado de indisponibilidade apenas nessa secao.
O frontend aceita tanto `Single Type` quanto `Collection Type` com um unico registro, usando o primeiro item retornado se necessario.
Se o UID do CMS variar, o frontend ainda tenta `home-datas`, `datas-home` e `home-data`.
