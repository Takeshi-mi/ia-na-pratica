# Cérebro: uma pasta que apresenta você para a IA

A memória do ChatGPT fica dentro do ChatGPT. Se amanhã você usar o Claude ou o Gemini, começa do zero.

O cérebro é diferente: é uma **pasta no seu computador**, com arquivos de texto que dizem quem você é, no que está trabalhando e como gosta das respostas. A pasta é sua e serve para qualquer IA. A IA escreve nela, e você lê e edita no **Obsidian**.

| | Memória do app | Cérebro |
| --- | --- | --- |
| Onde fica | No servidor da empresa | No seu computador |
| Serve para | Um app só | Qualquer IA |
| Quem vê e edita | Você, por uma tela de configurações | Você, arquivo por arquivo |

## O que vem no kit

Baixe o [**cerebro.zip**](https://github.com/Takeshi-mi/ia-na-pratica/raw/main/cerebro/cerebro.zip) ou veja os arquivos na pasta [`cerebro/`](cerebro/).

```
cerebro/
├── AGENTS.md      ← as regras para a IA: o que ler, como escrever, o que não fazer
├── CLAUDE.md      ← só aponta para o AGENTS.md (o Claude Code procura este nome)
├── MAPA.md        ← a visão geral, com um link para cada nota
├── sobre-mim.md   ← quem você é e como quer as respostas
├── projetos/      ← uma nota por projeto
└── inbox/         ← anotações rápidas, para organizar depois
```

Codex, Cursor, Copilot e a maioria dos agentes leem o `AGENTS.md`. O Claude Code lê o `CLAUDE.md`, que manda ler o `AGENTS.md`. Por isso a mesma pasta serve em todos.

## Com um agente no computador (15 minutos)

Serve para Claude Code, Cowork (no app do Claude), Codex, Antigravity, Cursor ou qualquer agente que trabalhe numa pasta.

1. **Baixe e extraia** o `cerebro.zip`, por exemplo em `Documentos/cerebro`.
2. **Instale o Obsidian** ([obsidian.md](https://obsidian.md), grátis). Na primeira tela, clique em **Abrir pasta como cofre** e escolha a pasta `cerebro`.
3. **Abra a mesma pasta no seu agente** e mande:

   ```
   Leia o AGENTS.md desta pasta e monte o meu cérebro.
   ```

4. **Responda à entrevista.** São umas 10 perguntas, uma de cada vez.
5. **Volte ao Obsidian** e aperte Ctrl+G (Cmd+G no Mac): o grafo mostra as suas notas ligadas.

Daí em diante, sempre que abrir o agente nessa pasta, ele já sabe quem você é. Diga "anota isso" e ele salva no `inbox/`. Em outro projeto, peça: *"Antes de começar, leia o meu sobre-mim.md em Documentos/cerebro."*

## Só com o chat (ChatGPT, Claude ou Gemini, até no celular)

Sem agente, a IA não escreve na pasta, mas faz a entrevista do mesmo jeito. Mande:

```
Quero montar um arquivo sobre mim para usar com IA. Me entreviste com 10 perguntas,
uma de cada vez, curtas e com um exemplo de resposta: como quero ser chamado(a),
o que eu faço, meus objetivos para os próximos 6 meses, até 3 projetos em andamento,
como quero as respostas (tamanho, tom, formato), as ferramentas que uso e o que a IA
deve evitar. No fim, escreva tudo em markdown, nas minhas palavras, sem inventar nada,
com estes títulos: Quem eu sou, Objetivos, Projetos, Como quero as respostas,
Ferramentas que uso, O que a IA deve evitar.
```

Depois:

1. Copie a resposta para o `sobre-mim.md` (o Obsidian também tem app de celular).
2. Cole o mesmo texto onde a IA guarda instruções: nas instruções de um **Projeto** (ChatGPT e Claude), numa **Gem** (Gemini) ou em **Personalização** (ChatGPT).

Quando trocar de IA, o texto vai junto: ele está no seu arquivo, não no app.

## Cuidados

- **Nada de senhas, documentos ou dados bancários** no cérebro. Nem dados de outras pessoas.
- **Faça backup.** A pasta é sua: copie para o Drive ou o OneDrive, ou guarde num repositório privado no GitHub para usar em mais de um computador.
- **Revise o que a IA escreve.** O cérebro só ajuda se estiver certo. Edite no Obsidian quando algo mudar.
