# Setup Strapi - Termo de Uso

Este projeto Next ja esta preparado para consumir:

- `GET /api/termo-de-uso?populate=*`

Arquivo consumidor no frontend:

- `app/termo-de-uso/termo-de-uso-data.ts`

## 1. Criar o tipo no Strapi

No **Content-Type Builder**, crie um **Single Type** com:

- Display name: `Termo de Uso`
- API ID (UID): `termo-de-uso`

Campos:

- `titulo` (Text, short)
- `subtitulo` (Text, short)
- `conteudo` (Text, long)
- `atualizadoEm` (Text, short)

## 2. Public permissions (Read)

Em **Settings > Users & Permissions plugin > Roles > Public**, habilite:

- `find` para `termo-de-uso`

## 3. Conteudo para publicar

`titulo`

`TERMO DE USO`

`subtitulo`

`Site da FEMICTEC - Secretaria Municipal de Educacao (SMED) - Prefeitura de Novo Hamburgo/RS`

`conteudo`

```text
Este Termo de Uso regula o acesso e a utilizacao do portal institucional da FEMICTEC.

## 1. Aceite dos termos
Ao acessar e navegar neste site, o usuario declara que leu, compreendeu e concorda com as condicoes aqui descritas.

## 2. Finalidade do site
O portal tem finalidade institucional, informativa e de divulgacao das acoes, eventos, noticias e materiais relacionados a FEMICTEC.

## 3. Responsabilidades do usuario
O usuario se compromete a:
- utilizar o conteudo do site de forma licita e responsavel;
- nao praticar atos que comprometam a seguranca, integridade ou disponibilidade da plataforma;
- nao inserir, divulgar ou transmitir conteudos ilicitos, ofensivos ou fraudulentos.

## 4. Conteudo e disponibilidade
A equipe responsavel pela FEMICTEC pode atualizar, corrigir, remover ou reorganizar conteudos a qualquer momento, sem aviso previo.
Apesar dos cuidados adotados, o site pode apresentar indisponibilidades temporarias, manutencao ou inconsistencias pontuais.

## 5. Links externos
O site pode conter links para paginas de terceiros. A FEMICTEC nao se responsabiliza por conteudos, politicas ou praticas desses sites externos.

## 6. Propriedade intelectual
Textos, imagens, marcas, logotipos e demais elementos visuais publicados neste portal pertencem aos seus respectivos titulares e nao podem ser reproduzidos sem autorizacao, salvo quando houver indicacao em contrario.

## 7. Mudancas neste termo
Este documento pode ser alterado a qualquer momento para refletir ajustes legais, tecnicos ou institucionais. A versao vigente sera sempre a publicada nesta pagina.

## 8. Contato
Em caso de duvidas sobre estes Termos de Uso, entre em contato pelos canais institucionais informados no rodape do site.
```

`atualizadoEm`

`Junho de 2026`

## 4. Observacao tecnica

Se o endpoint nao responder imediatamente, confirme se o Single Type foi publicado e se a permissao `Public -> find` esta ativa.
