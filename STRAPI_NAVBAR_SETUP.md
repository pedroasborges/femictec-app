# Setup Strapi - Navbar

Este projeto Next esta preparado para consumir o logo do navbar a partir do Strapi:

- `GET /api/navbar?populate=*`

Arquivo consumidor no frontend:

- `app/navbar/navbar-data.ts`

## 1. Criar o tipo no Strapi

No **Content-Type Builder**, crie um **Single Type** com:

- Display name: `Navbar`
- API ID (UID): `navbar`

Campos:

- `logo` (Media, single image)
- `logoAlt` (Text, short)

## 2. Public permissions (Read)

Em **Settings > Users & Permissions plugin > Roles > Public**, habilite:

- `find` para `navbar`

## 3. Conteudo para publicar

`logoAlt`

`FEMICTEC`

`logo`

Escolha a imagem oficial da marca FEMICTEC.

## 4. Observacao tecnica

Se o logo nao estiver publicado, o frontend continua usando o arquivo local `public/femictec.png` como fallback.
O logo deste Single Type tambem alimenta o footer, entao este registro passa a ser a fonte oficial da marca no site.
