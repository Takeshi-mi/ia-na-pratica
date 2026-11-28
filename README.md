# IA na Prática · REN Jovens

Material da oficina **IA na Prática**, da REN Jovens (Rede Nikkei Brasil), apresentada por Takeshi Miura em Brasília, no sábado, 28 de novembro de 2026.

A palestra **IA na Prática** mostra o que muda quando a IA para de só responder e começa a fazer. O público é quem já usa ChatGPT mas não é da área de tecnologia.

## Programação

| Horário | Bloco |
| --- | --- |
| 09h30 | Recepção |
| 10h00 | Introdução à IA (palestra) |
| 10h30 | IA no dia a dia e formação dos grupos |
| 10h45 | Mão na massa: as 5 trilhas, com mentoria |
| 11h30 | Apresentações dos grupos |
| 12h30 | Fechamento e almoço |

## O que tem aqui

| Pasta | Conteúdo |
| --- | --- |
| [`palestra/`](palestra/) | O deck apresentado, "IA na Prática" (39 slides), em [PDF](palestra/ia-na-pratica.pdf). O `.pptx` e o gerador em `fonte/` são a primeira versão, de 24 slides, editável no Canva |
| [`dicionario/`](dicionario/) | O "Dicionário de bolso da IA": 23 termos (inclui Git e GitHub, com links para baixar e criar conta), PDF no formato do celular para mandar antes do evento |
| [`oficina/`](oficina/) | As 5 trilhas da mão na massa (estudar, atendente, marca, cérebro + conectores e vídeo), com passos e prompts, e protótipos de projetos para as ideias do formulário |
| [`divulgacao/`](divulgacao/) | O teaser em vídeo (21,6 s, vertical), o projeto editável dele e a mensagem de aquecimento do grupo |
| [`cerebro/`](cerebro/) | O kit do cérebro: uma pasta que apresenta você para qualquer IA, preenchida por entrevista e lida no Obsidian ([cerebro.zip](cerebro/cerebro.zip)), com o caminho só pelo chat para quem não usa agente |
| [`referencias/`](referencias/) | As fontes de cada dado da palestra e os guias de prompt usados |
| [`avaliacao/`](avaliacao/) | O formulário de avaliação do fim do evento ([avalia.meyje.com.br](https://avalia.meyje.com.br)), o painel de resultados e o QR Code |
| [`skills/`](skills/) | As skills de edição de vídeo mostradas na palestra: a que monta o seu fluxo ([meyje-fluxo-de-edicao](https://github.com/Takeshi-mi/meyje-fluxo-de-edicao)) e o fluxo pronto da MEYJE ([meyje-editor-com-ia](https://github.com/Takeshi-mi/meyje-editor-com-ia)) |

## Como abrir e editar

- **Deck no Canva:** arraste `palestra/ia-na-pratica.pptx` (a primeira versão, de 24 slides) para a tela inicial do Canva. Ele importa com texto editável.
- **Deck pelo código:** em `palestra/fonte/`, rode `npm install` e depois `TEMA=roxo node build.js` (fundo preto com o roxo da MEYJE). O tema também aceita `verde` (RuralZap) ou `laranja`. Com `HTML=1`, ele gera um HTML com o mesmo layout, que vira PDF ao imprimir no navegador.
- **Dicionário:** edite `dicionario/dicionario.html` e imprima em PDF pelo Chrome ou Edge (tamanho de página 4 × 7,11 polegadas, sem margens).
- **Teaser:** em `divulgacao/teaser/`, rode `npx hyperframes preview` para editar e `npx hyperframes render` para gerar o MP4. O projeto é [HyperFrames](https://hyperframes.heygen.com); os efeitos sonoros precisam ser baixados antes (veja o README da pasta).

## Créditos e licenças

O conteúdo está sob [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) e o código sob MIT: use, adapte e compartilhe, dando o crédito. Detalhes e exceções em [`LICENSE`](LICENSE).

- **Música do teaser:** "Voxel Revolution", de Kevin MacLeod ([incompetech.com](https://incompetech.com)), licenciada sob [Creative Commons Atribuição 4.0](https://creativecommons.org/licenses/by/4.0/). Ao postar o vídeo, coloque esse crédito na legenda.
- **Marcas:** a logo da REN pertence à Rede Nikkei Brasil. As logos de OpenAI, Anthropic, Google, Meta, DeepSeek, Alibaba (Qwen) e Mistral pertencem às empresas, e aparecem aqui só para identificar os produtos.
- **Dados da palestra:** cada número tem a fonte em [`referencias/fontes-dos-dados.md`](referencias/fontes-dos-dados.md).
- **Inscrições:** os slides usam só números agregados do formulário de inscrição. Nenhum dado pessoal dos participantes está neste repositório.
