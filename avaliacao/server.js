// Servidor do formulário de avaliação. Sem dependências: Node 24 (http + node:sqlite).
import http from "node:http";
import { readFile } from "node:fs/promises";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { timingSafeEqual, createHash } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import { PERGUNTAS, validar } from "./public/perguntas.js";

const RAIZ = path.dirname(fileURLToPath(import.meta.url));
const PUBLICO = path.join(RAIZ, "public");
const PORTA = Number(process.env.PORT || 3000);
const PASTA_DADOS = process.env.DATA_DIR || path.join(RAIZ, "dados");
const SENHA = process.env.RESULTS_PASSWORD || "";
if (!SENHA) console.warn("RESULTS_PASSWORD vazia: o painel de resultados fica bloqueado.");

mkdirSync(PASTA_DADOS, { recursive: true });
const db = new DatabaseSync(path.join(PASTA_DADOS, "avaliacoes.db"));
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS respostas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    criado_em TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    dados TEXT NOT NULL
  );
`);
const inserir = db.prepare("INSERT INTO respostas (dados) VALUES (?)");
const listar = db.prepare("SELECT id, criado_em, dados FROM respostas ORDER BY id");
const apagar = db.prepare("DELETE FROM respostas WHERE id = ?");

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// Limite simples por IP: 8 envios a cada 10 minutos.
const envios = new Map();
function podeEnviar(ip) {
  const agora = Date.now();
  const lista = (envios.get(ip) || []).filter((t) => agora - t < 10 * 60 * 1000);
  if (lista.length >= 8) return false;
  lista.push(agora);
  envios.set(ip, lista);
  return true;
}

function autorizado(req) {
  if (!SENHA) return false;
  const h = req.headers.authorization || "";
  if (!h.startsWith("Basic ")) return false;
  const [, senha = ""] = Buffer.from(h.slice(6), "base64").toString().split(/:(.*)/s);
  const a = createHash("sha256").update(senha).digest();
  const b = createHash("sha256").update(SENHA).digest();
  return timingSafeEqual(a, b);
}

function pedirSenha(res) {
  res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Resultados da avaliacao", charset="UTF-8"', "Content-Type": "text/plain; charset=utf-8" });
  res.end("Precisa da senha para ver os resultados.");
}

function json(res, status, corpo) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(corpo));
}

async function arquivo(res, nome, extra = {}) {
  try {
    const conteudo = await readFile(path.join(PUBLICO, nome));
    res.writeHead(200, {
      "Content-Type": TIPOS[path.extname(nome)] || "application/octet-stream",
      "Cache-Control": nome.endsWith(".html") ? "no-cache" : "public, max-age=300",
      ...extra,
    });
    res.end(conteudo);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Não encontrado.");
  }
}

function lerCorpo(req, limite = 20000) {
  return new Promise((resolve, reject) => {
    let tamanho = 0;
    const partes = [];
    req.on("data", (c) => {
      tamanho += c.length;
      if (tamanho > limite) {
        reject(new Error("grande demais"));
        req.destroy();
      } else partes.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(partes).toString("utf8")));
    req.on("error", reject);
  });
}

function linhas() {
  return listar.all().map((r) => ({ id: r.id, criado_em: r.criado_em, ...JSON.parse(r.dados) }));
}

function csv() {
  const cab = ["id", "criado_em"];
  for (const p of PERGUNTAS) {
    if (p.tipo === "grade") for (const item of p.itens) cab.push(`${p.id}: ${item}`);
    else cab.push(p.id);
  }
  const esc = (v) => {
    const s = v === undefined || v === null ? "" : String(v);
    return /[",;\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const corpo = linhas().map((r) => {
    const vals = [r.id, r.criado_em];
    for (const p of PERGUNTAS) {
      const v = r[p.id];
      if (p.tipo === "grade") for (const item of p.itens) vals.push(v?.[item]);
      else vals.push(Array.isArray(v) ? v.join(" | ") : v);
    }
    return vals.map(esc).join(",");
  });
  return "﻿" + [cab.map(esc).join(","), ...corpo].join("\r\n");
}

const servidor = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  const rota = url.pathname;
  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();

  try {
    if (req.method === "POST" && rota === "/api/respostas") {
      if (!podeEnviar(ip)) return json(res, 429, { erro: "Muitos envios seguidos. Tente de novo em alguns minutos." });
      let entrada;
      try {
        entrada = JSON.parse(await lerCorpo(req));
      } catch {
        return json(res, 400, { erro: "Não consegui ler a resposta." });
      }
      if (entrada?.site) return json(res, 200, { ok: true }); // armadilha para robôs
      const { dados, erro } = validar(entrada);
      if (erro) return json(res, 400, { erro });
      const r = inserir.run(JSON.stringify(dados));
      return json(res, 201, { ok: true, id: Number(r.lastInsertRowid) });
    }

    if (req.method === "GET" && rota === "/saude") return json(res, 200, { ok: true });

    if (rota === "/resultados" || rota.startsWith("/api/")) {
      if (!autorizado(req)) return pedirSenha(res);
      if (req.method === "GET" && rota === "/resultados") return arquivo(res, "resultados.html");
      if (req.method === "GET" && rota === "/api/respostas") return json(res, 200, { respostas: linhas() });
      if (req.method === "GET" && rota === "/api/respostas.csv") {
        res.writeHead(200, {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="avaliacao-ia-na-pratica.csv"',
          "Cache-Control": "no-store",
        });
        return res.end(csv());
      }
      const m = rota.match(/^\/api\/respostas\/(\d+)$/);
      if (req.method === "DELETE" && m) {
        apagar.run(Number(m[1]));
        return json(res, 200, { ok: true });
      }
      return json(res, 404, { erro: "Rota não encontrada." });
    }

    if (req.method === "GET" || req.method === "HEAD") {
      if (rota === "/"|| rota === "/index.html") return arquivo(res, "index.html");
      if (/^\/[\w.-]+\.(js|png|svg|ico|css)$/.test(rota)) return arquivo(res, rota.slice(1));
    }
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Não encontrado.");
  } catch (e) {
    console.error(e);
    json(res, 500, { erro: "Erro no servidor." });
  }
});

servidor.listen(PORTA, () => console.log(`Avaliação no ar na porta ${PORTA}`));
for (const s of ["SIGINT", "SIGTERM"]) process.on(s, () => servidor.close(() => process.exit(0)));
