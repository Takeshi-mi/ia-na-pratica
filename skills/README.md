# Skills

Uma skill é uma receita escrita em texto que o agente segue passo a passo. Na palestra elas aparecem como exemplo do que dá para fazer: editar vídeo, gerar contrato, montar relatório.

As skills **não ficam neste repositório**. Elas continuam sendo usadas e melhoradas depois do evento, então cada uma vive no próprio repositório, com versão e instalação independentes.

## Edição de vídeo

| Repositório | O que é | Para quem |
| --- | --- | --- |
| [meyje-fluxo-de-edicao](https://github.com/Takeshi-mi/meyje-fluxo-de-edicao) | A skill que **monta o seu fluxo** de edição: entrevista, referências, plano e as skills de cada etapa, no seu estilo. Tem trilha pronta para evento gravado no celular e revisão no Shotcut (grátis) | Quem quer editar vídeo com o Claude Code |
| [meyje-editor-com-ia](https://github.com/Takeshi-mi/meyje-editor-com-ia) | O **fluxo pronto** que essa skill montou para os eventos da MEYJE: `/editar` e as 9 etapas `edit-*` | Quem quer ver como fica o resultado |

### Instalar a skill de montagem

No Claude Code, cole:

```
Instala esta skill para mim: https://github.com/Takeshi-mi/meyje-fluxo-de-edicao (a skill está na pasta skills/fluxo-de-edicao)
```

Ou instale como plugin:

```
/plugin marketplace add Takeshi-mi/meyje-fluxo-de-edicao
/plugin install fluxo-de-edicao@meyje-fluxo-de-edicao
```

Depois, digite `/fluxo-de-edicao` e siga a conversa.

## Créditos
A skill de montagem é a edição MEYJE de [fluxo-de-edicao](https://github.com/LeiteZ/fluxo-de-edicao), de Lucas Leite (MIT).
