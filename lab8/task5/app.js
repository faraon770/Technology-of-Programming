const K = "lab8_t5";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = []) => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

let books = load(K, []);
const list = $("#list"), err = $(".err");

function render() {
  list.replaceChildren();
  if (!books.length) { list.append(h("div", { class: "empty" }, "Список избранного пуст")); return; }
  books.forEach((b, i) => list.append(h("li", {},
    h("div", { class: "grow" }, h("strong", {}, b.title), h("div", { class: "muted" }, b.author || "Автор не указан")),
    h("button", { class: "ghost", on: { click: () => { books.splice(i, 1); save(books); render(); } } }, "Удалить"))));
}
function add() {
  const title = $("#title").value.trim(), author = $("#author").value.trim();
  if (!title) { err.textContent = "Укажите название книги"; return; }
  err.textContent = "";
  books.push({ title, author });
  $("#title").value = ""; $("#author").value = "";
  save(books); render();
}
$("#add").onclick = add;
render();
