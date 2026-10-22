const K = "lab8_t1";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = []) => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

let items = load(K, []);
const list = $("#list"), input = $("#item"), err = $(".err");

function render() {
  list.replaceChildren();
  if (!items.length) { list.append(h("div", { class: "empty" }, "Список пуст — добавьте первый товар")); return; }
  items.forEach((it, i) => list.append(h("li", {},
    h("input", { type: "checkbox", ...(it.done ? { checked: "" } : {}), on: { change: () => { items[i].done = !items[i].done; save(items); render(); } } }),
    h("span", { class: "grow" + (it.done ? " done" : "") }, it.name),
    h("button", { class: "ghost", on: { click: () => { items.splice(i, 1); save(items); render(); } } }, "Удалить"))));
}
function add() {
  const t = input.value.trim();
  if (!t) { err.textContent = "Поле не может быть пустым"; return; }
  err.textContent = "";
  items.push({ name: t, done: false });
  input.value = "";
  save(items); render();
}
$("#add").onclick = add;
input.addEventListener("keydown", e => { if (e.key === "Enter") add(); });
render();
