/* utilidades comuns às quatro páginas */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = s => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const nf = (v, d = 0) => Number(v).toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
const brl = v => "R$ " + nf(v, 0);
const brlk = v => Math.abs(v) >= 1e6 ? "R$ " + nf(v / 1e6, 1) + " mi" : Math.abs(v) >= 1e3 ? "R$ " + nf(v / 1e3, v >= 1e5 ? 0 : 1) + " mil" : "R$ " + nf(v, 0);
const pct = (v, d = 0) => nf(v * 100, d) + "%";

/* copiar: o texto do elemento indicado em data-copy */
function flash(btn, msg) {
  const old = btn.dataset.label || btn.textContent;
  btn.dataset.label = old;
  btn.textContent = msg;
  clearTimeout(btn._t);
  btn._t = setTimeout(() => { btn.textContent = old; }, 1800);
}
function selectEl(el) {
  if (el.select) { el.focus(); el.select(); return; }
  const r = document.createRange(); r.selectNodeContents(el);
  const s = getSelection(); s.removeAllRanges(); s.addRange(r);
}
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-copy]");
  if (!btn) return;
  const el = document.getElementById(btn.dataset.copy);
  if (!el) return;
  const text = "value" in el && el.tagName !== "PRE" ? el.value : el.innerText;
  try {
    navigator.clipboard.writeText(text).then(() => flash(btn, "Copiado"), () => { selectEl(el); flash(btn, "Use Ctrl+C"); });
  } catch (_) { selectEl(el); flash(btn, "Use Ctrl+C"); }
});

/* dica flutuante dos gráficos */
const tip = (() => { const d = document.createElement("div"); d.className = "tip"; d.hidden = true; document.body.appendChild(d); return d; })();
function showTip(e, html) {
  tip.innerHTML = html; tip.hidden = false;
  const pad = 14, w = tip.offsetWidth, h = tip.offsetHeight;
  let x = e.clientX + pad, y = e.clientY + pad;
  if (x + w > innerWidth - 8) x = e.clientX - w - pad;
  if (y + h > innerHeight - 8) y = e.clientY - h - pad;
  tip.style.left = Math.max(8, x) + "px"; tip.style.top = Math.max(8, y) + "px";
}
const hideTip = () => { tip.hidden = true; };
function bindTips(el, rows, html) {
  const on = e => { const h = e.target.closest(".hit"); if (!h) return hideTip(); showTip(e, html(rows[+h.dataset.i])); };
  el.onpointermove = on; el.onpointerdown = on; el.onpointerleave = hideTip;
}

function niceStep(max, n = 4) {
  const raw = max / n, p = Math.pow(10, Math.floor(Math.log10(raw || 1))), f = raw / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
}
const roundRight = (x, y, w, h, r) => { r = Math.min(r, w, h / 2); return `M${x},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h - r}Q${x + w},${y + h} ${x + w - r},${y + h}H${x}Z`; };
const roundTop = (x, y, w, h, r) => { r = Math.min(r, h, w / 2); return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`; };

/* barras horizontais: rows = [{label, value, ref?, tip?}] */
function hbar(el, rows, o = {}) {
  const fmt = o.fmt || (v => nf(v));
  const draw = () => {
    const W = Math.max(280, el.clientWidth || 600);
    const rowH = 34, barH = 18, top = o.refLabel ? 24 : 6, bottom = 4;
    const labW = Math.min(o.labW || 170, Math.round(W * 0.36));
    const valW = o.valW || 72, x0 = labW + 10, x1 = W - valW;
    const max = o.max || Math.max(1, ...rows.map(r => Math.max(r.value, r.ref || 0)), o.ref || 0);
    const sx = v => x0 + (x1 - x0) * Math.max(0, v) / max;
    const H = top + rows.length * rowH + bottom;
    let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(o.aria || "")}">`;
    rows.forEach((r, i) => {
      const y = top + i * rowH + (rowH - barH) / 2, w = sx(r.value) - x0;
      const lab = r.label.length > 24 ? r.label.slice(0, 23) + "…" : r.label;
      s += `<text x="${labW}" y="${y + barH / 2}" text-anchor="end" dominant-baseline="central" font-size="12.5" fill="var(--fg)">${esc(lab)}</text>`;
      if (w > 0.5) s += `<path d="${roundRight(x0, y, w, barH, 4)}" fill="${r.color || "var(--chart)"}"/>`;
      if (r.ref != null) { const xr = sx(r.ref); s += `<line x1="${xr}" x2="${xr}" y1="${y - 4}" y2="${y + barH + 4}" stroke="var(--fg)" stroke-width="2" stroke-linecap="round"/>`; }
      const xv = Math.max(sx(r.value), r.ref != null ? sx(r.ref) : 0) + 8;
      s += `<text x="${xv}" y="${y + barH / 2}" dominant-baseline="central" font-size="12" fill="var(--muted)" style="font-variant-numeric:tabular-nums">${esc(r.valueLabel || fmt(r.value))}</text>`;
    });
    s += `<line x1="${x0}" x2="${x0}" y1="${top - 2}" y2="${H - bottom}" stroke="var(--line)" stroke-width="1"/>`;
    if (o.ref != null) {
      const x = sx(o.ref);
      s += `<line x1="${x}" x2="${x}" y1="${top - 4}" y2="${H - bottom}" stroke="var(--muted)" stroke-width="1"/>`;
      s += `<text x="${Math.min(x, W - 40)}" y="${top - 12}" text-anchor="middle" font-size="11" fill="var(--muted)">${esc(o.refLabel || "")}</text>`;
    }
    rows.forEach((r, i) => { s += `<rect class="hit" data-i="${i}" x="0" y="${top + i * rowH}" width="${W}" height="${rowH}" fill="transparent"/>`; });
    el.innerHTML = s + "</svg>";
    bindTips(el, rows, r => r.tip || `<b>${esc(r.label)}</b><br>${esc(fmt(r.value))}`);
  };
  draw();
  if (!el._ro) { let lw = el.clientWidth; el._ro = new ResizeObserver(() => { if (Math.abs(el.clientWidth - lw) > 4) { lw = el.clientWidth; el._draw(); } }); el._ro.observe(el); }
  el._draw = draw;
}

