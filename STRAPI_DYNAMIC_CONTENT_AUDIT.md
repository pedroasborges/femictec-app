# Auditoria de Conteudo Dinamico (Strapi)

Atualizado em: 01/06/2026.

## Escopo coberto pelo frontend

Conteudos consumidos dinamicamente:
- Home: `banners`, `dado-institucional`
- Footer: `footer` (email, telefone, redes sociais)
- A FEMICTEC: `femictec`
- A FEIRA: `feira` (com fallback opcional para `eventos-feiras` em cronograma/programacao)
- Eventos da Feira: `eventos-feiras` (compatibilidade com `eventos-da-feira`)
- Noticias: `noticias`
- Regulamentos: `regulamento`
- Contato: `contato`
- Localizacao: `localizacao`
- Politica de Privacidade: `politica-de-privacidade`
- Termo de Uso: `termo-de-uso`
- Galeria: `edicao-galerias` (ou fallback de UID para `galeria-edicoes`)

## Fluxos sensiveis

### Contato (`POST /api/contato`)

Dependencias:
- SMTP configurado no Next.
- Registro `contato` publicado no Strapi (com `email` institucional e templates opcionais).

Comportamento:
- envio de email para equipe institucional;
- envio de confirmacao para o usuario com copia da mensagem.

## Pontos de compatibilidade implementados no frontend

- Variacoes de endpoints para alguns content-types (fallbacks tecnicos).
- Normalizacao de payload com e sem `attributes`.
- Tolerancia a formatos diferentes de links de rede social no `footer`.

## Recomendacao operacional

Ao criar novo content-type no Strapi:
1. publicar schema e reiniciar o backend do Strapi quando necessario;
2. habilitar permissao `Public -> find`;
3. publicar ao menos um registro;
4. validar endpoint diretamente no navegador antes de testar no Next.
