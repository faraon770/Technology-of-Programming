const K = "lab8_t2";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = {}) => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

const f = $("#f");
const fields = ["name", "group", "city"];
const data = load(K, {});
fields.forEach(n => f.elements[n].value = data[n] ?? "");

function show() {
  const d = load(K, {});
  const out = $("#out");
  out.replaceChildren();
  if (!d.name) { out.append(h("div", { class: "empty" }, "Данных пока нет")); return; }
  out.append(h("div", { class: "card" },
    h("h3", {}, d.name),
    h("p", { class: "muted" }, "Группа: " + (d.group || "—")),
    h("p", { class: "muted" }, "Город: " + (d.city || "—"))));
}
f.addEventListener("submit", e => {
  e.preventDefault();
  const d = {};
  fields.forEach(n => d[n] = f.elements[n].value.trim());
  if (!d.name) { $(".err").textContent = "Введите имя"; return; }
  $(".err").textContent = "";
  save(d); show();
});
$("#clear").onclick = () => { localStorage.removeItem(K); fields.forEach(n => f.elements[n].value = ""); show(); };
show();
