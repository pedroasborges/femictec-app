# Strapi: Feira (modo hibrido)

Atualizado em: 06/05/2026.
Escopo relacionado: `README.md`, `RESUMO_EXECUTIVO.md`, `STRAPI_FEMICTEC_SETUP.md`, `STRAPI_REGULAMENTOS_CONTATO_SETUP.md`.

Este frontend agora funciona em modo hibrido:

1. **Visao geral da feira**: vem do Single Type `feira`
2. **Cronograma e programacao**:
   - prioridade 1: campos estruturados em `feira` (`cronogramaItens` e `programacaoDias`)
   - prioridade 2 (fallback automatico): eventos da collection `eventos-feiras`

Endpoint principal da visao geral:

`/api/feira?populate=*`

## 1) Criar o Single Type `feira`

No Strapi Admin:
1. `Content-Type Builder`
2. `Create new single type`
3. Display name: `Feira`
4. API ID: `feira`

## 2) Campos do Single Type `feira`

Crie os campos abaixo com estes nomes:

1. `edicaoTitulo` (Text - short text)
2. `edicaoDescricao` (Rich text ou Long text)
3. `tematicaImagem` (Media - single image)
4. `tematicaImagemAlt` (Text - short text)
5. `objetivosTitulo` (Text - short text)
6. `objetivosDescricao` (Rich text ou Long text)
7. `regulamentoTitulo` (Text - short text)
8. `regulamentoLabel` (Text - short text)
9. `regulamentoUrl` (Text - short text)
10. `cronogramaTitulo` (Text - short text)
11. `dataRealizacao` (Text - short text)
12. `cronogramaItens` (Repeatable Component - opcional, mas recomendado)
13. `mapaImagem` (Media - single image)
14. `mapaImagemAlt` (Text - short text)
15. `programacaoTitulo` (Text - short text)
16. `programacaoDias` (Repeatable Component - opcional, mas recomendado)

## 3) Componentes (quando quiser controle manual)

### Componente `feira.cronograma-item`
1. `atividade` (Text)
2. `data` (Text)

### Componente `feira.programacao-dia`
1. `dia` (Text)
2. `data` (Text)
3. `atividades` (Repeatable Component: `feira.atividade-item`)

### Componente `feira.atividade-item`
1. `horario` (Text)
2. `titulo` (Text)

## 4) Collection `eventos-feiras` (fallback automatico)

Se `cronogramaItens` e `programacaoDias` estiverem vazios ou em formato nao estruturado,
o frontend gera cronograma/programacao automaticamente a partir de:

`/api/eventos-feiras?populate=*`

Campos esperados por evento:
1. `nomeEvento` (Text)
2. `miniDescricao` (Text ou Long text)
3. `dataHorario` (DateTime)
4. `imagemEvento` (Media)

## 5) Permissoes (Public role)

Em `Settings -> Users & Permissions -> Roles -> Public`:
1. habilitar `find` em `Feira`
2. habilitar `find` e `findOne` em `Eventos-Feiras`

## 6) Regras de prioridade no frontend

1. Sempre tenta montar a pagina de visao geral com `feira`.
2. Em cronograma/programacao:
   - usa componentes de `feira` quando existem dados validos
   - senao, monta automaticamente a partir de `eventos-feiras`
3. Se nada existir, usa fallback visual local.

## 7) Checklist rapido

1. Publicar o registro do Single Type `Feira`.
2. Publicar os registros em `Eventos-Feiras`.
3. Confirmar as permissoes da role `Public`.
4. Testar endpoints:
   - `http://127.0.0.1:1337/api/feira?populate=*`
   - `http://127.0.0.1:1337/api/eventos-feiras?populate=*`
