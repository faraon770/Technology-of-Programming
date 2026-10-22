const K = "lab8_t13";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = []) => { try { const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

let lessons = load(K, []);
const list = $("#list"), err = $(".err");

function render() {
  list.replaceChildren();
  if (!lessons.length) list.append(h("div", { class: "empty" }, "Расписание пусто"));
  lessons.map((l, i) => ({ ...l, i })).sort((a, b) => a.time.localeCompare(b.time)).forEach(l => list.append(h("li", {},
    h("span", { class: "tag" }, l.time),
    h("div", { class: "grow" }, h("strong", {}, l.subject), h("div", { class: "muted" }, "Аудитория: " + l.room)),
    h("button", { class: "ghost", on: { click: () => { lessons.splice(l.i, 1); save(lessons); render(); } } }, "Удалить"))));
}
$("#add").onclick = () => {
  const subject = $("#subject").value.trim(), time = $("#time").value, room = $("#room").value.trim();
  if (!subject || !time || !room) { err.textContent = "Заполните предмет, время и аудиторию"; return; }
  err.textContent = "";
  lessons.push({ subject, time, room });
  ["subject", "time", "room"].forEach(id => $("#" + id).value = "");
  save(lessons); render();
};
render();
