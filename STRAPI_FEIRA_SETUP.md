# Strapi: A Feira (visao geral, cronograma e programacao)

Atualizado em: 29/05/2026.

Este modulo do Next usa:
1. `/feira` (Visao Geral)
2. `/feira/cronograma`
3. `/feira/programacao`

Endpoint principal:
- `/api/feira?populate=deep,5`

## 1) Estrutura recomendada no Single Type `feira`

No `Content-Type Builder`, no tipo `Feira`, manter apenas 3 blocos:
1. `visaoGeral` (component single: `feira.visao-geral`)
2. `cronograma` (component single: `feira.cronograma`)
3. `programacao` (component single: `feira.programacao`)

## 2) Componentes e campos

### `feira.visao-geral`
1. `edicaoTitulo` (Text)
2. `edicaoDescricao` (Long text / Rich text)
3. `tematicaImagem` (Media, single image)
4. `tematicaImagemAlt` (Text)
5. `objetivosTitulo` (Text)
6. `objetivosDescricao` (Long text / Rich text)
7. `regulamentoTitulo` (Text)
8. `regulamentoLabel` (Text)
9. `regulamentoUrl` (Text)

### `feira.cronograma`
1. `cronogramaTitulo` (Text)
2. `dataRealizacao` (Text)
3. `cronogramaItens` (Repeatable component: `feira.cronograma-item`)
4. `mapaImagem` (Media, single image)
5. `mapaImagemAlt` (Text)

### `feira.cronograma-item`
1. `atividade` (Text)
2. `data` (Text)

### `feira.programacao`
1. `programacaoTitulo` (Text)
2. `programacaoDias` (Repeatable component: `feira.programacao-dia`)

### `feira.programacao-dia`
1. `dia` (Text)
2. `data` (Text)
3. `atividades` (Repeatable component: `feira.atividade-item`)

### `feira.atividade-item`
1. `horario` (Text)
2. `titulo` (Text)

## 3) Compatibilidade e fallback

O frontend continua com fallback automatico para `eventos-feiras` quando:
- `cronogramaItens` estiver vazio
- `programacaoDias` estiver vazio

Assim, mesmo sem preenchimento manual completo, cronograma/programacao podem ser montados pelos eventos.

## 4) Permissoes

Em `Settings -> Users & Permissions -> Roles -> Public`:
1. habilitar `find` para `Feira`
2. habilitar `find` e `findOne` para `Eventos-Feiras`

## 5) Checklist

1. Publicar o registro de `Feira`.
2. Publicar itens de `Eventos-Feiras` (caso use fallback).
3. Testar:
   - `http://127.0.0.1:1337/api/feira?populate=deep,5`
   - `http://127.0.0.1:1337/api/eventos-feiras?populate=*`
4. Validar no front:
   - `/feira`
   - `/feira/cronograma`
   - `/feira/programacao`
