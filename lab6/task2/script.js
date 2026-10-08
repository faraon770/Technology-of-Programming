const $ = (s) => document.querySelector(s);
const valueEl = $("#value");
const history = $("#history");
let count = 0;

function render(action) {
  valueEl.textContent = count;
  valueEl.classList.toggle("positive", count > 0);
  valueEl.classList.toggle("negative", count < 0);
  const li = document.createElement("li");
  li.textContent = `${action} → ${count}`;
  history.prepend(li);
  while (history.children.length > 5) history.lastElementChild.remove();
}

const change = (delta, name) => { count += delta; render(name); };
const reset = () => { count = 0; render("Сброс"); };

$("#plus").addEventListener("click", () => change(1, "+1"));
$("#minus").addEventListener("click", () => change(-1, "-1"));
$("#reset").addEventListener("click", reset);
document.addEventListener("keydown", (e) => {
  if (e.key === "+" || e.key === "=") change(1, "+1");
  if (e.key === "-") change(-1, "-1");
  if (e.key === "0") reset();
});
