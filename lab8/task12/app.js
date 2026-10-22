const K = "lab8_t12";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = []) => { try { const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

let students = load(K, []);
const rows = $("#rows"), err = $(".err");

function render() {
  rows.replaceChildren();
  students.forEach((s, i) => rows.append(h("tr", {},
    h("td", {}, s.fio), h("td", {}, s.group), h("td", {}, String(s.score)),
    h("td", {}, h("button", { class: "ghost", on: { click: () => { students.splice(i, 1); save(students); render(); } } }, "Удалить")))));
  if (!students.length) rows.append(h("tr", {}, h("td", { colspan: "4", class: "muted" }, "Строк пока нет")));
  const avg = students.length ? (students.reduce((s, x) => s + x.score, 0) / students.length).toFixed(1) : "—";
  $("#avg").textContent = "Студентов: " + students.length + ", средний балл: " + avg;
}
$("#add").onclick = () => {
  const fio = $("#fio").value.trim(), group = $("#group").value.trim(), score = Number($("#score").value);
  if (!fio || !group || $("#score").value === "" || score < 0 || score > 100) { err.textContent = "Заполните все поля, балл от 0 до 100"; return; }
  err.textContent = "";
  students.push({ fio, group, score });
  ["fio", "group", "score"].forEach(id => $("#" + id).value = "");
  save(students); render();
};
render();
