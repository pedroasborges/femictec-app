# Templates para Strapi (Single Type `Contato`)

Cole estes valores nos campos:

## `notificacaoAssuntoTemplate`
```text
[FEMICTEC] Novo contato - {assunto}
```

## `notificacaoMensagemTemplate`
```text
Novo contato recebido pelo site FEMICTEC.

Nome: {nome}
Email: {email}
Assunto: {assunto}

Mensagem:
{mensagem}
```

## `confirmacaoAssuntoTemplate`
```text
Recebemos sua mensagem - FEMICTEC
```

## `confirmacaoMensagemTemplate`
```text
Ola, {nome}.

Recebemos sua mensagem com sucesso e ela foi encaminhada para nossa equipe.
Se necessario, retornaremos por este email.

Assunto informado: {assunto}
```

## Destinatarios institucionais

No campo `email` do contato, informe o email institucional principal (ex.: `femictec@novohamburgo.rs.gov.br`).

Se quiser mais de um destinatario, preencha tambem `destinatariosEvento` com emails validos.
