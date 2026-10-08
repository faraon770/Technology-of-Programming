const $ = (s) => document.querySelector(s);
const form = $("#form");
const items = $("#items");
const totalEl = $("#total");

function updateTotal() {
  let sum = 0;
  items.querySelectorAll("li").forEach((li) => {
    sum += Number(li.dataset.price) * Number(li.dataset.qty);
  });
  totalEl.textContent = `Итого: ${sum} ₸`;
}

function setQty(li, qty) {
  li.dataset.qty = qty;
  li.querySelector(".qty").textContent = qty;
  updateTotal();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#name").value.trim();
  const price = Number($("#price").value);
  if (!name || price <= 0) return;

  const li = document.createElement("li");
  li.dataset.price = price;
  li.dataset.qty = 1;
  li.innerHTML = `<span class="title"></span><button data-act="minus">-</button><span class="qty">1</span><button data-act="plus">+</button><button data-act="del" class="danger">✕</button>`;
  li.querySelector(".title").textContent = `${name} — ${price} ₸`;
  items.append(li);
  form.reset();
  updateTotal();
});

items.addEventListener("click", (e) => {
  const act = e.target.dataset.act;
  if (!act) return;
  const li = e.target.closest("li");
  const qty = Number(li.dataset.qty);
  if (act === "plus") setQty(li, qty + 1);
  if (act === "minus" && qty > 1) setQty(li, qty - 1);
  if (act === "del") { li.remove(); updateTotal(); }
});
updateTotal();
