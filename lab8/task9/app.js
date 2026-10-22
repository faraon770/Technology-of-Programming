const K = "lab8_t9";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = []) => { try { const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

let ops = load(K, []);
const list = $("#list"), err = $(".err");
$("#date").value = new Date().toISOString().slice(0, 10);

function render() {
  list.replaceChildren();
  if (!ops.length) list.append(h("div", { class: "empty" }, "Операций пока нет"));
  ops.forEach((o, i) => list.append(h("li", {},
    h("div", { class: "grow" }, h("strong", {}, o.category + " — " + o.amount.toFixed(2) + " ₸"), h("div", { class: "muted" }, o.date)),
    h("button", { class: "ghost", on: { click: () => { ops.splice(i, 1); save(ops); render(); } } }, "Удалить"))));
  const total = ops.reduce((s, o) => s + o.amount, 0);
  $("#total").textContent = total.toFixed(2) + " ₸";
}
function add() {
  const raw = $("#sum").value, amount = Number(raw);
  if (!raw || !(amount > 0)) { err.textContent = "Введите сумму больше нуля"; return; }
  err.textContent = "";
  ops.push({ category: $("#cat").value, amount, date: $("#date").value });
  $("#sum").value = "";
  save(ops); render();
}
$("#add").onclick = add;
render();
