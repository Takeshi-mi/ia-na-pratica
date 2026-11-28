# Avaliação da oficina

Formulário de avaliação do fim do evento, com painel de resultados ao vivo.

- **Formulário:** https://avalia.meyje.com.br (QR Code em [`qrcode/`](qrcode/), em PNG e SVG)
- **Resultados:** https://avalia.meyje.com.br/resultados (o navegador pede usuário e senha: o usuário pode ser qualquer um, a senha está no `.env` do servidor)

## Como funciona

- `server.js`: servidor Node 24 sem dependências (`http` + `node:sqlite`). Grava cada resposta numa linha do SQLite em `dados/avaliacoes.db`.
- `public/perguntas.js`: as perguntas. Formulário, painel e validação do servidor leem dali, então para mudar uma pergunta ou opção basta mudar esse arquivo.
- `public/index.html`: o formulário (mobile first, quase tudo é tocar). Pergunta "temas da parte 2" só aparece para quem respondeu "Com certeza" ou "Talvez".
- `public/resultados.html`: o painel. Gráficos por pergunta, nota média, NPS, comentários, lista de quem respondeu (com botão de apagar respostas de teste) e exportação CSV. Atualiza sozinho a cada 15 s.

## Rodar no computador

```bash
RESULTS_PASSWORD=teste node server.js
```

Abre em http://localhost:3000 e o painel em http://localhost:3000/resultados.

## Onde está no ar

No servidor de staging (`kvm2`, 92.113.39.20), atrás do Traefik, em `/root/ia-na-pratica-avaliacao`. O DNS `avalia.meyje.com.br` é um CNAME na Cloudflare para `servidor.teste.meyje.com.br`, sem proxy (o certificado é do Let's Encrypt, pelo Traefik).

Para atualizar depois de mudar algo:

```bash
tar cf - Dockerfile compose.yml package.json server.js public | ssh kvm2 'cd /root/ia-na-pratica-avaliacao && tar xf - && docker compose up -d --build'
```

Backup do banco: `scp kvm2:/root/ia-na-pratica-avaliacao/dados/avaliacoes.db .` (ou baixe o CSV pelo painel).
