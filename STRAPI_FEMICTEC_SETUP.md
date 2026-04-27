# Strapi: FEMICTEC (3 paginas)

Este modulo do frontend usa 3 rotas:

1. `/femictec` (Apresentacao)
2. `/femictec/quem-realiza`
3. `/femictec/historico`

Endpoint esperado (single type):

`/api/femictec?populate=deep,5`

Tambem aceita fallback em:
- `/api/femictec?populate=*`
- `/api/a-femictec?populate=deep,5`
- `/api/a-femictec?populate=*`

## 1) Criar o Single Type

No Strapi Admin:
1. `Content-Type Builder`
2. `Create new single type`
3. Display name: `Femictec`
4. API ID: `femictec`

## 2) Campos do Single Type `femictec`

Crie com os nomes exatamente iguais:

### Modelo recomendado (mais intuitivo)

Para facilitar a alimentacao do CMS, recomendamos separar o single type em componentes por secao:

1. `menuInterno` (Component - single: `femictec.menu-interno`)
2. `apresentacao` (Component - single: `femictec.apresentacao`)
3. `quemRealiza` (Component - single: `femictec.quem-realiza`)
4. `historico` (Component - single: `femictec.historico`)

Observacao: o frontend aceita tanto este modelo novo por secao quanto o modelo antigo com campos na raiz.

### Navegacao interna do modulo
1. `menuItemInicioLabel` (Text)
2. `menuItemQuemRealizaLabel` (Text)
3. `menuItemHistoricoLabel` (Text)

### Pagina 1: Apresentacao
1. `bannerTitulo` (Text)
2. `bannerDestaque` (Text)
3. `bannerImagem` (Media - single image)
4. `oQueTitulo` (Text)
5. `oQueDescricao` (Long text ou Rich text)
6. `missaoTitulo` (Text)
7. `missaoDescricao` (Long text ou Rich text)
8. `missaoDestaque` (Text)
9. `impactoTitulo` (Text)
10. `impactoDescricao` (Long text ou Rich text)
11. `estandesTitulo` (Text)
12. `estandesSubtitulo` (Text)
13. `estandesImagem` (Media - single image)
14. `estandesImagemAlt` (Text)

### Pagina 2: Quem realiza
1. `quemRealizaTitulo` (Text)
2. `organizacaoTitulo` (Text)
3. `organizacaoDescricao` (Long text ou Rich text)
4. `comissaoTitulo` (Text)
5. `comissaoDescricao` (Long text ou Rich text)
6. `imagemEntrada` (Media - single image)
7. `imagemEntradaAlt` (Text)
8. `imagemEntradaLabel` (Text)
9. `parceirosTitulo` (Text)
10. `parceiros` (Repeatable Component `femictec.parceiro-item`)

### Pagina 3: Historico
1. `historicoTitulo` (Text)
2. `historicoDescricao` (Long text ou Rich text)
3. `trajetoriaTitulo` (Text)
4. `trajetoriaSubtitulo` (Text)
5. `trajetoriaImagem` (Media - single image)
6. `trajetoriaImagemAlt` (Text)
7. `edicoesCards` (Repeatable Component `femictec.edicao-card`)
8. `galeriaLabel` (Text)
9. `galeriaUrl` (Text)
10. `historicoTabelaTitulo` (Text)
11. `historicoTabelaLinhas` (Repeatable Component `femictec.historico-linha`)

## 3) Componentes necessarios

### Componente `femictec.menu-interno`
1. `menuItemInicioLabel` (Text)
2. `menuItemQuemRealizaLabel` (Text)
3. `menuItemHistoricoLabel` (Text)

### Componente `femictec.apresentacao`
1. `bannerTitulo` (Text)
2. `bannerDestaque` (Text)
3. `bannerImagem` (Media - single image)
4. `oQueTitulo` (Text)
5. `oQueDescricao` (Long text ou Rich text)
6. `missaoTitulo` (Text)
7. `missaoDescricao` (Long text ou Rich text)
8. `missaoDestaque` (Text)
9. `impactoTitulo` (Text)
10. `impactoDescricao` (Long text ou Rich text)
11. `estandesTitulo` (Text)
12. `estandesSubtitulo` (Text)
13. `estandesImagem` (Media - single image)
14. `estandesImagemAlt` (Text)

### Componente `femictec.quem-realiza`
1. `quemRealizaTitulo` (Text)
2. `organizacaoTitulo` (Text)
3. `organizacaoDescricao` (Long text ou Rich text)
4. `comissaoTitulo` (Text)
5. `comissaoDescricao` (Long text ou Rich text)
6. `imagemEntrada` (Media - single image)
7. `imagemEntradaAlt` (Text)
8. `imagemEntradaLabel` (Text)
9. `parceirosTitulo` (Text)
10. `parceiros` (Repeatable Component `femictec.parceiro-item`)

### Componente `femictec.historico`
1. `historicoTitulo` (Text)
2. `historicoDescricao` (Long text ou Rich text)
3. `trajetoriaTitulo` (Text)
4. `trajetoriaSubtitulo` (Text)
5. `trajetoriaImagem` (Media - single image)
6. `trajetoriaImagemAlt` (Text)
7. `edicoesCards` (Repeatable Component `femictec.edicao-card`)
8. `galeriaLabel` (Text)
9. `galeriaUrl` (Text)
10. `historicoTabelaTitulo` (Text)
11. `historicoTabelaLinhas` (Repeatable Component `femictec.historico-linha`)

### Componente `femictec.parceiro-item`
1. `nome` (Text)
2. `logo` (Media - single image)
3. `siteUrl` (Text)

### Componente `femictec.edicao-card`
1. `titulo` (Text)
2. `subtitulo` (Text)
3. `imagem` (Media - single image)

### Componente `femictec.historico-linha`
1. `label` (Text)
2. `valor` (Text)

## 4) Permissoes (Public role)

Em `Settings -> Users & Permissions -> Roles -> Public`:
1. habilitar `find` para `Femictec`

## 5) Checklist de publicacao

1. Publicar o registro do single type `Femictec`.
2. Confirmar que imagens estao publicadas na Media Library.
3. Testar no navegador:
   - `http://127.0.0.1:1337/api/femictec?populate=*`
4. Conferir no front:
   - `/femictec`
   - `/femictec/quem-realiza`
   - `/femictec/historico`

### Checklist rapido do `bannerImagem` (Apresentacao)
1. Em `Content-Type Builder -> Femictec`, criar `bannerImagem` como `Media (single image)` caso ainda nao exista.
2. Em `Content Manager -> Femictec`, selecionar a imagem no campo `bannerImagem`.
3. Clicar em `Publish` no registro.
4. Validar no endpoint:
   - `http://127.0.0.1:1337/api/femictec?populate=*`
   - confirmar que o JSON retorna `bannerImagem` (ou `apresentacao.bannerImagem` no modelo por secao).
5. Validar no front:
   - abrir `/femictec` e conferir o banner superior com imagem de fundo.

## 6) Observacao importante

Enquanto o endpoint `femictec` nao existir ou estiver vazio, o frontend mostra fallback local com layout pronto.
Assim que os campos forem criados e publicados, os dados entram automaticamente.

