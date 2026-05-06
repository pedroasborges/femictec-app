# Strapi: Regulamentos e Contato

Atualizado em: 06/05/2026.
Escopo relacionado: `README.md`, `RESUMO_EXECUTIVO.md`, `STRAPI_FEIRA_SETUP.md`, `STRAPI_FEMICTEC_SETUP.md`.

Este frontend agora possui as rotas:

1. `/regulamentos`
2. `/contato`
3. `POST /api/contato` (rota interna Next.js que salva no Strapi)

## 1) Single Type `regulamento`

No Strapi Admin:
1. `Content-Type Builder`
2. `Create new single type`
3. Display name: `Regulamento`
4. API ID: `regulamento`

Campos recomendados:
1. `titulo` (Text - short text)
2. `subtitulo` (Text - short text)
3. `conteudo` (Rich text ou Long text)
4. `pdfLabel` (Text - short text)
5. `pdfArquivo` (Media - single file)

Endpoint usado no frontend:
- `/api/regulamento?populate=pdfArquivo`

## 2) Single Type `contato`

No Strapi Admin:
1. `Content-Type Builder`
2. `Create new single type`
3. Display name: `Contato`
4. API ID: `contato`

Campos recomendados:
1. `titulo` (Text)
2. `subtitulo` (Text)
3. `descricao` (Rich text ou Long text)
4. `email` (Email ou Text)
5. `telefone` (Text)
6. `endereco` (Text)

Endpoint usado no frontend:
- `/api/contato?populate=*`

## 3) Collection Type de mensagens (protocolo)

No Strapi Admin:
1. `Content-Type Builder`
2. `Create new collection type`
3. Display name: `Mensagens Contato`
4. API ID: `mensagens-contato`

Campos:
1. `nome` (Text)
2. `email` (Email)
3. `assunto` (Text)
4. `mensagem` (Long text)
5. `anexo` (Media - single file)

Endpoint de criacao (usado pela rota Next):
- `POST /api/mensagens-contatos`

## 4) Permissoes

Em `Settings -> Users & Permissions -> Roles -> Public`:
1. Habilitar `find` para `Regulamento`
2. Habilitar `find` para `Contato`
3. Nao habilitar `create` para `Mensagens Contato` se for usar token do servidor (recomendado)

## 5) Token para escrita segura (recomendado)

No Strapi:
1. `Settings -> API Tokens`
2. Criar token com permissao custom para:
   - `upload` (create)
   - `mensagens-contato` (create)

No Next.js (`.env.local`):
1. `NEXT_PUBLIC_STRAPI_URL=http://127.0.0.1:1337`
2. `STRAPI_API_TOKEN=seu_token_aqui`

Sem token, a rota ainda tenta enviar, mas depende de permissoes publicas no Strapi.

## 6) Checklist rapido

1. Publicar o registro de `Regulamento`.
2. Publicar o registro de `Contato`.
3. Testar:
   - `http://127.0.0.1:1337/api/regulamento?populate=*`
   - `http://127.0.0.1:1337/api/contato?populate=*`
4. Abrir no frontend:
   - `/regulamentos`
   - `/contato`
5. Enviar formulario com anexo e confirmar registro em `Mensagens Contato`.
