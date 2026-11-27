const pptxgen = process.env.HTML ? require("./shim") : require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const ri = require("react-icons/ri");
const si = require("react-icons/si");

// ACC = preenchimentos (cor da marca); ACCT = texto em destaque (tom legível sobre fundo escuro)
const TEMAS = {
  roxo: { INK: "000000", SURF: "1A1A1A", TEXT: "FFFFFF", MUTED: "B3B3B3", ACC: "8800FF", ACCT: "B57BFF", CHAT: "8C8C8C", ON: "FFFFFF" },
  laranja: { INK: "0F1115", SURF: "1C1F27", TEXT: "F4F2ED", MUTED: "A0A6B1", ACC: "FF5A36", ACCT: "FF5A36", CHAT: "7C8BA1", ON: "FFFFFF" },
  verde: { INK: "15180C", SURF: "252A17", TEXT: "F3F4EC", MUTED: "A7AC97", ACC: "8CB200", ACCT: "8CB200", CHAT: "8A9078", ON: "15180C" },
};
const TEMA = process.env.TEMA || "roxo";
const { INK, SURF, TEXT, MUTED, ACC, ACCT, CHAT, ON } = TEMAS[TEMA];
const FONT = "Arial";

async function icon(Comp, hex) {
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, { color: "#" + hex, size: "256" }));
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; // 10 x 5.625
  pres.title = "Do chat ao agente";
  pres.theme = { headFontFace: FONT, bodyFontFace: FONT };

  const T = (slide, text, opts) => slide.addText(text, Object.assign({ isTextBox: true, fontFace: FONT, color: TEXT, margin: 0, valign: "top" }, opts));
  const dot = (s, x, y, d, color) => s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { color } });
  const card = (s, x, y, w, h, opts = {}) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, Object.assign({ x, y, w, h, fill: { color: SURF }, line: { color: SURF }, rectRadius: 0.12 }, opts));
  const iconDot = (s, img, x, y, d, color) => { dot(s, x, y, d, color); s.addImage({ data: img, x: x + d * 0.24, y: y + d * 0.24, w: d * 0.52, h: d * 0.52 }); };
  const tile = (s, img, x, y, d) => { s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: d, h: d, fill: { color: "FFFFFF" }, line: { color: "FFFFFF" }, rectRadius: d * 0.22 }); s.addImage({ data: img, x: x + d * 0.2, y: y + d * 0.2, w: d * 0.6, h: d * 0.6 }); };
  let n = 0;
  const base = (label, title, source, numbered = true) => {
    const s = pres.addSlide();
    s.background = { color: INK };
    dot(s, 0.5, 0.47, 0.12, ACC);
    const kick = numbered ? `${String(++n).padStart(2, "0")} · ${label}` : label;
    T(s, kick, { x: 0.72, y: 0.4, w: 8.5, h: 0.26, fontSize: 11, bold: true, color: ACCT, charSpacing: 2 });
    T(s, title, { x: 0.5, y: 0.72, w: 9, h: 0.6, fontSize: 26, bold: true });
    if (source) T(s, source, { x: 0.5, y: 5.17, w: 9, h: 0.25, fontSize: 10, color: MUTED });
    return s;
  };
  const sunSlide = () => {
    const s = pres.addSlide();
    s.background = { color: INK };
    dot(s, 6.1, 0.55, 4.6, ACC);
    return s;
  };

  const I = {};
  for (const [k, C] of Object.entries({ tools: fa.FaTools, mem: fa.FaBrain, loop: fa.FaSyncAlt, list: fa.FaListUl, robot: fa.FaRobot, book: fa.FaBookOpen, plug: fa.FaPlug, rocket: fa.FaRocket, video: fa.FaVideo, cut: fa.FaCut, magic: fa.FaMagic, teach: fa.FaChalkboardTeacher, sign: fa.FaFileSignature, chart: fa.FaChartBar, hash: fa.FaHashtag, doc: fa.FaFileAlt }))
    I[k] = await icon(C, ON);
  I.chat = await icon(fa.FaRegCommentDots, "FFFFFF");
  I.arrow = await icon(fa.FaArrowRight, MUTED);
  const L = {
    gpt: await icon(ri.RiOpenaiFill, "000000"), claude: await icon(ri.RiClaudeFill, "D97757"), gemini: await icon(ri.RiGeminiFill, "3C7FE8"),
    llama: await icon(ri.RiMetaFill, "0467DF"), deepseek: await icon(ri.RiDeepseekFill, "4D6BFE"), qwen: await icon(si.SiQwen, "615CED"),
    mistral: await icon(si.SiMistralai, "FA520F"), sakana: await icon(fa.FaFish, "D7000F"),
  };

  // ============ PARTE 1 · INTRODUÇÃO À IA (10h00–10h30) ============

  // Capa
  {
    const s = sunSlide();
    T(s, "IA NA PRÁTICA · REN JOVENS", { x: 0.6, y: 0.85, w: 5.4, h: 0.3, fontSize: 12, bold: true, color: ACCT, charSpacing: 3 });
    T(s, "Do chat\nao agente", { x: 0.6, y: 1.3, w: 5.6, h: 2.1, fontSize: 60, bold: true, lineSpacingMultiple: 0.9 });
    T(s, "O que muda quando a IA para de só responder e começa a fazer", { x: 0.6, y: 3.55, w: 4.9, h: 0.75, fontSize: 18, color: MUTED });
    T(s, "Takeshi Miura · Sábado, 28/11/2026 · Brasília", { x: 0.6, y: 4.6, w: 5.2, h: 0.3, fontSize: 12, bold: true });
    s.addNotes("Abertura. Pergunta para a sala: quem aqui usou o ChatGPT essa semana? Agora: quem já pediu para uma IA fazer uma tarefa inteira sozinha, do começo ao fim? A diferença entre essas duas mãos levantadas é o assunto de hoje.");
  }

  // Quem está nesta sala
  {
    const s = base("O PÚBLICO", "Quem está nesta sala", "Fonte: formulário de inscrição do evento, 26 respostas até 26/11/2026");
    const stats = [["26", "pessoas inscritas"], ["23", "anos de idade mediana"], ["70%", "não são da área de tecnologia"], ["3,4", "nota média com IA (de 1 a 5)"]];
    const w = 2.0625, gap = 0.25;
    stats.forEach(([num, l], i) => {
      const x = 0.5 + i * (w + gap);
      card(s, x, 1.55, w, 1.7);
      T(s, num, { x: x + 0.2, y: 1.72, w: w - 0.4, h: 0.75, fontSize: 40, bold: true, color: ACCT });
      T(s, l, { x: x + 0.2, y: 2.5, w: w - 0.4, h: 0.65, fontSize: 14 });
    });
    T(s, "Áreas na sala", { x: 0.5, y: 3.5, w: 3, h: 0.25, fontSize: 12, bold: true, color: MUTED });
    const areas = ["Medicina", "Arquitetura", "História", "Economia", "Fonoaudiologia", "Educação Física", "Design", "Contabilidade", "Administração", "Restaurantes", "Indústria", "Acroyoga", "Engenharia", "Computação"];
    let x = 0.5, y = 3.8;
    areas.forEach((a) => {
      const cw = a.length * 0.095 + 0.36;
      if (x + cw > 9.5) { x = 0.5; y += 0.4; }
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: 0.3, fill: { color: INK }, line: { color: CHAT, width: 1 }, rectRadius: 0.15 });
      T(s, a, { x, y, w: cw, h: 0.3, fontSize: 12, align: "center", valign: "middle" });
      x += cw + 0.12;
    });
    s.addNotes("Retrato da sala tirado das inscrições. Metade é estudante; também há CLT, empreendedores e autônomos. 7 em cada 10 não trabalham com tecnologia: esta palestra é para quem não é programador. Metade se deu nota 4 ou 5 com IA: vocês já são fluentes em chat. Hoje é o próximo passo.");
  }

  // Vocês já estão à frente
  {
    const s = base("ONDE VOCÊS ESTÃO", "Vocês já estão à frente", "Fontes: Microsoft AI Diffusion Report, 2º tri 2026 · Cetic.br, TIC Domicílios 2025");
    const d = 0.22, g = 0.075;
    for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
      const on = (9 - r) * 10 + c < 19;
      dot(s, 0.5 + c * (d + g), 1.55 + r * (d + g), d, on ? ACC : SURF);
    }
    T(s, "Cada ponto = 1% das pessoas em idade de trabalhar no mundo", { x: 0.5, y: 4.55, w: 3.0, h: 0.45, fontSize: 10, color: MUTED });
    T(s, "18,8%", { x: 4.1, y: 1.45, w: 5.4, h: 0.85, fontSize: 54, bold: true, color: ACCT });
    T(s, "das pessoas em idade de trabalhar, no mundo inteiro, usam IA", { x: 4.1, y: 2.3, w: 5.2, h: 0.55, fontSize: 16 });
    T(s, "1 em 3", { x: 4.1, y: 3.1, w: 5.4, h: 0.85, fontSize: 54, bold: true });
    T(s, "internautas brasileiros já usa IA generativa: cerca de 50 milhões de pessoas", { x: 4.1, y: 3.95, w: 5.2, h: 0.55, fontSize: 16 });
    s.addNotes("Mesmo depois de 4 anos de ChatGPT, só 18,8% das pessoas em idade ativa no mundo usam IA (Microsoft, junho de 2026). No Brasil, 1 em cada 3 internautas (Cetic.br). Entre quem não usa, 58% citam falta de habilidade. Quem separou um sábado para aprender IA na prática já está fora da curva.");
  }

  // O Brasil conversa com a IA
  {
    const s = base("BRASIL", "O Brasil conversa com a IA", "Fonte: OpenAI, agosto de 2026");
    T(s, "215 milhões", { x: 0.5, y: 1.6, w: 5.6, h: 1.0, fontSize: 60, bold: true, color: ACCT });
    T(s, "de mensagens por dia enviadas ao ChatGPT por brasileiros", { x: 0.5, y: 2.7, w: 5.0, h: 0.7, fontSize: 18 });
    T(s, "O número de usuários no Brasil quase dobrou em um ano", { x: 0.5, y: 3.7, w: 5.0, h: 0.5, fontSize: 14, color: MUTED });
    s.addShape(pres.shapes.OVAL, { x: 6.4, y: 1.45, w: 3.1, h: 3.1, fill: { color: SURF }, line: { color: ACC, width: 3 } });
    T(s, "TOP 3", { x: 6.4, y: 2.3, w: 3.1, h: 0.8, fontSize: 44, bold: true, align: "center" });
    T(s, "países que mais\nusam ChatGPT", { x: 6.4, y: 3.1, w: 3.1, h: 0.6, fontSize: 14, color: MUTED, align: "center" });
    s.addNotes("Orgulho nacional: o Brasil está entre os 3 maiores mercados do ChatGPT no mundo, com cerca de 215 milhões de mensagens por dia, e a base de usuários quase dobrou em um ano (OpenAI, agosto de 2026). Só que...");
  }

  // Quase todo mundo está no chat
  {
    const s = base("O PULO", "Mas quase todo mundo ainda está no chat", "Fontes: OpenAI e Bloomberg, julho de 2026. Áreas dos círculos em escala");
    s.addShape(pres.shapes.OVAL, { x: 0.7, y: 1.45, w: 3.6, h: 3.6, fill: { color: CHAT, transparency: 55 }, line: { color: CHAT, width: 1 } });
    T(s, "1 bilhão", { x: 0.7, y: 2.75, w: 3.6, h: 0.6, fontSize: 36, bold: true, align: "center" });
    T(s, "usam a IA da OpenAI", { x: 0.7, y: 3.35, w: 3.6, h: 0.35, fontSize: 14, align: "center" });
    dot(s, 4.75, 4.69, 0.36, ACC);
    T(s, "10 milhões", { x: 5.5, y: 1.75, w: 4.0, h: 0.8, fontSize: 44, bold: true, color: ACCT });
    T(s, "usam agentes (Codex e ChatGPT Work)", { x: 5.5, y: 2.55, w: 4.0, h: 0.4, fontSize: 16 });
    T(s, "1 em cada 100", { x: 5.5, y: 3.4, w: 4.0, h: 0.6, fontSize: 28, bold: true });
    T(s, "← esse pontinho é o agente", { x: 5.25, y: 4.72, w: 4.0, h: 0.3, fontSize: 12, color: MUTED });
    s.addNotes("O dado central. A OpenAI passou de 1 bilhão de usuários em julho de 2026. No mesmo mês, os agentes dela (Codex e ChatGPT Work) somavam cerca de 10 milhões: 1 em cada 100. Os círculos estão em escala de área. Hoje vocês vão do círculo grande para o pontinho.");
  }

  // Chat x Agente
  {
    const s = base("A DIFERENÇA", "Chat × Agente", null);
    const col = (x, img, color, tcolor, label, line, analogy) => {
      card(s, x, 1.5, 4.1, 3.55, { rectRadius: 0.15 });
      iconDot(s, img, x + 0.35, 1.8, 0.7, color);
      T(s, label, { x: x + 1.25, y: 1.95, w: 2.6, h: 0.4, fontSize: 18, bold: true, color: tcolor, valign: "middle", charSpacing: 2 });
      T(s, line, { x: x + 0.35, y: 2.8, w: 3.4, h: 1.3, fontSize: 18 });
      T(s, analogy, { x: x + 0.35, y: 4.25, w: 3.4, h: 0.5, fontSize: 15, italic: true, color: MUTED });
    };
    col(0.5, I.chat, CHAT, CHAT, "CHAT", "Você pergunta, ele responde. Quem executa é você.", "É o GPS: mostra o caminho.");
    col(5.4, I.robot, ACC, ACCT, "AGENTE", "Você dá um objetivo. Ele planeja, usa ferramentas e entrega pronto.", "É o motorista: te leva até lá.");
    s.addImage({ data: I.arrow, x: 4.8, y: 3.1, w: 0.4, h: 0.4 });
    s.addNotes("Chat: você pergunta, ele responde, e você faz o trabalho. Agente: você dá um objetivo e ele faz o trabalho, usando ferramentas. O chat é o GPS; o agente é o motorista. Exemplo: no chat você pede uma fórmula de planilha; o agente abre a planilha, monta o relatório e te manda o arquivo.");
  }

  // O modelo é o motor
  {
    const s = base("O MOTOR", "O modelo é o motor. O app é o carro", null);
    const motores = [[L.claude, "Claude", "Anthropic", "App Claude, Claude Code"], [L.gpt, "GPT", "OpenAI", "ChatGPT, Codex"], [L.gemini, "Gemini", "Google", "App Gemini, NotebookLM, Antigravity"]];
    const w = 2.83, gap = 0.25;
    motores.forEach(([logo, m, quem, onde], i) => {
      const x = 0.5 + i * (w + gap);
      card(s, x, 1.55, w, 2.15);
      tile(s, logo, x + w - 0.85, 1.75, 0.6);
      T(s, "MODELO", { x: x + 0.25, y: 1.75, w: 1.6, h: 0.25, fontSize: 10, bold: true, color: MUTED, charSpacing: 2 });
      T(s, m, { x: x + 0.25, y: 2.0, w: 1.7, h: 0.65, fontSize: 34, bold: true, color: ACCT });
      T(s, "feito pela " + quem, { x: x + 0.25, y: 2.65, w: w - 0.5, h: 0.3, fontSize: 14, bold: true });
      T(s, "Onde você encontra: " + onde, { x: x + 0.25, y: 3.0, w: w - 0.5, h: 0.6, fontSize: 12, color: MUTED });
    });
    card(s, 0.5, 3.95, 9, 0.95, { fill: { color: INK }, line: { color: CHAT, width: 1 } });
    T(s, "Lovable, Cursor, Notion e muitos outros apps usam esses mesmos motores por baixo. Antes de julgar uma IA, pergunte: qual motor está rodando aqui?", { x: 0.75, y: 3.95, w: 8.5, h: 0.95, fontSize: 15, valign: "middle" });
    s.addNotes("Por trás de cada app existe um modelo, que é o motor: GPT (OpenAI), Claude (Anthropic), Gemini (Google). O app é o carro. Vários apps, como Lovable, Cursor e Notion, usam esses motores por baixo e às vezes trocam sem avisar. No ChatGPT e no Claude dá para escolher o modelo no seletor. Por isso a mesma pergunta dá respostas diferentes em apps diferentes.");
  }

  // A corrida é global
  {
    const s = base("OS MOTORES", "A corrida é global", null);
    const ms = [[L.gpt, "GPT", "OpenAI", "EUA"], [L.claude, "Claude", "Anthropic", "EUA"], [L.gemini, "Gemini", "Google", "EUA"], [L.llama, "Llama", "Meta", "EUA"],
      [L.deepseek, "DeepSeek", "DeepSeek", "CHINA"], [L.qwen, "Qwen", "Alibaba", "CHINA"], [L.mistral, "Mistral", "Mistral AI", "FRANÇA"], [L.sakana, "Sakana AI", "Sakana AI", "JAPÃO"]];
    const w = 2.0625, gap = 0.25, h = 1.45;
    ms.forEach(([logo, m, quem, pais], i) => {
      const x = 0.5 + (i % 4) * (w + gap), y = 1.45 + Math.floor(i / 4) * (h + 0.22), jp = pais === "JAPÃO";
      card(s, x, y, w, h, jp ? { line: { color: ACC, width: 2 } } : {});
      tile(s, logo, x + 0.2, y + 0.22, 0.62);
      T(s, m, { x: x + 0.95, y: y + 0.24, w: w - 1.05, h: 0.3, fontSize: 15, bold: true });
      T(s, quem, { x: x + 0.95, y: y + 0.55, w: w - 1.05, h: 0.25, fontSize: 11, color: MUTED });
      T(s, pais, { x: x + 0.2, y: y + 1.05, w: w - 0.4, h: 0.22, fontSize: 10, bold: true, color: jp ? ACCT : MUTED, charSpacing: 2 });
    });
    T(s, "A Sakana AI, de Tóquio, foi cofundada por um dos autores do Transformer: o “T” do GPT.", { x: 0.5, y: 4.85, w: 9, h: 0.3, fontSize: 14, bold: true, color: ACCT });
    s.addNotes("A corrida de modelos é global: EUA (GPT, Claude, Gemini, Llama), China (DeepSeek, Qwen), Europa (Mistral) e Japão. A Sakana AI, de Tóquio, foi cofundada por Llion Jones, um dos autores do artigo de 2017 que criou o Transformer, a arquitetura por trás do GPT (Generative Pre-trained Transformer). Outros modelos japoneses: PLaMo (Preferred Networks) e tsuzumi (NTT). Ícone da Sakana é ilustrativo (sakana = peixe).");
  }

  // Agente = modelo + harness
  {
    const s = base("O HARNESS", "Agente = modelo + harness", null);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.45, w: 5.7, h: 3.65, fill: { color: SURF }, line: { color: ACC, width: 1.5, dashType: "dash" }, rectRadius: 0.15 });
    T(s, "HARNESS", { x: 0.75, y: 1.6, w: 2, h: 0.25, fontSize: 11, bold: true, color: ACCT, charSpacing: 3 });
    dot(s, 2.75, 2.75, 1.2, ACC);
    T(s, "MODELO", { x: 2.75, y: 3.12, w: 1.2, h: 0.25, fontSize: 13, bold: true, color: ON, align: "center" });
    T(s, "o motor", { x: 2.75, y: 3.38, w: 1.2, h: 0.25, fontSize: 11, color: ON, align: "center" });
    [[I.mem, "Memória", "lembra do contexto", 0.75, 1.95], [I.tools, "Ferramentas", "conectores e web", 3.7, 1.95], [I.list, "Rotinas e skills", "instruções fixas", 0.75, 4.1], [I.loop, "Ciclo", "faz, confere, corrige", 3.7, 4.1]]
      .forEach(([img, h, d, x, y]) => {
        card(s, x, y, 2.25, 0.8, { fill: { color: INK }, line: { color: INK } });
        iconDot(s, img, x + 0.15, y + 0.17, 0.46, ACC);
        T(s, h, { x: x + 0.72, y: y + 0.14, w: 1.5, h: 0.28, fontSize: 13, bold: true });
        T(s, d, { x: x + 0.72, y: y + 0.43, w: 1.5, h: 0.28, fontSize: 10, color: MUTED });
      });
    T(s, "Harness, em inglês, é o arreio do cavalo.", { x: 6.55, y: 1.55, w: 2.95, h: 0.8, fontSize: 17, bold: true });
    T(s, "O cavalo tem a força. O arreio direciona essa força para um trabalho.", { x: 6.55, y: 2.4, w: 2.95, h: 0.9, fontSize: 14, color: MUTED });
    T(s, "Mesmo motor, harness diferente: resultado diferente.", { x: 6.55, y: 3.6, w: 2.95, h: 0.9, fontSize: 17, bold: true, color: ACCT });
    s.addNotes("Harness é tudo o que fica em volta do modelo para ele trabalhar: memória, ferramentas e conectores, rotinas e skills, e o ciclo de fazer, conferir e corrigir. A palavra vem de arreio: o cavalo tem a força, o arreio direciona. Exemplo: o mesmo Claude no chat e no Claude Code. Mesmo motor, harness diferente, e um deles programa um sistema inteiro sozinho.");
  }

  // A escada
  {
    const s = base("A ESCADA", "Do chat ao agente, degrau por degrau", null);
    [["Chat", "Você pergunta, ele responde", "ChatGPT, Claude e Gemini no modo conversa"],
      ["Conectores", "A IA lê seu e-mail, agenda, Drive e planilhas", "Apps e conectores do ChatGPT e do Claude"],
      ["Projetos e skills", "Memória e instruções fixas para um tema", "Projetos, GPTs, Gems, NotebookLM, Skills"],
      ["Agente", "Recebe um objetivo e executa sozinho", "Modo agente do ChatGPT, Claude Cowork, Codex, Lovable"]].forEach(([nome, d, ex], i) => {
      const x = 0.5 + i * 2.3, y = 2.45 - i * 0.3, top = i === 3;
      card(s, x, y, 2.1, 5.0 - y);
      s.addShape(pres.shapes.OVAL, { x: x + 0.2, y: y + 0.2, w: 0.5, h: 0.5, fill: { color: top ? ACC : INK }, line: { color: i === 0 ? CHAT : ACC, width: 1.5 } });
      T(s, String(i + 1), { x: x + 0.2, y: y + 0.2, w: 0.5, h: 0.5, fontSize: 16, bold: true, align: "center", valign: "middle", color: top ? ON : TEXT });
      T(s, nome, { x: x + 0.2, y: y + 0.85, w: 1.75, h: 0.35, fontSize: 16, bold: true, color: top ? ACCT : TEXT });
      T(s, d, { x: x + 0.2, y: y + 1.25, w: 1.75, h: 0.75, fontSize: 13 });
      T(s, ex, { x: x + 0.2, y: y + 2.05, w: 1.75, h: 0.6, fontSize: 10, color: MUTED });
    });
    T(s, "↓ aqui você já sai do chat", { x: 2.8, y: 1.8, w: 2.25, h: 0.3, fontSize: 11, bold: true, color: ACCT });
    s.addNotes("Degrau 1: chat puro. Degrau 2: conectores. Quando você conecta o Gmail ou o Drive, o modelo ganha uma ferramenta e decide sozinho quando usá-la: você já saiu do chat puro. Ainda não é um agente completo, porque não persegue um objetivo em vários passos sozinho. Degrau 3: projetos e skills dão memória e instruções fixas. Degrau 4: o agente recebe um objetivo e executa. Hoje cada um vai subir pelo menos um degrau.");
  }

  // Skills
  {
    const s = base("SKILLS", "Skills: ensine uma vez, a IA repete sempre", "Claude, Codex e outros agentes já aceitam skills. Dá para escrever a sua em português");
    T(s, "Uma skill é uma receita escrita em texto que o agente segue, passo a passo.", { x: 0.5, y: 1.3, w: 9, h: 0.35, fontSize: 15, color: MUTED });
    const ex = [[I.cut, "Edição de vídeo", "Cortes, legendas, zoom e som do que você gravou no celular"], [I.sign, "Contratos", "Contrato no seu modelo, com os dados de cada cliente"], [I.chart, "Relatórios", "O fechamento do mês no mesmo formato, toda vez"],
      [I.teach, "Tutoriais", "Vídeo-tutorial de uma tela nova, com narração"], [I.hash, "Redes sociais", "Posts e legendas no tom da sua marca"], [I.doc, "Propostas", "Proposta comercial com escopo e preço padronizados"]];
    const w = 2.83, h = 1.45, gap = 0.25;
    ex.forEach(([img, t, d], i) => {
      const x = 0.5 + (i % 3) * (w + gap), y = 1.85 + Math.floor(i / 3) * (h + 0.2);
      card(s, x, y, w, h);
      iconDot(s, img, x + 0.25, y + 0.25, 0.5, ACC);
      T(s, t, { x: x + 0.9, y: y + 0.3, w: w - 1.05, h: 0.4, fontSize: 15, bold: true, valign: "middle" });
      T(s, d, { x: x + 0.25, y: y + 0.85, w: w - 0.5, h: 0.5, fontSize: 12, color: MUTED });
    });
    s.addNotes("Skill é a parte 'rotinas' do harness. É um arquivo de texto com o passo a passo de uma tarefa: o agente lê e segue, sempre do mesmo jeito. Exemplos reais: edição de vídeo, contratos, relatórios, tutoriais, posts, propostas. Mostrar uma skill aberta para provar que é só texto. Ninguém precisa programar para escrever uma.");
  }

  // IA também faz vídeo
  {
    const s = base("VÍDEO", "IA também faz vídeo", null);
    const cols = [[I.teach, "Explicar", "Transforma uma aula, um PDF ou um link em vídeo narrado em português", "NotebookLM", "Professores e estudantes"],
      [I.cut, "Editar", "Corta, legenda e põe zoom no que você gravou com o celular", "Agente + skill de edição", "Redes sociais e eventos"],
      [I.magic, "Gerar", "Cria cenas do zero a partir de um texto", "Veo no Gemini, Sora, Kling", "Aberturas, anúncios, ideias"]];
    const w = 2.83, gap = 0.25;
    cols.forEach(([img, t, d, ferr, quem], i) => {
      const x = 0.5 + i * (w + gap);
      card(s, x, 1.5, w, 2.95);
      iconDot(s, img, x + 0.25, 1.75, 0.6, ACC);
      T(s, t, { x: x + 1.0, y: 1.8, w: w - 1.15, h: 0.5, fontSize: 20, bold: true, valign: "middle" });
      T(s, d, { x: x + 0.25, y: 2.55, w: w - 0.5, h: 0.8, fontSize: 13 });
      T(s, "COM", { x: x + 0.25, y: 3.45, w: 1, h: 0.2, fontSize: 9, bold: true, color: MUTED, charSpacing: 1 });
      T(s, ferr, { x: x + 0.25, y: 3.65, w: w - 0.5, h: 0.25, fontSize: 12, bold: true, color: ACCT });
      T(s, "Para: " + quem, { x: x + 0.25, y: 3.98, w: w - 0.5, h: 0.3, fontSize: 11, color: MUTED });
    });
    T(s, "Não precisa saber editar. Precisa saber pedir.", { x: 0.5, y: 4.7, w: 9, h: 0.4, fontSize: 18, bold: true, color: ACCT });
    s.addNotes("Três jeitos de usar IA em vídeo. Explicar: o NotebookLM transforma o material de uma aula em vídeo narrado em português, ótimo para professores. Editar: um agente com uma skill de edição corta, legenda e põe zoom no que foi gravado no celular. Gerar: Veo, Sora e Kling criam cenas do zero. Se o teaser foi mandado no grupo, revelar aqui que ele foi editado por IA e mostrar o antes e depois.");
  }

  // Velocidade
  {
    const s = base("O RITMO", "A velocidade é absurda", "Fontes: METR, Measuring AI Ability to Complete Long Tasks · Epoch AI, setembro de 2026");
    const col = (x, big, head, body) => {
      T(s, big, { x, y: 1.5, w: 4.2, h: 1.3, fontSize: 80, bold: true, color: ACCT });
      T(s, head, { x, y: 2.85, w: 4.1, h: 0.45, fontSize: 20, bold: true });
      T(s, body, { x, y: 3.4, w: 4.0, h: 1.1, fontSize: 14, color: MUTED });
    };
    col(0.5, "2×", "a cada ~7 meses", "Esse é o ritmo em que dobra o tamanho das tarefas que um agente consegue completar sozinho.");
    s.addShape(pres.shapes.LINE, { x: 5.0, y: 1.65, w: 0, h: 2.8, line: { color: SURF, width: 1.5 } });
    col(5.4, "13×", "mais barato por ano", "O custo da mesma inteligência cai cerca de 47% por trimestre. O que custava R$ 100 custa menos de R$ 8 um ano depois.");
    s.addNotes("METR: o tamanho das tarefas que agentes completam sozinhos dobra a cada cerca de 7 meses (estimativas recentes falam em ritmo até mais rápido). Epoch AI: o custo para atingir o mesmo desempenho cai cerca de 47% por trimestre, umas 13 vezes por ano. O que parece caro ou difícil hoje vai estar na mão de todo mundo amanhã. Quem aprende cedo colhe primeiro.");
  }

  // Quem constrói IA
  {
    const s = base("BASTIDORES", "Quem constrói IA já trabalha com agentes", "Fonte: OpenAI, How agents are transforming work, junho de 2026");
    T(s, "85%", { x: 0.5, y: 1.45, w: 3.8, h: 1.4, fontSize: 96, bold: true, color: ACCT });
    T(s, "de tudo que a IA gera para um funcionário médio da OpenAI já vem de um agente, não do chat", { x: 4.4, y: 1.75, w: 5.1, h: 1.0, fontSize: 18 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.4, w: 7.65, h: 0.5, fill: { color: ACC }, line: { color: ACC } });
    s.addShape(pres.shapes.RECTANGLE, { x: 8.15, y: 3.4, w: 1.35, h: 0.5, fill: { color: CHAT }, line: { color: CHAT } });
    T(s, "agente (Codex)", { x: 0.5, y: 4.0, w: 4, h: 0.3, fontSize: 14, bold: true, color: ACCT });
    T(s, "resto", { x: 8.15, y: 4.0, w: 1.35, h: 0.3, fontSize: 14, color: MUTED });
    s.addNotes("Dentro da própria OpenAI, mais de 85% do que a IA produz para um funcionário médio já sai do Codex, o agente deles, e não do chat (junho de 2026). Se o tempo estiver curto, este slide pode ser pulado.");
  }

  // O que vocês vieram buscar
  {
    const s = base("VOCÊS", "O que vocês vieram buscar", "Fonte: formulário de inscrição, múltipla escolha, 26 respostas");
    const rows = [["Produtividade nos estudos ou no trabalho", 20], ["Conhecer ferramentas e tendências", 19], ["Agentes de IA para negócios", 10], ["Prototipar um produto ou app", 9], ["Validar uma ideia de negócio", 9]];
    const bx = 4.3, bw = 4.6;
    rows.forEach(([l, v], i) => {
      const y = 1.6 + i * 0.68, hl = i === 2;
      T(s, l, { x: 0.5, y, w: 3.7, h: 0.4, fontSize: 14, bold: hl, color: hl ? ACCT : TEXT, valign: "middle" });
      s.addShape(pres.shapes.RECTANGLE, { x: bx, y: y + 0.04, w: bw, h: 0.32, fill: { color: SURF }, line: { color: SURF } });
      s.addShape(pres.shapes.RECTANGLE, { x: bx, y: y + 0.04, w: (bw * v) / 26, h: 0.32, fill: { color: hl ? ACC : CHAT }, line: { color: hl ? ACC : CHAT } });
      T(s, String(v), { x: bx + bw + 0.12, y, w: 0.5, h: 0.4, fontSize: 14, bold: true, valign: "middle" });
    });
    s.addNotes("20 de 26 querem produtividade e 19 querem conhecer ferramentas. 10 já pediram agentes para negócios, mesmo sem saber bem o que é. Depois de hoje, produtividade e agente viram a mesma conversa.");
  }

  // Ideias na sala
  {
    const s = base("IDEIAS", "Ideias que já estão na sala", "Fonte: formulário de inscrição");
    T(s, "Todas são boas candidatas a agente", { x: 0.5, y: 1.3, w: 9, h: 0.35, fontSize: 15, color: MUTED });
    const ideas = ["Sistema de RH", "Assistente pessoal de rotina, treino e estudos", "Monitoramento de máquinas industriais", "Relatórios automáticos de vendas e despesas", "Gestão de gabinetes parlamentares", "Vídeo feito com IA"];
    const w = 2.83, h = 1.45, gap = 0.25;
    ideas.forEach((t, i) => {
      const x = 0.5 + (i % 3) * (w + gap), y = 1.85 + Math.floor(i / 3) * (h + gap);
      card(s, x, y, w, h);
      dot(s, x + 0.25, y + 0.28, 0.16, ACC);
      T(s, t, { x: x + 0.25, y: y + 0.6, w: w - 0.5, h: 0.7, fontSize: 15, bold: true });
    });
    s.addNotes("Ideias que vocês mesmos escreveram na inscrição (também apareceu otimização de pesquisa no SAP). Todas têm o formato de agente: um objetivo, dados para ler e ações para executar.");
  }

  // Transição
  {
    const s = sunSlide();
    T(s, "Hoje vocês\nsaem no 1%", { x: 0.6, y: 1.1, w: 5.6, h: 1.9, fontSize: 52, bold: true, lineSpacingMultiple: 0.9 });
    T(s, "Vocês já sabem conversar com a IA. Agora vão colocar ela para trabalhar.", { x: 0.6, y: 3.15, w: 4.9, h: 0.8, fontSize: 18, color: MUTED });
    T(s, "Mão na massa →", { x: 0.6, y: 4.2, w: 4.9, h: 0.5, fontSize: 22, bold: true, color: ACCT });
    s.addNotes("Fim da parte expositiva. 1 em cada 100 usuários de IA usa agentes. Quem sair daqui tendo subido um degrau na escada entra nesse grupo. Vocês estão cedo, não atrasados.");
  }

  // ============ PARTE 2 · OFICINA ============

  // Frase
  {
    const s = pres.addSlide();
    s.background = { color: INK };
    dot(s, 7.4, 3.0, 4.2, ACC);
    T(s, "MÃO NA MASSA · 10h45–11h30", { x: 0.6, y: 0.85, w: 6, h: 0.3, fontSize: 12, bold: true, color: ACCT, charSpacing: 3 });
    s.addText([
      { text: "Ouço e esqueço.", options: { breakLine: true } },
      { text: "Vejo e lembro.", options: { breakLine: true } },
      { text: "Faço e entendo.", options: { color: ACCT } },
    ], { isTextBox: true, x: 0.6, y: 1.4, w: 6.5, h: 2.6, fontFace: FONT, fontSize: 48, bold: true, color: TEXT, margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
    T(s, "Provérbio chinês, popularmente atribuído a Confúcio", { x: 0.6, y: 4.2, w: 5.5, h: 0.3, fontSize: 13, italic: true, color: MUTED });
    s.addNotes("A versão mais conhecida é atribuída a Confúcio; a origem mais provável é o filósofo Xunzi. A partir daqui, ninguém só assiste: cada um escolhe uma trilha e faz.");
  }

  // Escolha sua trilha (4)
  {
    const s = base("OFICINA · FORMAÇÃO DOS GRUPOS", "Escolha sua trilha", "Sem notebook? As trilhas 1 e 2 funcionam bem no celular", false);
    const tr = [[I.book, "1 · Estudar melhor", "NotebookLM, ChatGPT ou Claude", "um tutor da sua matéria e um quiz"],
      [I.plug, "2 · Usar conectores", "ChatGPT ou Claude + conectores", "uma rotina que roda toda semana"],
      [I.video, "3 · Criar um vídeo", "NotebookLM, Gemini, CapCut ou Canva", "um vídeo para a aula ou para as redes"],
      [I.rocket, "4 · Construir uma tela", "Lovable ou Claude", "uma página no ar, com link"]];
    const w = 4.35, h = 1.65;
    tr.forEach(([img, t, ferr, sai], i) => {
      const x = 0.5 + (i % 2) * (w + 0.3), y = 1.45 + Math.floor(i / 2) * (h + 0.2);
      card(s, x, y, w, h);
      iconDot(s, img, x + 0.25, y + 0.25, 0.6, ACC);
      T(s, t, { x: x + 1.05, y: y + 0.3, w: w - 1.25, h: 0.45, fontSize: 17, bold: true, valign: "middle" });
      T(s, ferr, { x: x + 1.05, y: y + 0.8, w: w - 1.25, h: 0.3, fontSize: 12, color: MUTED });
      T(s, "Você sai com " + sai, { x: x + 1.05, y: y + 1.15, w: w - 1.25, h: 0.3, fontSize: 12, bold: true, color: ACCT });
    });
    s.addNotes("Quatro trilhas. 1: estudar melhor. 2: conectores, o degrau 2 da escada, que já causa um 'uau'. 3: criar um vídeo, ótimo para professores e para redes sociais. 4: construir uma tela, para quem nunca fez nem um HTML: não é um MVP, é a primeira tela funcionando. Software merece um workshop próprio.");
  }

  // Trilhas
  const trilha = (kick, title, steps, prompt, entrega, extra, notes) => {
    const s = base(kick, title, extra, false);
    steps.forEach((t, i) => {
      const y = 1.55 + i * 1.12;
      dot(s, 0.5, y, 0.5, ACC);
      T(s, String(i + 1), { x: 0.5, y, w: 0.5, h: 0.5, fontSize: 16, bold: true, align: "center", valign: "middle", color: ON });
      T(s, t, { x: 1.2, y: y - 0.02, w: 3.6, h: 0.95, fontSize: 14 });
    });
    card(s, 5.15, 1.5, 4.35, 2.5);
    T(s, "PROMPT PRONTO", { x: 5.4, y: 1.7, w: 3.9, h: 0.25, fontSize: 10, bold: true, color: ACCT, charSpacing: 2 });
    T(s, prompt, { x: 5.4, y: 2.0, w: 3.9, h: 1.9, fontSize: 14, italic: true });
    T(s, "Entrega às 11h30: " + entrega, { x: 5.15, y: 4.2, w: 4.35, h: 0.55, fontSize: 13, bold: true, color: ACCT });
    s.addNotes(notes);
  };
  trilha("TRILHA 1 · ESTUDAR", "Um tutor que leu toda a sua matéria",
    ["Crie um caderno no NotebookLM e suba PDFs, slides e anotações de uma matéria",
      "Peça um resumo em áudio, um mapa mental e um quiz para testar o que você sabe",
      "No ChatGPT ou no Claude, crie um projeto com o mesmo material e treine com o prompt ao lado"],
    "Você é meu tutor de [matéria]. Use só o material deste projeto. Me faça uma pergunta por vez, espere minha resposta e corrija explicando onde errei. Comece pelo básico e aumente a dificuldade.",
    "um caderno de estudo e um quiz da sua matéria", "Exemplo: estudante de medicina revisando fisiologia",
    "O NotebookLM responde só com base no que você subiu e gera áudio, mapa mental, quiz e flashcards. No ChatGPT há o modo estudo; no Claude, projetos com o material. É o degrau 3 da escada. Mostrar ao vivo com um PDF de aula real.");
  trilha("TRILHA 2 · CONECTAR", "A IA dentro do seu e-mail, agenda e planilhas",
    ["No ChatGPT ou no Claude, ative os conectores do Gmail, Google Agenda e Drive",
      "Peça uma tarefa que cruza informações: e-mails, compromissos e arquivos",
      "Gostou do resultado? Salve o prompt e transforme em rotina semanal"],
    "Leia meus e-mails dos últimos 7 dias e minha agenda da próxima semana. Liste o que precisa de resposta, com prazo, e sugira em que horário eu resolvo cada coisa.",
    "uma rotina semanal que economiza tempo de verdade", "Conecte só contas suas e evite dados sensíveis de terceiros",
    "É o degrau 2 da escada: com conectores a IA lê seu e-mail, agenda e Drive e decide sozinha quando consultar cada um. Para muita gente isso já é o 'uau' do dia. Reforçar privacidade: usar contas próprias.");
  trilha("TRILHA 3 · VÍDEO", "Um vídeo pronto em minutos",
    ["No NotebookLM, crie um caderno e suba o material: PDF, site ou vídeo do YouTube sobre o tema",
      "No Estúdio, gere um resumo em vídeo em português e diga o foco e o público no campo de instruções",
      "Baixe o vídeo e, se quiser, dê o toque final no CapCut ou no Canva"],
    "Faça um vídeo de até 3 minutos para [alunos do 6º ano / meus seguidores] explicando [tema], com linguagem simples, um exemplo do dia a dia e uma pergunta no final.",
    "um vídeo para a aula ou para as redes", "Quer gerar cenas do zero? Teste o Veo no app Gemini",
    "Trilha pensada para a professora e para quem quer conteúdo para redes sociais. O NotebookLM gera um vídeo narrado a partir do material; a geração leva alguns minutos, então começar por ela. Quem quiser ir além testa o Veo no Gemini para gerar cenas.");
  trilha("TRILHA 4 · CONSTRUIR", "Sua primeira tela no ar",
    ["Escreva em 3 linhas: quem vai usar, que problema resolve e o que a tela precisa ter",
      "Cole no Lovable ou peça um artefato ao Claude e veja a primeira versão nascer",
      "Teste, peça um ajuste por vez e publique o link"],
    "Crie uma página simples de [ex.: orçamento rápido para o meu restaurante] para [quem usa]. Ela precisa ter [3 coisas]. Visual limpo, em português, funcionando no celular. Use dados de exemplo.",
    "um link funcionando para mostrar", "Não é um MVP: é sua primeira tela. Quem já programa: Codex, Claude Code ou Antigravity",
    "Para quem nunca fez nem um HTML: ver uma tela nascer a partir de um texto e publicar o link. Não é hora de MVP; é a primeira tela. Dica de ouro: pedir um ajuste por vez. Quem já programa pode usar Codex, Claude Code ou Antigravity.");

  // Apresentações
  {
    const s = base("11h30 · APRESENTAÇÕES", "Mostre o que você fez", null, false);
    const q = [["1", "O problema", "O que você queria resolver"], ["2", "O que a IA fez", "Mostre na tela, ao vivo"], ["3", "O que aprendeu", "E o que vai usar na segunda-feira"]];
    const w = 2.83, gap = 0.25;
    q.forEach(([num, h, d], i) => {
      const x = 0.5 + i * (w + gap);
      card(s, x, 1.6, w, 2.6);
      T(s, num, { x: x + 0.3, y: 1.8, w: 1, h: 0.9, fontSize: 54, bold: true, color: ACCT });
      T(s, h, { x: x + 0.3, y: 2.85, w: w - 0.6, h: 0.4, fontSize: 18, bold: true });
      T(s, d, { x: x + 0.3, y: 3.3, w: w - 0.6, h: 0.6, fontSize: 14, color: MUTED });
    });
    T(s, "Não precisa estar perfeito. Precisa estar funcionando.", { x: 0.5, y: 4.5, w: 9, h: 0.4, fontSize: 18, bold: true, color: ACCT });
    s.addNotes("Roteiro para cada grupo: o problema, o que a IA fez (mostrando na tela) e o que aprendeu. Valorizar o que funcionou, não o que ficou bonito.");
  }

  await pres.writeFile({ fileName: `do-chat-ao-agente-${TEMA}.pptx` });
  console.log("ok", TEMA);
})();
