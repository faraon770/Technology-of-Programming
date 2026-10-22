const K = "lab8_t15";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = []) => { try { const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

let films = load(K, []);
const list = $("#list"), err = $(".err"), filter = $("#filter");

function render() {
  const genres = [...new Set(films.map(f => f.genre))];
  const cur = filter.value;
  filter.replaceChildren(h("option", { value: "all" }, "Все жанры"), ...genres.map(g => h("option", { value: g }, g)));
  filter.value = genres.includes(cur) ? cur : "all";
  list.replaceChildren();
  const shown = films.map((f, i) => ({ ...f, i })).filter(f => filter.value === "all" || f.genre === filter.value);
  if (!shown.length) list.append(h("div", { class: "empty" }, "Фильмов нет"));
  shown.forEach(f => list.append(h("li", {},
    h("div", { class: "grow" }, h("strong", {}, f.title), h("div", { class: "muted" }, f.genre)),
    h("span", { class: "tag" }, "★ " + f.rating),
    h("button", { class: "ghost", on: { click: () => { films.splice(f.i, 1); save(films); render(); } } }, "Удалить"))));
}
filter.onchange = render;
$("#add").onclick = () => {
  const title = $("#title").value.trim(), genre = $("#genre").value.trim(), rating = Number($("#rating").value);
  if (!title || !genre || $("#rating").value === "" || rating < 0 || rating > 10) { err.textContent = "Заполните все поля, рейтинг от 0 до 10"; return; }
  err.textContent = "";
  films.push({ title, genre, rating });
  ["title", "genre", "rating"].forEach(id => $("#" + id).value = "");
  save(films); render();
};
render();
