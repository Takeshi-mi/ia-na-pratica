// Calcula as respostas das perguntas prontas da página "Pergunte aos Dados" e grava em dados.src.html (linha do marcador @PRONTOS).
// Servem de reserva quando o motor SQL do navegador não carrega. Rode de novo se mudar a geração dos dados.
// Uso: node gerar-prontos.js   (Node 22.13+ com node:sqlite)
const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const arq = path.join(__dirname, "dados.src.html");
let src = fs.readFileSync(arq, "utf8");
const ini = src.indexOf("/* ---------- dados fictícios");
const fim = src.indexOf("const PRONTOS");
if (ini < 0 || fim < 0) throw new Error("marcadores não encontrados em dados.src.html");
const stubs = `const esc = s => String(s ?? ""); const nf = v => String(v); const brl = nf, brlk = nf, pct = nf;`;
const m = new Function(stubs + src.slice(ini, fim) + "\nreturn { VENDAS, METAS, DESP, ORC, PERG, SQL_SUMIDO };")();

const db = new DatabaseSync(":memory:");
db.exec(`CREATE TABLE vendas (pedido INTEGER, data TEXT, vendedor TEXT, cliente TEXT, regiao TEXT, produto TEXT, quantidade INTEGER, valor REAL);
         CREATE TABLE metas (vendedor TEXT, mes TEXT, meta REAL);
         CREATE TABLE despesas (id INTEGER, data TEXT, categoria TEXT, fornecedor TEXT, descricao TEXT, valor REAL);
         CREATE TABLE orcamento (mes TEXT, categoria TEXT, valor REAL);`);
const ins = (t, n, rows) => { const st = db.prepare(`INSERT INTO ${t} VALUES (${Array(n).fill("?").join(",")})`); rows.forEach(r => st.run(...r)); };
ins("vendas", 8, m.VENDAS); ins("metas", 3, m.METAS); ins("despesas", 6, m.DESP); ins("orcamento", 3, m.ORC);

const out = {};
for (const sql of [...m.PERG.map(p => p.sql), m.SQL_SUMIDO]) out[sql.trim()] = db.prepare(sql).all().map(r => ({ ...r }));
src = src.replace(/(\/\*@PRONTOS\*\/).*$/m, (_, mk) => mk + JSON.stringify(out) + ";");
fs.writeFileSync(arq, src);
console.log("ok", Object.keys(out).length, "consultas gravadas");
