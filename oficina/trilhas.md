# As 4 trilhas da mão na massa

São 45 minutos com mentoria. Cada pessoa escolhe uma trilha e apresenta o resultado às 11h30. Quem estiver sem notebook vai bem nas trilhas 1 e 2 pelo celular, ou em dupla.

Os prompts seguem o formato de **briefing** recomendado pelos guias atuais (ver [`../referencias/guias-de-prompt.md`](../referencias/guias-de-prompt.md)): objetivo, contexto, entrega e limites.

## 1 · Estudar melhor

**Para quem:** estudantes e quem precisa aprender rápido. **Ferramentas:** NotebookLM, ChatGPT ou Claude.

1. Crie um caderno no NotebookLM e suba PDFs, slides e anotações de uma matéria.
2. Peça um resumo em áudio, um mapa mental e um quiz para testar o que você sabe.
3. No ChatGPT ou no Claude, crie um projeto com o mesmo material e treine com o prompt abaixo.

```text
Você é meu tutor de [matéria]. Use só o material deste projeto. Me faça uma pergunta
por vez, espere minha resposta e corrija explicando onde errei. Comece pelo básico
e aumente a dificuldade.
```

**Entrega às 11h30:** um caderno de estudo e um quiz da sua matéria.

## 2 · Usar conectores

**Para quem:** quem vive de e-mail, agenda e planilha. **Ferramentas:** ChatGPT ou Claude com conectores.

1. No ChatGPT ou no Claude, ative os conectores do Gmail, Google Agenda e Drive.
2. Peça uma tarefa que cruza informações: e-mails, compromissos e arquivos.
3. Gostou do resultado? Salve o prompt e transforme em rotina semanal.

```text
Leia meus e-mails dos últimos 7 dias e minha agenda da próxima semana. Liste o que
precisa de resposta, com prazo, e sugira em que horário eu resolvo cada coisa.
```

**Entrega às 11h30:** uma rotina semanal que economiza tempo de verdade. Conecte só contas suas.

## 3 · Criar um vídeo

**Para quem:** professores e quem quer conteúdo para redes. **Ferramentas:** NotebookLM, Gemini, CapCut ou Canva.

1. No NotebookLM, crie um caderno e suba o material: PDF, site ou vídeo do YouTube sobre o tema.
2. No Estúdio, gere um resumo em vídeo em português e diga o foco e o público no campo de instruções.
3. Baixe o vídeo e, se quiser, dê o toque final no CapCut ou no Canva.

```text
Faça um vídeo de até 3 minutos para [alunos do 6º ano / meus seguidores] explicando
[tema], com linguagem simples, um exemplo do dia a dia e uma pergunta no final.
```

**Entrega às 11h30:** um vídeo para a aula ou para as redes. A geração leva alguns minutos, então comece por ela.

## 4 · Construir uma tela

**Para quem:** quem tem uma ideia de sistema ou negócio. **Ferramentas:** Lovable ou Claude.

1. Escreva em 3 linhas: quem vai usar, que problema resolve e o que a tela precisa ter.
2. Cole no Lovable ou peça um artefato ao Claude e veja a primeira versão nascer.
3. Teste, peça um ajuste por vez e publique o link.

```text
Crie uma página simples de [ex.: orçamento rápido para o meu restaurante] para
[quem usa]. Ela precisa ter [3 coisas]. Visual limpo, em português, funcionando
no celular. Use dados de exemplo.
```

**Entrega às 11h30:** um link funcionando para mostrar. Não é um MVP: é a primeira tela. Quem já programa pode usar Codex, Claude Code ou Antigravity.

## Protótipos

A pasta [`prototipos/`](prototipos/) tem páginas prontas para quatro ideias do formulário: monitoramento de MTBF de máquinas, vídeo com IA, problemas no SAP e IA na base de dados. Cada uma traz um protótipo funcionando, a atividade de 45 minutos e as etapas até virar aplicação. Os HTML saem de `prototipos/fonte/` com `node montar.js`.

## Apresentações (11h30)

Cada grupo responde três perguntas, mostrando na tela: **o problema**, **o que a IA fez** e **o que você aprendeu** (e vai usar na segunda-feira). Não precisa estar perfeito; precisa estar funcionando.
