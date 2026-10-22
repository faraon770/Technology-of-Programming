const K = "lab8_t18";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = []) => { try { const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

let bookings = load(K, []);
const list = $("#list"), err = $(".err");

function render() {
  list.replaceChildren();
  if (!bookings.length) list.append(h("div", { class: "empty" }, "Бронирований нет"));
  bookings.map((b, i) => ({ ...b, i })).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).forEach(b => list.append(h("li", {},
    h("div", { class: "grow" }, h("strong", {}, b.room), h("div", { class: "muted" }, b.date + " в " + b.time)),
    h("button", { class: "ghost", on: { click: () => { bookings.splice(b.i, 1); save(bookings); render(); } } }, "Отменить"))));
}
$("#add").onclick = () => {
  const date = $("#date").value, time = $("#time").value, room = $("#room").value;
  if (!date || !time) { err.textContent = "Укажите дату и время"; return; }
  if (bookings.some(b => b.date === date && b.time === time && b.room === room)) {
    err.textContent = "Конфликт: «" + room + "» уже занята на " + date + " в " + time;
    return;
  }
  err.textContent = "";
  bookings.push({ date, time, room });
  save(bookings); render();
};
render();
