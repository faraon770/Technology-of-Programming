const $ = (s) => document.querySelector(s);
const cartEl = $("#cart");
const summary = $("#summary");
const emptyEl = $("#empty");
const promoMsg = $("#promoMsg");

const items = [
  { id: 1, name: "Ноутбук", price: 350000, qty: 1 },
  { id: 2, name: "Мышь", price: 8000, qty: 2 },
  { id: 3, name: "Клавиатура", price: 15000, qty: 1 },
  { id: 4, name: "Наушники", price: 22000, qty: 1 }
];
let discount = 0;

function render() {
  cartEl.innerHTML = "";
  items.forEach((it) => {
    const li = document.createElement("li");
    li.dataset.id = it.id;
    li.innerHTML = `<span class="title"></span><button data-act="minus">-</button><span class="qty"></span><button data-act="plus">+</button><span class="price"></span><button data-act="del" class="danger">✕</button>`;
    li.querySelector(".title").textContent = it.name;
    li.querySelector(".qty").textContent = it.qty;
    li.querySelector(".price").textContent = `${it.price * it.qty} ₸`;
    cartEl.append(li);
  });

  const count = items.reduce((s, i) => s + i.qty, 0);
  const sum = items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = Math.round(sum * (1 - discount));
  emptyEl.textContent = items.length ? "" : "Корзина пуста";
  summary.textContent = `Товаров: ${count} шт. | Итого: ${total} ₸`;
}

cartEl.addEventListener("click", (e) => {
  const act = e.target.dataset.act;
  if (!act) return;
  const id = Number(e.target.closest("li").dataset.id);
  const idx = items.findIndex((i) => i.id === id);
  if (act === "plus") items[idx].qty++;
  if (act === "minus" && items[idx].qty > 1) items[idx].qty--;
  if (act === "del") items.splice(idx, 1);
  render();
});

// доп. функция: промокод
function applyPromo() {
  const code = $("#promo").value.trim().toUpperCase();
  discount = code === "STUDENT" ? 0.1 : 0;
  promoMsg.textContent = discount ? "Промокод применён: скидка 10%" : "Неверный промокод";
  render();
}
$("#applyPromo").addEventListener("click", applyPromo);
$("#promo").addEventListener("keydown", (e) => { if (e.key === "Enter") applyPromo(); });
render();
