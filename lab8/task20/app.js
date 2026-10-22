const K = "lab8_t20";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = () => { try { const v = JSON.parse(localStorage.getItem(K)); return Array.isArray(v) ? v : []; } catch { return []; } };
const save = () => localStorage.setItem(K, JSON.stringify(projects));
const STATUS = { new: "Новая", work: "В работе", done: "Готово" };

let projects = load();
const board = $("#board"), err = $(".err"), projSel = $("#proj");
let nextId = Date.now();

function render() {
  const cur = projSel.value;
  projSel.replaceChildren(...projects.map(p => h("option", { value: p.id }, p.name)));
  if (projects.some(p => String(p.id) === cur)) projSel.value = cur;
  const q = $("#search").value.trim().toLowerCase();
  board.replaceChildren();
  if (!projects.length) board.append(h("div", { class: "empty" }, "Проектов пока нет"));
  projects.forEach((p, pi) => {
    const tasks = p.tasks.map((t, ti) => ({ ...t, ti })).filter(t => t.title.toLowerCase().includes(q));
    board.append(h("div", { class: "proj" },
      h("div", { class: "row" },
        h("h3", { class: "grow" }, p.name + " · задач: " + p.tasks.length),
        h("button", { class: "ghost", on: { click: () => { projects.splice(pi, 1); save(); render(); } } }, "Удалить проект")),
      tasks.length ? h("ul", {}, ...tasks.map(t => h("li", {},
        h("span", { class: "grow" + (t.status === "done" ? " done" : "") }, t.title),
        h("span", { class: "tag" }, STATUS[t.status]),
        h("span", { class: "muted" }, t.deadline ? "до " + t.deadline : "без срока"),
        h("button", { class: "ghost", on: { click: () => { p.tasks.splice(t.ti, 1); save(); render(); } } }, "×")))) : h("p", { class: "muted" }, q ? "Совпадений нет" : "Задач пока нет")));
  });
}
$("#search").oninput = render;
$("#addp").onclick = () => {
  const name = $("#pname").value.trim();
  if (!name) { err.textContent = "Введите название проекта"; return; }
  err.textContent = "";
  projects.push({ id: nextId++, name, tasks: [] });
  $("#pname").value = "";
  save(); render();
};
$("#addt").onclick = () => {
  const title = $("#ttitle").value.trim();
  const p = projects.find(x => String(x.id) === projSel.value);
  if (!p) { err.textContent = "Сначала создайте проект"; return; }
  if (!title) { err.textContent = "Введите название задачи"; return; }
  err.textContent = "";
  p.tasks.push({ title, status: $("#status").value, deadline: $("#deadline").value });
  $("#ttitle").value = "";
  save(); render();
};
render();
