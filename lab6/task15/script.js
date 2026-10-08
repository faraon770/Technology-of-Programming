const $ = (s) => document.querySelector(s);
const tbody = $("#tbody");
const totalEl = $("#total");

const students = [
  ["Айдос", 85, 70, 90],
  ["Малика", 92, 88, 95],
  ["Ерлан", 45, 60, 55],
  ["Дана", 78, 82, 74]
];

function paint(td) {
  td.classList.toggle("low", Number(td.textContent) < 50);
}

function recalc() {
  let sum = 0, n = 0;
  [...tbody.rows].forEach((row) => {
    const grades = [...row.querySelectorAll(".grade")].map((td) => Number(td.textContent));
    const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
    row.querySelector(".avg").textContent = avg.toFixed(1);
    sum += grades.reduce((a, b) => a + b, 0);
    n += grades.length;
  });
  totalEl.textContent = `Общий средний балл: ${(sum / n).toFixed(1)}`;
}

students.forEach(([name, ...grades]) => {
  const tr = document.createElement("tr");
  const tdName = document.createElement("td");
  tdName.textContent = name;
  tr.append(tdName);
  grades.forEach((g) => {
    const td = document.createElement("td");
    td.className = "grade";
    td.textContent = g;
    paint(td);
    tr.append(td);
  });
  const tdAvg = document.createElement("td");
  tdAvg.className = "avg";
  tr.append(tdAvg);
  tbody.append(tr);
});

tbody.addEventListener("click", (e) => {
  const td = e.target.closest("td.grade");
  if (!td || td.querySelector("input")) return;
  const old = td.textContent;
  const input = document.createElement("input");
  input.type = "number";
  input.min = 0;
  input.max = 100;
  input.value = old;
  td.textContent = "";
  td.append(input);
  input.focus();
  input.select();

  let finished = false;
  const finish = (save) => {
    if (finished) return;
    finished = true;
    const v = Number(input.value);
    const valid = input.value !== "" && v >= 0 && v <= 100;
    td.textContent = save && valid ? v : old;
    paint(td);
    recalc();
  };
  input.addEventListener("blur", () => finish(true));
  input.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") finish(true);
    if (ev.key === "Escape") finish(false);
  });
});
recalc();
