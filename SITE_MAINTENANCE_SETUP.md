# Setup - Modo de Indisponibilidade do Site

O frontend ja esta preparado para exibir um estado de manutencao em nivel de site.

## Como ativar

Defina uma destas variaveis de ambiente como `true`:

- `SITE_MAINTENANCE_MODE`
- `NEXT_PUBLIC_SITE_MAINTENANCE_MODE`

Exemplo:

```env
SITE_MAINTENANCE_MODE=true
```

## Comportamento

Quando o modo estiver ativo:

- o site inteiro exibe uma tela unica de indisponibilidade;
- `Navbar` e `Footer` nao sao renderizados;
- o visitante recebe uma mensagem clara de manutencao.

## Estado dos conteudos

Sem o modo global, as paginas que dependem do CMS ja exibem estados proprios de indisponibilidade quando nao ha conteudo publicado:

- Politica de Privacidade
- Termo de Uso
- Regulamentos
- Noticias
- Galeria
- Eventos da Feira
- Localizacao
