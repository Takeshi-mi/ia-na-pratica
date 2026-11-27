// Imita a API do pptxgenjs usada em build.js e grava um HTML com o mesmo layout (em polegadas),
// para gerar PDF pelo Edge e para conferir o visual.
const fs = require("fs");
const o_gap = (o) => (o && o.paraSpaceAfter) || 0;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
const rgba = (hex, tr = 0) => {
  const n = parseInt(hex, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${1 - tr / 100})`;
};
class Slide {
  constructor() { this.els = []; this.background = { color: "FFFFFF" }; }
  addShape(type, o) {
    const st = [`left:${o.x}in`, `top:${o.y}in`];
    if (type === "line") {
      st.push(`width:0`, `height:${o.h}in`, `border-left:${o.line.width || 1}pt solid #${o.line.color}`);
    } else {
      st.push(`width:${o.w}in`, `height:${o.h}in`, `box-sizing:border-box`);
      if (o.fill) st.push(`background:${rgba(o.fill.color, o.fill.transparency || 0)}`);
      if (o.line && o.line.color && (o.line.width || 0) > 0) st.push(`border:${o.line.width}pt ${o.line.dashType ? "dashed" : "solid"} #${o.line.color}`);
      if (type === "oval") st.push("border-radius:50%");
      if (type === "rr") st.push(`border-radius:${o.rectRadius || 0.1}in`);
    }
    this.els.push(`<div style="position:absolute;${st.join(";")}"></div>`);
  }
  addText(text, o) {
    const jc = { top: "flex-start", middle: "center", bottom: "flex-end" }[o.valign || "top"];
    const st = [`left:${o.x}in`, `top:${o.y}in`, `width:${o.w}in`, `height:${o.h}in`, `display:flex`, `flex-direction:column`, `justify-content:${jc}`,
      `font-family:${o.fontFace || "Arial"},sans-serif`, `font-size:${o.fontSize}pt`, `color:#${o.color}`, `text-align:${o.align || "left"}`,
      `line-height:${1.2 * (o.lineSpacingMultiple || 1)}`];
    if (o.bold) st.push("font-weight:700");
    if (o.italic) st.push("font-style:italic");
    if (o.charSpacing) st.push(`letter-spacing:${o.charSpacing}pt`);
    let body;
    if (Array.isArray(text)) {
      // agrupa os trechos em parágrafos (quebra em breakLine), com negrito, itálico e cor por trecho
      const paras = [[]];
      text.forEach((r) => {
        const o = r.options || {};
        const st2 = [o.color ? `color:#${o.color}` : "", o.bold ? "font-weight:700" : "", o.italic ? "font-style:italic" : ""].filter(Boolean).join(";");
        paras[paras.length - 1].push(`<span style="${st2}">${esc(r.text)}</span>`);
        if (o.breakLine) paras.push([]);
      });
      const gap = o_gap(o);
      body = paras.filter((p) => p.length).map((p, i, a) => `<div style="margin-bottom:${i < a.length - 1 ? gap : 0}pt">${p.join("")}</div>`).join("");
    } else body = esc(text);
    this.els.push(`<div style="position:absolute;${st.join(";")}"><div>${body}</div></div>`);
  }
  addImage(o) {
    this.els.push(`<img src="data:${o.data}" style="position:absolute;left:${o.x}in;top:${o.y}in;width:${o.w}in;height:${o.h}in">`);
  }
  addNotes() {}
}
module.exports = class {
  constructor() { this.slides = []; this.shapes = { OVAL: "oval", ROUNDED_RECTANGLE: "rr", RECTANGLE: "rect", LINE: "line" }; }
  addSlide() { const s = new Slide(); this.slides.push(s); return s; }
  async writeFile({ fileName }) {
    const pages = this.slides.map((s) => `<section style="background:#${s.background.color}">${s.els.join("")}</section>`).join("\n");
    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${esc(this.title || "deck")}</title><style>
@page{size:10in 5.625in;margin:0}html,body{margin:0;padding:0}
section{position:relative;width:10in;height:5.625in;overflow:hidden;page-break-after:always;break-after:page}
</style></head><body>${pages}</body></html>`;
    fs.writeFileSync(fileName.replace(/\.pptx$/, ".html"), html);
  }
};
