const $ = (s) => document.querySelector(s);
const display = $("#display");
const keys = $("#keys");
const history = $("#history");

const layout = ["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+","C"];
let cur = "0", prev = null, op = null, fresh = false;

layout.forEach((k) => {
  const b = document.createElement("button");
  b.textContent = k;
  b.dataset.key = k;
  if ("/*-+=".includes(k)) b.classList.add("op");
  if (k === "C") b.classList.add("clear");
  keys.append(b);
});

function calc(a, b, o) {
  if (o === "+") return a + b;
  if (o === "-") return a - b;
  if (o === "*") return a * b;
  if (o === "/") return b === 0 ? NaN : a / b;
}

function compute() {
  const b = Number(cur);
  const result = calc(prev, b, op);
  if (Number.isNaN(result)) {
    cur = "Ошибка"; prev = null; op = null; fresh = true;
    return;
  }
  const value = String(parseFloat(result.toFixed(10)));
  const li = document.createElement("li");
  li.textContent = `${prev} ${op} ${b} = ${value}`;
  history.prepend(li);
  while (history.children.length > 5) history.lastElementChild.remove();
  cur = value; prev = null; op = null; fresh = true;
}

function press(k) {
  if (cur === "Ошибка") cur = "0";
  if (/^[0-9.]$/.test(k)) {
    if (fresh) { cur = "0"; fresh = false; }
    if (k === "." && cur.includes(".")) return;
    cur = cur === "0" && k !== "." ? k : cur + k;
  } else if (k === "C") {
    cur = "0"; prev = null; op = null; fresh = false;
  } else if (k === "=") {
    if (op !== null) compute();
  } else {
    if (op !== null && !fresh) compute();
    if (cur === "Ошибка") { display.textContent = cur; return; }
    prev = Number(cur); op = k; fresh = true;
  }
  display.textContent = cur;
}

keys.addEventListener("click", (e) => { if (e.target.dataset.key) press(e.target.dataset.key); });
document.addEventListener("keydown", (e) => {
  if (layout.includes(e.key)) press(e.key);
  else if (e.key === "Enter") press("=");
  else if (e.key === "Escape") press("C");
});
