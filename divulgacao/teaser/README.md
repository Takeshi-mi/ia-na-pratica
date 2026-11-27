# Teaser · projeto HyperFrames

Vídeo vertical de 21,6 s, 1080 × 1920, com fundo roxo e a logo da REN na tela final. O MP4 pronto está em [`../teaser-ia-na-pratica.mp4`](../teaser-ia-na-pratica.mp4).

- `index.html` monta as cenas (`compositions/s1.html` a `s7.html`; a `s6` saiu do corte final) e o som.
- `SPEC.md` é o roteiro técnico original; `REVIEW.md` registra cada versão e o que mudou.
- A música é "Voxel Revolution", de Kevin MacLeod ([incompetech.com](https://incompetech.com)), sob [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Efeitos sonoros

Os quatro efeitos (whoosh, pop, impact e riser) vêm da biblioteca embutida do HyperFrames e não são redistribuídos aqui. Para recuperá-los antes de renderizar:

```bash
npx hyperframes media-use resolve --type sfx --reuse c2efd9d902a59bf9 --project .   # whoosh
npx hyperframes media-use resolve --type sfx --reuse 19ab7193f626ff57 --project .   # pop
npx hyperframes media-use resolve --type sfx --reuse 634d5eda5eb7b501 --project .   # impact
npx hyperframes media-use resolve --type sfx --reuse d2f29d49f27dee7d --project .   # riser
```

Depois, copie os arquivos de `.media/audio/sfx/` para `assets/sfx/` com os nomes `whoosh.mp3`, `pop.mp3`, `impact.mp3` e `riser.mp3`, nessa ordem.

## Comandos

```bash
npx hyperframes preview   # abre o editor
npx hyperframes render -q delivery -o renders/teaser.mp4
```
