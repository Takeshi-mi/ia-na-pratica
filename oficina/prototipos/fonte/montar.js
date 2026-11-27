// Monta as páginas: injeta base.css e base.js em cada fonte/*.src.html.
// Saída 1: prototipos/<nome>.html (documento completo, para abrir direto no navegador).
// Saída 2: prototipos/fonte/artefato/<nome>.html (sem doctype/html/body, para publicar como Artifact).
// Uso: node montar.js
const fs = require("fs");
const path = require("path");

const dir = __dirname;
const css = fs.readFileSync(path.join(dir, "base.css"), "utf8");
const js = fs.readFileSync(path.join(dir, "base.js"), "utf8");
const outLocal = path.join(dir, "..");
const outArt = path.join(dir, "artefato");
fs.mkdirSync(outArt, { recursive: true });

for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".src.html"))) {
  const nome = f.replace(".src.html", "");
  const src = fs.readFileSync(path.join(dir, f), "utf8").replace("/*@BASE_CSS*/", () => css).replace("/*@BASE_JS*/", () => js);
  const [head, body] = src.split("<!--/head-->");
  if (body === undefined) throw new Error(`${f}: falta o marcador <!--/head-->`);
  fs.writeFileSync(path.join(outArt, nome + ".html"), head + body);
  const local = `<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${head}</head>\n<body>\n${body}</body>\n</html>\n`;
  fs.writeFileSync(path.join(outLocal, nome + ".html"), local);
  console.log("ok", nome, Math.round(local.length / 1024) + " KB");
}
