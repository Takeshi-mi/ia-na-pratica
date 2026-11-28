# As 5 trilhas da mão na massa

São 45 minutos com mentoria, das 10h45 às 11h30, em grupos de 4. Cada grupo escolhe uma trilha e apresenta o resultado às 11h30. As trilhas vão da mais fácil à mais avançada:

| Nível | O que precisa |
| --- | --- |
| **Fácil** (1 e 2) | Funciona no celular |
| **Médio** (3 e 4) | Pelo menos 1 computador no grupo |
| **Avançado** (5) | Computador e instalação, com tutor |

Na oficina, tudo isto estava na [página das trilhas](https://claude.ai/artifact/XWXUWUgp4C6w7y3AKXsuea), aberta pelo QR Code do telão, com botão de copiar em cada prompt e os arquivos para baixar (o kit `meu-cerebro.zip` da trilha 4 e o instalador da trilha 5).

Os prompts seguem o formato de **briefing** recomendado pelos guias atuais (ver [`../referencias/guias-de-prompt.md`](../referencias/guias-de-prompt.md)): objetivo, contexto, entrega e limites.

## 1 · Estudar com IA

**Fácil · celular ou computador · individual ou em grupo.** Um tutor que leu toda a sua matéria. **Ferramentas:** [NotebookLM](https://notebooklm.google.com) e, se quiser, ChatGPT, Claude ou Gemini.

1. No NotebookLM, crie um caderno e suba o material de uma matéria: PDFs, slides, anotações ou um link do YouTube.
2. No painel **Estúdio**, gere um resumo em áudio, um mapa mental e um teste para ver o que você já sabe.
3. No chat do próprio caderno (ou num projeto do ChatGPT ou do Claude com o mesmo material), mande o briefing abaixo.
4. Faça o simulado. Errou? Peça: "Me explica a questão 4 como se eu tivesse 15 anos".

```text
Objetivo: me preparar para a prova de [MATÉRIA] em [DATA].
Contexto: use só o material deste caderno: aulas, slides e anotações. Eu tenho [X] horas por dia para estudar.
Entrega: um plano de estudo dia a dia até a prova e um simulado de 10 questões com gabarito comentado.
Limites: se algo não estiver no material, diga que não está. Não invente.
```

**Entrega às 11h30:** um plano de estudo e um simulado da sua matéria. Terminou antes? Gere um resumo em vídeo no Estúdio e mande para a turma.

## 2 · Atendente de IA para um negócio

**Fácil · celular ou computador · em grupo.** Um atendente que responde clientes 24h, com regras e limites. **Ferramentas:** MEYJEChat (a conta é criada na hora, pelo link de cadastro passado na oficina) e Claude ou ChatGPT para escrever a base.

1. Escolham um negócio, real ou inventado: restaurante, clínica, academia, loja.
2. Criem a conta no MEYJEChat e vão em **Agentes de IA → Novo agente**.
3. Preencham o modelo de instruções abaixo e colem no campo de instruções do agente.
4. Gerem a base de conhecimento com o segundo prompt (no Claude ou no ChatGPT) e colem no campo da base.
5. Ativem a ferramenta **Transferir para humano** e testem conversando com o agente.
6. **Desafio:** troquem de lugar com outro grupo e tentem fazer o atendente dele dar desconto, inventar um produto ou sair do assunto. Quem resistir melhor ganha.

```text
Você é [NOME DO ATENDENTE], atendente virtual da [NOME DO NEGÓCIO], [o que o negócio faz, em 1 frase], em [CIDADE].

## Seu objetivo
[Ex.: tirar dúvidas, passar preços e horários e agendar atendimentos.]

## Como você fala
- Mensagens curtas, como no WhatsApp: no máximo 3 frases por resposta.
- Tom [simpático e direto / formal / descontraído com emoji].
- Chame o cliente pelo nome quando souber.
- Uma pergunta por vez.

## O que você pode fazer
- Responder dúvidas usando SOMENTE a base de conhecimento.
- [Passar preços, horários e endereço.]
- [Agendar ou anotar pedidos.]

## O que você NUNCA faz
- Inventar preço, prazo, desconto, produto ou informação que não está na base.
- Prometer algo que depende de uma pessoa da equipe.
- Pedir senha, número de cartão ou documentos.
- Falar de assuntos fora do negócio (política, religião, outros sites).

## Quando chamar um humano
Transfira para a equipe quando o cliente:
- pedir para falar com uma pessoa;
- reclamar ou estiver irritado;
- pedir desconto ou negociar valor;
- perguntar algo que não está na base.
Antes de transferir, avise: "Vou chamar alguém da equipe para te ajudar, só um instante."

## Primeira mensagem
"Oi! Eu sou [NOME], da [NEGÓCIO]. Como posso te ajudar?"
```

```text
Crie a base de conhecimento de um(a) [TIPO DE NEGÓCIO] chamado(a) [NOME], em [CIDADE], para um atendente de WhatsApp. Pode inventar dados realistas, mas deixe claro que é um negócio de exemplo.

Use exatamente estas seções, em texto simples:
1. Sobre o negócio (3 linhas)
2. Endereço, horários e formas de contato
3. Produtos ou serviços com preços (lista)
4. Formas de pagamento
5. Políticas (cancelamento, troca, atraso)
6. 8 perguntas frequentes com resposta

Não use tabelas. Seja direto.
```

**Entrega às 11h30:** um atendente que responde clientes, com regras e limites.

## 3 · Crie uma marca do zero

**Médio · pelo menos 1 computador · em grupo.** Identidade, imagem, vídeo e site de uma marca nova, uns 10 minutos para cada etapa. **Ferramentas:** ChatGPT ou Gemini (identidade e imagens), [Google Flow](https://labs.google/flow) ou [Higgsfield](https://higgsfield.ai) (vídeo) e [Lovable](https://lovable.dev) (site).

Ideias de negócio: cafeteria de bairro, hamburgueria artesanal, estúdio de pilates, marca de roupa streetwear, clínica de fisioterapia, pet shop, ou uma ideia de vocês.

1. **Identidade (10 min):** no ChatGPT ou no Gemini, mandem o prompt 1 e escolham nome, slogan e cores.
2. **Imagens (10 min):** com o prompt 2, gerem o logo e uma foto para o Instagram da marca. Baixem as imagens.
3. **Vídeo (10 min):** no Google Flow ou no Higgsfield, usem a foto como quadro inicial e o prompt 3.
4. **Site (15 min):** no Lovable, colem o prompt 4 com as imagens anexadas. Depois, peçam um ajuste por vez.

```text
Prompt 1 · identidade
Crie a identidade de uma marca de [TIPO DE NEGÓCIO] em [CIDADE] para [PÚBLICO].
Me dê:
- 3 opções de nome
- um slogan para cada nome
- a personalidade da marca em 3 palavras
- uma paleta de 4 cores com o código hex
- 2 fontes do Google Fonts
No final, escreva um prompt detalhado para gerar o logo.
```

```text
Prompt 2 · logo e foto
Crie o logo da marca [NOME]: [estilo, ex.: minimalista, geométrico], nas cores [HEX], fundo branco, simples e legível em tamanho pequeno.

Depois, crie uma foto para o Instagram da [NOME]: [cena, ex.: balcão com café e luz da manhã], estilo fotográfico realista, nas cores da marca, formato quadrado, sem texto na imagem.
```

```text
Prompt 3 · vídeo (use a foto como quadro inicial)
Vídeo de 8 segundos a partir desta imagem. A câmera se aproxima devagar de [DETALHE DA CENA], com movimento suave e natural. Luz [quente da manhã / de fim de tarde], clima [aconchegante / energético]. Sem texto na tela, sem pessoas falando.
```

```text
Prompt 4 · site no Lovable
Objetivo: [um site de uma página / um cardápio digital / uma página de agendamento / um catálogo] da [NOME], [tipo de negócio] em [CIDADE].
Contexto: o público é [PÚBLICO]. Identidade: cores [HEX], fontes [FONTES], tom [PERSONALIDADE]. Use as imagens anexadas (logo e foto).
Entrega: uma página bonita e responsiva, em português, com: topo com o slogan e um botão "Falar no WhatsApp", seção sobre, produtos ou serviços com preços de exemplo, localização e rodapé.
Limites: uma página só, sem login nem banco de dados.
```

**Entrega às 11h30:** logo, vídeo e site de uma marca nova, com link. O plano grátis do Lovable tem poucos créditos por dia; se acabarem, peçam o mesmo site ao Claude, como artefato.

## 4 · Seu cérebro + conectores

**Médio · computador · cada um faz o seu.** Uma pasta no seu computador que apresenta você para a IA, mais os conectores do dia a dia. **Ferramentas:** [Claude (desktop)](https://claude.ai/download) para a entrevista e os conectores (o [Codex](https://chatgpt.com/codex) serve, mas sem conectores) e [Obsidian](https://obsidian.md), grátis, para ver o grafo.

1. Baixe o kit `meu-cerebro.zip` (pastas, modelos e a skill `/iniciar-cerebro`) na página das trilhas, descompacte e guarde a pasta **meu-cerebro** em Documentos.
2. Abra a pasta no Claude (no Cowork, escolha a pasta), no Claude Code ou no Codex.
3. Digite `/iniciar-cerebro`. Se não funcionar, cole: "Leia o arquivo CLAUDE.md desta pasta e siga o passo a passo de skills/iniciar-cerebro/SKILL.md para iniciar o meu cérebro."
4. Responda à entrevista, pode ser por áudio. A IA cria seus arquivos, projetos e a lista das suas ferramentas.
5. No Claude, vá em **Configurações → Conectores**, conecte Gmail, Google Agenda e Drive e teste com o briefing abaixo.
6. No Obsidian: **Abrir pasta como cofre** → **meu-cerebro** → **Visão de grafo**. Mostre para o grupo.
7. Teste: peça um post, um e-mail ou um plano e veja sair no seu estilo.

```text
Objetivo: deixar minha próxima semana organizada.
Contexto: leia meus e-mails dos últimos 7 dias e minha agenda. Use o que você sabe de mim nesta pasta.
Entrega: o que precisa de resposta, com prazo, e um rascunho de cada resposta no meu estilo.
Limites: não envie nem marque nada. Me mostre antes.
```

**Entrega às 11h30:** seu cérebro montado, os conectores ligados e a IA escrevendo no seu estilo. Não coloque senhas, CPF, dados bancários nem dados de outras pessoas na pasta, e conecte só contas suas. Sem o kit, a pasta [`../cerebro/`](../cerebro/) tem uma versão que monta o cérebro pelo `AGENTS.md`.

## 5 · Edição de vídeo com IA

**Avançado · computador · com tutor.** Grave um vídeo do evento no celular e deixe a IA cortar, legendar e tratar o som; você revisa no Shotcut. **Ferramentas:** Claude Code, Codex ou Antigravity com a skill `/editar` do Takeshi ([github.com/Takeshi-mi/fluxo-de-edicao-com-ia-meyje](https://github.com/Takeshi-mi/fluxo-de-edicao-com-ia-meyje)), [Shotcut](https://shotcut.org) para revisar, e FFmpeg e WhisperX, que o instalador cuida.

São uns 3 GB de download, e a IA demora para processar vídeo: rode o instalador (`instalar-edicao-ia.zip`, na página das trilhas) assim que escolher a trilha e use um vídeo curto, de 1 a 3 minutos.

1. Rode o instalador. **Windows:** dois cliques em `windows/INSTALAR.bat`. **Mac:** no Terminal, digite `bash `, arraste `mac/instalar.command` e aperte Enter. **Linux:** `bash linux/instalar.sh`. Ele pergunta o que instalar e qual agente você usa: aperte Enter para aceitar.
2. Enquanto instala, grave de 1 a 3 minutos no celular: um depoimento, um momento da oficina, você explicando o que aprendeu.
3. Crie uma pasta como `Videos/2026-11-28_IA-na-Pratica` e coloque o vídeo numa subpasta `Brutos`.
4. Abra o agente nessa pasta e chame a skill: `/editar` no Claude Code e no Antigravity, `$editar` no Codex.
5. Conte o que você quer (pode ser por áudio). A IA transcreve, propõe os cortes e gera um projeto do Shotcut e um MP4.
6. Abra o projeto no Shotcut, ajuste o que quiser e mostre o vídeo para a turma.

```text
Esse vídeo é de hoje, da oficina IA na Prática. Quero um reels vertical de até 60 segundos, com legenda palavra a palavra, cortando as pausas e os "éé". Começa pela frase mais forte. Tom animado, sem efeitos exagerados.
```

**Entrega às 11h30:** um vídeo do evento editado com IA. Para montar um fluxo de edição só seu, veja a skill [`meyje-fluxo-de-edicao`](https://github.com/Takeshi-mi/meyje-fluxo-de-edicao).

## Protótipos

A pasta [`prototipos/`](prototipos/) tem páginas prontas para quatro ideias do formulário: monitoramento de MTBF de máquinas, vídeo com IA, problemas no SAP e IA na base de dados. Cada uma traz um protótipo funcionando, uma atividade de 45 minutos e as etapas até virar aplicação. Os HTML saem de `prototipos/fonte/` com `node montar.js`.

## Apresentações (11h30)

Cada grupo tem uns 3 minutos e responde três perguntas, mostrando na tela: **o problema**, **o que a IA fez** e **o que você aprendeu** (e vai usar na segunda-feira). Não precisa estar perfeito; precisa estar funcionando.
