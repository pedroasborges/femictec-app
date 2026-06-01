# Setup Strapi - Politica de Privacidade

Este projeto Next ja esta preparado para consumir:

- `GET /api/politica-de-privacidade?populate=*`

Arquivo consumidor no frontend:

- `app/politica-de-privacidade/politica-de-privacidade-data.ts`

## 1. Criar o tipo no Strapi

No **Content-Type Builder**, crie um **Single Type** com:

- Display name: `Politica de Privacidade`
- API ID (UID): `politica-de-privacidade`

Campos:

- `titulo` (Text, short)
- `subtitulo` (Text, short)
- `conteudo` (Text, long)
- `atualizadoEm` (Text, short)

## 2. Public permissions (Read)

Em **Settings > Users & Permissions plugin > Roles > Public**, habilite:

- `find` para `politica-de-privacidade`

## 3. Conteudo para publicar

`titulo`

`POLITICA DE PRIVACIDADE`

`subtitulo`

`Site da FEMICTEC - Secretaria Municipal de Educacao (SMED) - Prefeitura de Novo Hamburgo/RS`

`conteudo`

```text
A Secretaria Municipal de Educacao de Novo Hamburgo/RS, por meio da comissao organizadora da Feira Municipal de Iniciacao Cientifica e Tecnologica (FEMICTEC), valoriza a privacidade e a protecao dos dados pessoais de seus alunos, professores, avaliadores e visitantes. Esta Politica de Privacidade descreve como coletamos, usamos e protegemos suas informacoes, em estrita conformidade com a Lei Geral de Protecao de Dados (LGPD - Lei no 13.709/2018).

## 1. Quem e o responsavel pelo tratamento dos dados?
O controlador dos dados pessoais deste site e a Secretaria Municipal de Educacao (SMED), vinculada a Prefeitura Municipal de Novo Hamburgo, com sede na Rua David Canabarro, no 20, Centro, Novo Hamburgo/RS.

## 2. Quais dados coletamos e para quais finalidades?
Alunos/Estudantes: Coletamos nome completo, idade, ano/turma e escola municipal (EMEB) de origem. Finalidade: Inscricao no evento, organizacao dos estandes, catalogacao das pesquisas e emissao de certificados de participacao.
Professores Orientadores e Coorientadores: Coletamos nome completo, CPF, e-mail, telefone de contato e escola de vinculo. Finalidade: Gerenciamento das submissoes, comunicacoes oficiais sobre cronogramas e emissao de certificados.
Avaliadores: Coletamos nome completo, CPF, e-mail, telefone, formacao e instituicao de vinculo. Finalidade: Credenciamento, distribuicao das bancas de avaliacao e emissao de certificados de colaboracao.
Visitantes do Site: Coletamos dados de navegacao padrao (como endereco IP, data, hora e paginas acessadas) por meio de cookies. Finalidade: Melhorar o desempenho tecnico do site e gerar estatisticas anonimas de acesso.

## 3. Protecao Especial: Dados de Criancas e Adolescentes (Art. 14 da LGPD)
Por se tratar de uma feira escolar, o site processa dados de menores de 18 anos. A SMED Novo Hamburgo realiza este tratamento em seu estrito interesse pedagogico.
Autorizacao: A inscricao de qualquer projeto cujos autores sejam menores de idade exige que o Professor Orientador declare possuir o Termo de Autorizacao fisica assinado pelos pais ou responsaveis legais do aluno, devidamente arquivado na secretaria da respectiva escola.

## 4. Uso de Imagem e Voz
A FEMICTEC e um evento publico de divulgacao cientifica. Fotos, videos e gravacoes das apresentacoes dos projetos, capturados durante as etapas virtuais ou presenciais, poderao ser utilizados pela SMED e pela Prefeitura de Novo Hamburgo em seus canais oficiais (site da prefeitura, redes sociais institucionais e relatorios pedagogicos) e imprensa, estritamente para fins de promocao da educacao e ciencia, sem fins comerciais.

## 5. Com quem compartilhamos os dados?
Os dados coletados nao serao vendidos ou repassados para fins comerciais.
O compartilhamento ocorre de forma restrita e segura apenas com:
- A comissao avaliadora do evento (para atribuicao de notas).
- A gerencia da FENAC (quando necessario para controle de seguranca e acesso fisico ao pavilhao).
- Plataformas oficiais de armazenamento da prefeitura (Diretoria de Inclusao Digital).

## 6. Por quanto tempo guardamos as informacoes?
Os dados dos projetos, resumos cientificos e os nomes dos autores e orientadores serao mantidos por tempo indeterminado no repositorio digital do municipio, passando a integrar o acervo historico de iniciacao cientifica de Novo Hamburgo.
Os dados de contato (como telefones e e-mails) serao retidos apenas pelo periodo necessario para a conclusao do evento e entrega de certificados.

## 7. Seus Direitos
A qualquer momento, os professores, avaliadores ou os pais/responsaveis pelos alunos podem solicitar a confirmacao da existencia do tratamento, o acesso aos dados coletados, a correcao de informacoes desatualizadas ou a eliminacao de dados desnecessarios.

## 8. Contato do Encarregado de Dados (DPO)
Para exercer seus direitos ou tirar duvidas sobre como os dados sao tratados na FEMICTEC, voce pode entrar em contato com o Encarregado de Protecao de Dados da Prefeitura atraves do e-mail: [inserir o e-mail de contato do DPO da prefeitura, ex: lgpd@novohamburgo.rs.gov.br ou o e-mail da SMED] ou pela Ouvidoria Geral do Municipio.
```

`atualizadoEm`

`Junho de 2026`

## 4. Observacao tecnica

Tentativas de criacao/edicao via API retornaram `405 Method Not Allowed` no ambiente atual do CMS.
Sem permissao de escrita/token de admin, nao foi possivel criar automaticamente este tipo via API.