/* colunas verticais: rows = [{label, value, tip?}] */
function vbar(el, rows, o = {}) {
  const fmt = o.fmt || (v => nf(v)), tick = o.tick || fmt;
  const draw = () => {
    const W = Math.max(280, el.clientWidth || 600), H = o.height || 230;
    const padL = o.padL || 58, padR = 10, padT = 22, padB = 26;
    const maxV = Math.max(1, ...rows.map(r => r.value)), step = niceStep(maxV, 5), max = Math.ceil(maxV / step) * step;
    const sy = v => padT + (H - padT - padB) * (1 - v / max);
    const band = (W - padL - padR) / rows.length, bw = Math.min(o.barW || 24, band * 0.6);
    let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(o.aria || "")}">`;
    for (let v = 0; v <= max + 1e-9; v += step) {
      const y = sy(v);
      s += `<line x1="${padL}" x2="${W - padR}" y1="${y}" y2="${y}" stroke="${v === 0 ? "var(--line)" : "var(--grid)"}" stroke-width="1"/>`;
      s += `<text x="${padL - 8}" y="${y}" text-anchor="end" dominant-baseline="central" font-size="11" fill="var(--muted)">${esc(tick(v))}</text>`;
    }
    const labelIdx = o.labelIdx || [rows.length - 1];
    rows.forEach((r, i) => {
      const cx = padL + band * i + band / 2, y = sy(r.value), h = sy(0) - y;
      if (h > 0.5) s += `<path d="${roundTop(cx - bw / 2, y, bw, h, 4)}" fill="${r.color || "var(--chart)"}"/>`;
      s += `<text x="${cx}" y="${H - 8}" text-anchor="middle" font-size="11.5" fill="var(--muted)">${esc(r.label)}</text>`;
      if (labelIdx.includes(i)) s += `<text x="${cx}" y="${y - 8}" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--fg)">${esc(fmt(r.value))}</text>`;
      s += `<rect class="hit" data-i="${i}" x="${padL + band * i}" y="${padT}" width="${band}" height="${H - padT - padB}" fill="transparent"/>`;
    });
    el.innerHTML = s + "</svg>";
    bindTips(el, rows, r => r.tip || `<b>${esc(r.label)}</b><br>${esc(fmt(r.value))}`);
  };
  draw();
  if (!el._ro) { let lw = el.clientWidth; el._ro = new ResizeObserver(() => { if (Math.abs(el.clientWidth - lw) > 4) { lw = el.clientWidth; el._draw(); } }); el._ro.observe(el); }
  el._draw = draw;
}

/* lembrar pequenas preferências do visitante, sem depender disso */
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (_) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) { } }
};
