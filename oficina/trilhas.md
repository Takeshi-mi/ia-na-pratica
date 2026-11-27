# As 4 trilhas da mão na massa

São 45 minutos com mentoria. Cada pessoa escolhe uma trilha e apresenta o resultado às 11h30. Quem estiver sem notebook vai bem nas trilhas 1 e 2 pelo celular, ou em dupla.

Os prompts seguem o formato de **briefing** recomendado pelos guias atuais (ver [`../referencias/guias-de-prompt.md`](../referencias/guias-de-prompt.md)): objetivo, contexto, entrega e limites.

## 1 · Estudar melhor

**Para quem:** estudantes e quem precisa aprender rápido. **Ferramentas:** NotebookLM, ChatGPT ou Claude.

1. Crie um caderno no NotebookLM e suba PDFs, slides e anotações de uma matéria.
2. Peça um resumo em áudio, um mapa mental e um quiz para testar o que você sabe.
3. No ChatGPT ou no Claude, crie um projeto com o mesmo material e mande o briefing abaixo.

```text
Objetivo: me preparar para a prova de [matéria] da próxima semana.
Contexto: use só o material deste projeto: aulas, slides e anotações.
Entrega: plano de estudo de 5 dias e um simulado de 10 questões com gabarito comentado.
Limites: se algo não estiver no material, diga que não está. Não invente.
```

**Entrega às 11h30:** um caderno de estudo e um quiz da sua matéria.

## 2 · Usar conectores

**Para quem:** quem vive de e-mail, agenda e planilha. **Ferramentas:** ChatGPT ou Claude com conectores.

1. No ChatGPT ou no Claude, ative os conectores do Gmail, Google Agenda e Drive.
2. Mande o briefing abaixo: ele cruza e-mails e compromissos e prepara as respostas.
3. Gostou do resultado? Salve o prompt e transforme em rotina semanal.

```text
Objetivo: deixar minha próxima semana organizada.
Contexto: leia meus e-mails dos últimos 7 dias e minha agenda.
Entrega: o que precisa de resposta, com prazo, e um rascunho de cada resposta no meu tom.
Limites: não envie nem marque nada. Me mostre antes.
```

**Entrega às 11h30:** uma rotina semanal que economiza tempo de verdade. Conecte só contas suas.

## 3 · Criar um vídeo

**Para quem:** professores e quem quer conteúdo para redes. **Ferramentas:** NotebookLM, Gemini, CapCut ou Canva.

1. No NotebookLM, crie um caderno e suba o material: PDF, site ou vídeo do YouTube sobre o tema.
2. No Estúdio, gere um resumo em vídeo em português e diga o foco e o público no campo de instruções.
3. Baixe o vídeo e, se quiser, dê o toque final no CapCut ou no Canva.

```text
Objetivo: um vídeo de até 3 min sobre [tema] para [alunos do 6º ano / meus seguidores].
Contexto: use só as fontes deste caderno.
Entrega: linguagem simples, um exemplo do dia a dia e uma pergunta no final.
Limites: sem jargão; se um termo técnico for inevitável, explique em uma frase.
```

**Entrega às 11h30:** um vídeo para a aula ou para as redes. A geração leva alguns minutos, então comece por ela.

## 4 · Construir uma tela

**Para quem:** quem tem uma ideia de sistema ou negócio. **Ferramentas:** Lovable ou Claude.

1. Preencha o briefing abaixo: quem vai usar, que problema resolve e o que a tela precisa ter.
2. Cole no Lovable ou peça um artefato ao Claude e veja a primeira versão nascer.
3. Teste, peça um ajuste por vez e publique o link.

```text
Objetivo: uma página de [orçamento rápido] para [os clientes do meu restaurante].
Contexto: hoje isso é feito [no WhatsApp]; quem usa está no celular.
Entrega: uma tela funcionando, em português, com [3 coisas] e dados de exemplo.
Limites: uma tela só, sem login nem banco de dados por enquanto.
```

**Entrega às 11h30:** um link funcionando para mostrar. Não é um MVP: é a primeira tela. Quem já programa pode usar Codex, Claude Code ou Antigravity.

## Protótipos

A pasta [`prototipos/`](prototipos/) tem páginas prontas para quatro ideias do formulário: monitoramento de MTBF de máquinas, vídeo com IA, problemas no SAP e IA na base de dados. Cada uma traz um protótipo funcionando, a atividade de 45 minutos e as etapas até virar aplicação. Os HTML saem de `prototipos/fonte/` com `node montar.js`.

## Apresentações (11h30)

Cada grupo responde três perguntas, mostrando na tela: **o problema**, **o que a IA fez** e **o que você aprendeu** (e vai usar na segunda-feira). Não precisa estar perfeito; precisa estar funcionando.
