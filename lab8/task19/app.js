const K = "lab8_t19";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = []) => { try { const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

let ops = load(K, []);
const list = $("#list"), err = $(".err"), monthEl = $("#month");
const today = new Date().toISOString().slice(0, 10);
$("#date").value = today;
const curMonth = today.slice(0, 7);

function render() {
  const months = [...new Set([curMonth, ...ops.map(o => o.date.slice(0, 7))])].sort().reverse();
  const cur = monthEl.value || curMonth;
  monthEl.replaceChildren(...months.map(m => h("option", { value: m }, m)));
  monthEl.value = months.includes(cur) ? cur : curMonth;
  const m = monthEl.value;
  const shown = ops.map((o, i) => ({ ...o, i })).filter(o => o.date.startsWith(m));
  list.replaceChildren();
  if (!shown.length) list.append(h("div", { class: "empty" }, "За этот месяц операций нет"));
  shown.forEach(o => list.append(h("li", {},
    h("div", { class: "grow" }, h("strong", {}, (o.type === "income" ? "+" : "−") + o.amount.toFixed(2) + " ₸ · " + o.category), h("div", { class: "muted" }, o.date)),
    h("button", { class: "alt", on: { click: () => {
      const v = Number(prompt("Новая сумма", o.amount));
      if (v > 0) { ops[o.i].amount = v; save(ops); render(); }
    } } }, "Изменить"),
    h("button", { class: "ghost", on: { click: () => { ops.splice(o.i, 1); save(ops); render(); } } }, "Удалить"))));
  const inc = shown.filter(o => o.type === "income").reduce((s, o) => s + o.amount, 0);
  const exp = shown.filter(o => o.type === "expense").reduce((s, o) => s + o.amount, 0);
  $("#inc").textContent = "Доходы: " + inc.toFixed(2) + " ₸";
  $("#exp").textContent = "Расходы: " + exp.toFixed(2) + " ₸";
  $("#bal").textContent = "Баланс: " + (inc - exp).toFixed(2) + " ₸";
}
monthEl.onchange = render;
$("#add").onclick = () => {
  const amount = Number($("#amount").value), category = $("#category").value.trim(), date = $("#date").value;
  if (!category || !(amount > 0) || !date) { err.textContent = "Заполните категорию, сумму больше нуля и дату"; return; }
  err.textContent = "";
  ops.push({ type: $("#type").value, category, amount, date });
  $("#amount").value = ""; $("#category").value = "";
  save(ops); render();
};
render();
