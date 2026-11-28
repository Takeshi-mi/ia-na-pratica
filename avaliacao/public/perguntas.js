// As perguntas do formulário. O formulário, o painel e o servidor leem daqui:
// para mudar uma pergunta ou opção, mude só este arquivo.
// Tipos: estrelas (1 a 5), escala (0 a 10), unica, multipla, grade (itens de 1 a 5), texto, curto.

export const SECOES = [
  {
    titulo: "O evento",
    perguntas: [
      { id: "nota", tipo: "estrelas", titulo: "Que nota você dá para o evento?", obrigatoria: true },
      {
        id: "nps",
        tipo: "escala",
        titulo: "De 0 a 10, quanto você indicaria este evento para um amigo?",
        min: 0,
        max: 10,
        rotulos: ["Nada provável", "Muito provável"],
        obrigatoria: true,
      },
      {
        id: "avaliacao",
        tipo: "grade",
        titulo: "Dê uma nota de 1 a 5 para cada parte",
        itens: ["Conteúdo", "Didática do palestrante", "Mentoria na mão na massa", "Organização e local"],
      },
      { id: "duracao", tipo: "unica", titulo: "E a duração?", opcoes: ["Curta", "Na medida", "Longa"] },
    ],
  },
  {
    titulo: "O conteúdo",
    perguntas: [
      {
        id: "tecnico",
        tipo: "unica",
        titulo: "O quão técnico foi para você?",
        opcoes: ["Básico demais", "Na medida certa", "Um pouco técnico", "Técnico demais"],
        obrigatoria: true,
      },
      {
        id: "aprendeu",
        tipo: "unica",
        titulo: "Você aprendeu algo novo?",
        opcoes: ["Quase nada", "Algumas coisas", "Muita coisa", "Mudou minha forma de ver a IA"],
        obrigatoria: true,
      },
      {
        id: "gostou",
        tipo: "multipla",
        titulo: "O que você mais gostou?",
        dica: "Pode marcar várias",
        opcoes: [
          "A palestra",
          "Os exemplos reais",
          "A mão na massa",
          "A mentoria nas trilhas",
          "As apresentações dos grupos",
          "O dicionário de bolso",
          "Conhecer gente nova",
        ],
      },
      {
        id: "aplicar",
        tipo: "unica",
        titulo: "Você vai usar o que viu aqui nos próximos 30 dias?",
        opcoes: ["Já estou usando", "Sim, com certeza", "Talvez", "Acho que não"],
      },
    ],
  },
  {
    titulo: "Parte 2",
    perguntas: [
      {
        id: "parte2",
        tipo: "unica",
        titulo: "Você viria numa parte 2, mais aprofundada?",
        opcoes: ["Com certeza", "Talvez", "Não"],
        obrigatoria: true,
      },
      {
        id: "temas",
        tipo: "multipla",
        titulo: "O que você quer ver na parte 2?",
        dica: "Pode marcar várias",
        opcoes: [
          "Agentes e automações",
          "Programar com IA (Claude Code)",
          "IA no trabalho e nos estudos",
          "Criar conteúdo: vídeo, imagem e texto",
          "IA para empreender e vender",
          "Prompts avançados",
        ],
        mostrarSe: { parte2: ["Com certeza", "Talvez"] },
      },
    ],
  },
  {
    titulo: "Para fechar",
    perguntas: [
      { id: "area", tipo: "unica", titulo: "Você trabalha ou estuda na área de tecnologia?", opcoes: ["Sim", "Não"] },
      {
        id: "comentario",
        tipo: "texto",
        titulo: "Quer deixar um comentário, elogio ou crítica?",
        placeholder: "Escreva à vontade (opcional)",
        max: 2000,
      },
      { id: "nome", tipo: "curto", titulo: "Seu nome", placeholder: "Como você se chama?", max: 120, obrigatoria: true },
      {
        id: "contato",
        tipo: "curto",
        titulo: "WhatsApp ou e-mail, para avisarmos da parte 2",
        placeholder: "Opcional",
        max: 160,
        dica: "Usado só para avisar dos próximos encontros.",
      },
    ],
  },
];

export const PERGUNTAS = SECOES.flatMap((s) => s.perguntas);

// Confere e limpa uma resposta. Devolve { dados } ou { erro }.
export function validar(entrada) {
  if (!entrada || typeof entrada !== "object") return { erro: "Resposta vazia." };
  const dados = {};
  for (const p of PERGUNTAS) {
    const v = entrada[p.id];
    if (v === undefined || v === null || v === "") continue;
    if (p.tipo === "estrelas") {
      const n = Number(v);
      if (Number.isInteger(n) && n >= 1 && n <= 5) dados[p.id] = n;
    } else if (p.tipo === "escala") {
      const n = Number(v);
      if (Number.isInteger(n) && n >= p.min && n <= p.max) dados[p.id] = n;
    } else if (p.tipo === "unica") {
      if (p.opcoes.includes(v)) dados[p.id] = v;
    } else if (p.tipo === "multipla") {
      if (Array.isArray(v)) {
        const ok = [...new Set(v.filter((x) => p.opcoes.includes(x)))];
        if (ok.length) dados[p.id] = ok;
      }
    } else if (p.tipo === "grade") {
      if (typeof v === "object") {
        const g = {};
        for (const item of p.itens) {
          const n = Number(v[item]);
          if (Number.isInteger(n) && n >= 1 && n <= 5) g[item] = n;
        }
        if (Object.keys(g).length) dados[p.id] = g;
      }
    } else if (p.tipo === "texto" || p.tipo === "curto") {
      const t = String(v).trim().slice(0, p.max || 500);
      if (t) dados[p.id] = t;
    }
  }
  for (const p of PERGUNTAS) {
    if (p.mostrarSe) {
      const [chave, valores] = Object.entries(p.mostrarSe)[0];
      if (!valores.includes(dados[chave])) delete dados[p.id];
    }
  }
  const faltando = PERGUNTAS.filter((p) => p.obrigatoria && dados[p.id] === undefined);
  if (faltando.length) return { erro: "Faltou responder: " + faltando.map((p) => p.titulo).join(" / ") };
  return { dados };
}
