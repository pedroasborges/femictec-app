# Strapi: FEMICTEC (estrutura limpa por secao)

Atualizado em: 29/05/2026.
Escopo relacionado: `README.md`, `STRAPI_DYNAMIC_CONTENT_AUDIT.md`.

Objetivo: deixar a edicao no Strapi com a mesma organizacao visual das paginas Next:
1. `/femictec` (Apresentacao)
2. `/femictec/quem-realiza`
3. `/femictec/historico`

Endpoint usado pelo frontend:
- `/api/femictec?populate=deep,5`

## 1) Single Type principal

No Strapi Admin:
1. `Content-Type Builder`
2. `Create new single type`
3. Display name: `Femictec`
4. API ID: `femictec`

No single type `femictec`, crie somente estes 4 blocos:
1. `menuInterno` (component single: `femictec.menu-interno`)
2. `apresentacao` (component single: `femictec.apresentacao`)
3. `quemRealiza` (component single: `femictec.quem-realiza`)
4. `historico` (component single: `femictec.historico`)

Importante: para manter organizado, nao criar campos soltos na raiz fora desses 4 blocos.

## 2) Componentes e campos corretos

### 2.1 `femictec.menu-interno`
1. `menuItemInicioLabel` (Text)
2. `menuItemQuemRealizaLabel` (Text)
3. `menuItemHistoricoLabel` (Text)

### 2.2 `femictec.apresentacao` (pagina `/femictec`)
1. `tituloPrincipal` (Text) -> ex.: `XII FEMICTEC`
2. `subtituloPrincipal` (Text)
3. `oQueTitulo` (Text)
4. `oQueDescricao` (Long text ou Rich text)
5. `missaoTitulo` (Text)
6. `missaoDestaque` (Text)
7. `missaoDescricao` (Long text ou Rich text)
8. `impactoTitulo` (Text)
9. `impactoDescricao` (Long text ou Rich text)
10. `estandesImagem` (Media, single image)
11. `estandesImagemAlt` (Text)

Campos opcionais legados (podem existir, mas nao sao obrigatorios para o layout atual):
1. `bannerTitulo` (Text)
2. `bannerDestaque` (Text)
3. `bannerImagem` (Media, single image)
4. `estandesTitulo` (Text)
5. `estandesSubtitulo` (Text)

### 2.3 `femictec.quem-realiza` (pagina `/femictec/quem-realiza`)
1. `quemRealizaTitulo` (Text)
2. `organizacaoTitulo` (Text)
3. `organizacaoDescricao` (Long text ou Rich text)
4. `comissaoTitulo` (Text)
5. `comissaoDescricao` (Long text ou Rich text)
6. `imagemEntrada` (Media, single image)
7. `imagemEntradaAlt` (Text)
8. `imagemEntradaLabel` (Text)
9. `parceirosTitulo` (Text)
10. `parceiros` (Repeatable component: `femictec.parceiro-item`)

### 2.4 `femictec.historico` (pagina `/femictec/historico`)
1. `historicoTitulo` (Text)
2. `historicoDescricao` (Long text ou Rich text)
3. `trajetoriaTitulo` (Text)
4. `trajetoriaSubtitulo` (Text)
5. `trajetoriaImagem` (Media, single image)
6. `trajetoriaImagemAlt` (Text)
7. `edicoesCards` (Repeatable component: `femictec.edicao-card`)
8. `galeriaLabel` (Text)
9. `galeriaUrl` (Text)
10. `historicoTabelaTitulo` (Text)
11. `historicoTabelaLinhas` (Repeatable component: `femictec.historico-linha`)

### 2.5 `femictec.parceiro-item`
1. `nome` (Text)
2. `logo` (Media, single image)
3. `siteUrl` (Text)

### 2.6 `femictec.edicao-card`
1. `titulo` (Text)
2. `subtitulo` (Text)
3. `imagem` (Media, single image)

### 2.7 `femictec.historico-linha`
1. `label` (Text)
2. `valor` (Text)

## 3) Ordem recomendada de criacao no Strapi (para nao baguncar)

1. Criar componentes nesta ordem:
   - `menu-interno`
   - `parceiro-item`
   - `edicao-card`
   - `historico-linha`
   - `apresentacao`
   - `quem-realiza`
   - `historico`
2. Criar o single type `femictec`.
3. Adicionar apenas os 4 blocos (`menuInterno`, `apresentacao`, `quemRealiza`, `historico`).
4. Preencher conteudo.
5. Publicar.

## 4) Permissoes

Em `Settings -> Users & Permissions -> Roles -> Public`:
1. habilitar `find` para `Femictec`.

## 5) Validacao

1. Testar endpoint:
   - `http://127.0.0.1:1337/api/femictec?populate=deep,5`
2. Conferir no frontend:
   - `/femictec`
   - `/femictec/quem-realiza`
   - `/femictec/historico`

## 6) Observacao sobre criacao automatica

Neste repositorio (frontend Next) nao existe o projeto backend do Strapi para eu aplicar migracao/geracao automatica de schema.
Ajustei o contrato e a documentacao com os campos corretos; para materializar no CMS, a criacao precisa ser feita no painel do Strapi (ou no repo do backend Strapi, se voce me passar esse workspace).
