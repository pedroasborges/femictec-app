# Setup Strapi - Footer

Este projeto Next consome o footer institucional pelo Strapi:

- `GET /api/footer?populate=*`

Arquivo consumidor no frontend:

- `app/components/footer.tsx`

## 1. Ajustar o Single Type existente

No **Content-Type Builder**, abra o Single Type `footer` e adicione os campos abaixo, se ainda nao existirem:

- `Email` (Text, short)
- `Telefone` (Text, short)
- `Instagram` (Text, short)
- `Facebook` (Text, short)
- `Youtube` (Text, short)

## 2. Public permissions (Read)

Em **Settings > Users & Permissions plugin > Roles > Public**, habilite:

- `find` para `footer`

## 3. Conteudo para publicar

O logo exibido no footer e o mesmo publicado no Single Type `navbar`.
Use a marca oficial da FEMICTEC sem fundo, se possivel, no conteudo do `navbar`.

## 4. Observacao tecnica

Se o logo nao estiver publicado no `navbar`, o frontend continua usando o arquivo local `public/femictec.png` como fallback.
