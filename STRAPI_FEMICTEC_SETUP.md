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

### Pagina 1: Apresentacao
1. `bannerTitulo` (Text)
2. `bannerDestaque` (Text)
3. `oQueTitulo` (Text)
4. `oQueDescricao` (Long text ou Rich text)
5. `missaoTitulo` (Text)
6. `missaoDescricao` (Long text ou Rich text)
7. `missaoDestaque` (Text)
8. `impactoTitulo` (Text)
9. `impactoDescricao` (Long text ou Rich text)
10. `estandesTitulo` (Text)
11. `estandesSubtitulo` (Text)
12. `estandesImagem` (Media - single image)
13. `estandesImagemAlt` (Text)

### Pagina 2: Quem realiza
14. `quemRealizaTitulo` (Text)
15. `organizacaoTitulo` (Text)
16. `organizacaoDescricao` (Long text ou Rich text)
17. `comissaoTitulo` (Text)
18. `comissaoDescricao` (Long text ou Rich text)
19. `imagemEntrada` (Media - single image)
20. `imagemEntradaAlt` (Text)
21. `imagemEntradaLabel` (Text)
22. `parceirosTitulo` (Text)
23. `parceiros` (Repeatable Component `femictec.parceiro-item`)

### Pagina 3: Historico
24. `historicoTitulo` (Text)
25. `historicoDescricao` (Long text ou Rich text)
26. `trajetoriaTitulo` (Text)
27. `trajetoriaSubtitulo` (Text)
28. `trajetoriaImagem` (Media - single image)
29. `trajetoriaImagemAlt` (Text)
30. `edicoesCards` (Repeatable Component `femictec.edicao-card`)
31. `galeriaLabel` (Text)
32. `galeriaUrl` (Text)
33. `historicoTabelaTitulo` (Text)
34. `historicoTabelaLinhas` (Repeatable Component `femictec.historico-linha`)

## 3) Componentes necessarios

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

## 6) Observacao importante

Enquanto o endpoint `femictec` nao existir ou estiver vazio, o frontend mostra fallback local com layout pronto.
Assim que os campos forem criados e publicados, os dados entram automaticamente.

