const K = "lab8_t8";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = []) => { try { const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

let tasks = load(K, []);
const list = $("#list"), err = $(".err"), filterEl = $("#filter");

function render() {
  list.replaceChildren();
  const f = filterEl.value;
  const shown = tasks.map((t, i) => ({ ...t, i })).filter(t => f === "all" || (f === "done") === t.done);
  if (!shown.length) list.append(h("div", { class: "empty" }, "Задач нет"));
  shown.forEach(t => list.append(h("li", {},
    h("span", { class: "grow" + (t.done ? " done" : "") }, t.text),
    h("span", { class: "tag" }, t.done ? "готово" : "в работе"),
    h("button", { class: "alt", on: { click: () => { tasks[t.i].done = !tasks[t.i].done; save(tasks); render(); } } }, t.done ? "Вернуть" : "Готово"),
    h("button", { class: "ghost", on: { click: () => { tasks.splice(t.i, 1); save(tasks); render(); } } }, "×"))));
  $("#cnt").textContent = "Всего: " + tasks.length + ", выполнено: " + tasks.filter(t => t.done).length;
}
function add() {
  const v = $("#t").value.trim();
  if (!v) { err.textContent = "Введите текст задачи"; return; }
  err.textContent = "";
  tasks.push({ id: Date.now(), text: v, done: false });
  $("#t").value = "";
  save(tasks); render();
}
$("#add").onclick = add;
$("#t").addEventListener("keydown", e => { if (e.key === "Enter") add(); });
filterEl.onchange = render;
render();
