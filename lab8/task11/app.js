const K = "lab8_t11";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const load = (k = K, f = []) => { try { const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

const products = [
  { name: "Наушники", price: 15000 }, { name: "Мышка", price: 7000 },
  { name: "Клавиатура", price: 12000 }, { name: "Флешка 64 ГБ", price: 3500 }
];
products.forEach((p, i) => $("#prod").append(h("option", { value: i }, p.name + " — " + p.price + " ₸")));

let cart = load(K, []);
const list = $("#list"), err = $(".err");

function render() {
  list.replaceChildren();
  if (!cart.length) list.append(h("div", { class: "empty" }, "Корзина пуста"));
  cart.forEach((c, i) => list.append(h("li", {},
    h("div", { class: "grow" }, h("strong", {}, c.name), h("div", { class: "muted" }, c.price + " ₸ × " + c.qty + " = " + (c.price * c.qty) + " ₸")),
    h("button", { class: "alt", on: { click: () => change(i, -1) } }, "−"),
    h("span", { class: "tag" }, String(c.qty)),
    h("button", { class: "alt", on: { click: () => change(i, 1) } }, "+"),
    h("button", { class: "ghost", on: { click: () => { cart.splice(i, 1); save(cart); render(); } } }, "×"))));
  $("#total").textContent = cart.reduce((s, c) => s + c.price * c.qty, 0) + " ₸";
}
function change(i, d) {
  cart[i].qty += d;
  if (cart[i].qty < 1) cart.splice(i, 1);
  save(cart); render();
}
$("#add").onclick = () => {
  const qty = parseInt($("#qty").value, 10);
  if (!(qty >= 1)) { err.textContent = "Количество должно быть не меньше 1"; return; }
  err.textContent = "";
  const p = products[Number($("#prod").value)];
  const found = cart.find(c => c.name === p.name);
  if (found) found.qty += qty; else cart.push({ name: p.name, price: p.price, qty });
  save(cart); render();
};
$("#clear").onclick = () => { cart = []; localStorage.removeItem(K); render(); };
render();
