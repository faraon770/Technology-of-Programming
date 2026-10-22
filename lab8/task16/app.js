const K = "lab8_t16";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = () => { try { const v = JSON.parse(localStorage.getItem(K)) || {}; return { plan: v.plan || [], work: v.work || [], done: v.done || [] }; } catch { return { plan: [], work: [], done: [] }; } };
const save = () => localStorage.setItem(K, JSON.stringify(board));

const cols = [["plan", "План"], ["work", "В работе"], ["done", "Готово"]];
const board = load();
const boardEl = $("#board"), err = $(".err");

function move(col, i, dir) {
  const idx = cols.findIndex(c => c[0] === col);
  const target = cols[idx + dir];
  if (!target) return;
  const [card] = board[col].splice(i, 1);
  board[target[0]].push(card);
  save(); render();
}
function render() {
  boardEl.replaceChildren();
  cols.forEach(([key, title], ci) => {
    const cards = board[key];
    boardEl.append(h("div", { class: "col" },
      h("h3", {}, title + " (" + cards.length + ")"),
      h("ul", {}, ...cards.map((text, i) => h("li", {},
        h("span", { class: "grow" }, text),
        ci > 0 ? h("button", { class: "alt", on: { click: () => move(key, i, -1) } }, "←") : null,
        ci < cols.length - 1 ? h("button", { class: "alt", on: { click: () => move(key, i, 1) } }, "→") : null,
        h("button", { class: "ghost", on: { click: () => { board[key].splice(i, 1); save(); render(); } } }, "×")))),
      cards.length ? null : h("div", { class: "muted" }, "Пусто")));
  });
}
$("#add").onclick = () => {
  const text = $("#card").value.trim();
  if (!text) { err.textContent = "Введите текст карточки"; return; }
  err.textContent = "";
  board.plan.push(text);
  $("#card").value = "";
  save(); render();
};
render();
