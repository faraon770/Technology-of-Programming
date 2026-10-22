const K = "lab8_t10";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = []) => { try { const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

let entries = load(K, []);
const list = $("#list"), err = $(".err"), view = $("#view");
$("#date").value = new Date().toISOString().slice(0, 10);

function showEntry(e) {
  view.classList.remove("hidden");
  view.replaceChildren(h("h3", {}, e.date), h("p", {}, e.text));
}
function render() {
  list.replaceChildren();
  if (!entries.length) list.append(h("div", { class: "empty" }, "Записей пока нет"));
  entries.map((e, i) => ({ ...e, i })).sort((a, b) => b.date.localeCompare(a.date)).forEach(e => list.append(h("li", {},
    h("div", { class: "grow", on: { click: () => showEntry(e) } }, h("strong", {}, e.date), h("div", { class: "muted" }, e.text.slice(0, 60) + (e.text.length > 60 ? "…" : "")) ),
    h("button", { class: "ghost", on: { click: () => { entries.splice(e.i, 1); save(entries); view.classList.add("hidden"); render(); } } }, "Удалить"))));
}
function add() {
  const date = $("#date").value, text = $("#text").value.trim();
  if (!date || !text) { err.textContent = "Укажите дату и текст записи"; return; }
  err.textContent = "";
  entries.push({ date, text });
  $("#text").value = "";
  save(entries); render();
}
$("#add").onclick = add;
render();
