const K = "lab8_t14_best";
const P = "lab8_t14_progress";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const loadL = (k, f) => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const loadS = (k, f) => { try { return JSON.parse(sessionStorage.getItem(k)) ?? f; } catch { return f; } };

const Q = [
  { q: "Какой метод превращает объект в JSON-строку?", o: ["JSON.parse", "JSON.stringify", "JSON.toText", "Object.json"], a: 1 },
  { q: "Какой метод читает значение из localStorage?", o: ["getItem", "readItem", "fetchItem", "loadItem"], a: 0 },
  { q: "Какое хранилище живёт в рамках вкладки?", o: ["localStorage", "cookie", "sessionStorage", "IndexedDB"], a: 2 },
  { q: "Что вернёт getItem для несуществующего ключа?", o: ["0", "пустая строка", "undefined", "null"], a: 3 }
];

let progress = loadS(P, { i: 0, score: 0 });
const quiz = $("#quiz");

function finish() {
  const best = loadL(K, 0);
  if (progress.score > best) localStorage.setItem(K, JSON.stringify(progress.score));
  sessionStorage.removeItem(P);
  quiz.replaceChildren(
    h("h3", {}, "Результат: " + progress.score + " из " + Q.length),
    h("button", { on: { click: () => { progress = { i: 0, score: 0 }; render(); } } }, "Пройти заново"));
  $("#best").textContent = "Лучший результат: " + Math.max(best, progress.score) + " из " + Q.length;
}
function render() {
  if (progress.i >= Q.length) return finish();
  const item = Q[progress.i];
  quiz.replaceChildren(
    h("p", { class: "muted" }, "Вопрос " + (progress.i + 1) + " из " + Q.length),
    h("h3", {}, item.q),
    h("div", { class: "row" }, ...item.o.map((text, idx) => h("button", { class: "alt", on: { click: () => {
      if (idx === item.a) progress.score++;
      progress.i++;
      sessionStorage.setItem(P, JSON.stringify(progress));
      render();
    } } }, text))));
  $("#best").textContent = "Лучший результат: " + loadL(K, 0) + " из " + Q.length;
}
render();
