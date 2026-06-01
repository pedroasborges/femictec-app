# Strapi: Regulamentos, Contato e Localizacao

Atualizado em: 01/06/2026.

Rotas relacionadas no Next:
1. `/regulamentos`
2. `/contato`
3. `/localizacao`
4. `POST /api/contato` (envio de email via SMTP usando templates do Strapi)

## 1) Single Type `regulamento`

No Strapi Admin:
1. `Content-Type Builder`
2. `Create new single type`
3. Display name: `Regulamento`
4. API ID: `regulamento`

Campos recomendados:
1. `titulo` (Text - short)
2. `subtitulo` (Text - short)
3. `conteudo` (Rich text ou Long text)
4. `pdfLabel` (Text - short)
5. `pdfArquivo` (Media - single file)

Endpoint usado:
- `/api/regulamento?populate=*`

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
4. `email` (Email ou Text) -> email institucional principal
5. `telefone` (Text)
6. `endereco` (Text)
7. `destinatariosEvento` (Repeatable Component `contato.destinatario-email`)
8. `notificacaoAssuntoTemplate` (Text)
9. `notificacaoMensagemTemplate` (Long text)
10. `confirmacaoAssuntoTemplate` (Text)
11. `confirmacaoMensagemTemplate` (Long text)

Componente `contato.destinatario-email`:
1. `nome` (Text)
2. `email` (Email)

Endpoint usado:
- `/api/contato?populate=*`

Placeholders suportados nos templates:
- `{nome}`
- `{email}`
- `{assunto}`
- `{mensagem}`

## 3) Single Type `localizacao`

No Strapi Admin:
1. `Content-Type Builder`
2. `Create new single type`
3. Display name: `Localizacao`
4. API ID: `localizacao`

Campos recomendados:
1. `titulo` (Text)
2. `descricao` (Long text)
3. `endereco` (Text)
4. `coordenadas` (Text) -> formato: `-29.702856, -51.138347`

Endpoint usado:
- `/api/localizacao?populate=*`

## 4) Permissoes

Em `Settings -> Users & Permissions -> Roles -> Public`:
1. `find` para `Regulamento`
2. `find` para `Contato`
3. `find` para `Localizacao`

## 5) SMTP no Next (obrigatorio para envio)

No `.env.local` do Next:
1. `SMTP_HOST`
2. `SMTP_PORT`
3. `SMTP_SECURE`
4. `SMTP_USER`
5. `SMTP_PASS`
6. `SMTP_FROM`
7. `SMTP_TLS_REJECT_UNAUTHORIZED` (opcional; em dev local pode ser `false`)
8. `CONTACT_TO_EMAIL` (fallback de destinatario institucional)

Sem SMTP valido, `POST /api/contato` retorna `503`.

## 6) Checklist rapido

1. Publicar `Regulamento`, `Contato` e `Localizacao`.
2. Testar:
   - `http://127.0.0.1:1337/api/regulamento?populate=*`
   - `http://127.0.0.1:1337/api/contato?populate=*`
   - `http://127.0.0.1:1337/api/localizacao?populate=*`
3. Validar no front:
   - `/regulamentos`
   - `/contato`
   - `/localizacao`
