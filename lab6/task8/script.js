const $ = (s) => document.querySelector(s);
const form = $("#form");
const tbody = $("#tbody");
const stat = $("#stat");

function updateTable() {
  const rows = [...tbody.rows];
  rows.forEach((r, i) => (r.cells[0].textContent = i + 1));
  const scores = rows.map((r) => Number(r.cells[2].textContent));
  const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
  stat.textContent = `Студентов: ${rows.length}. Средний балл: ${avg}`; // доп. функция
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#name").value.trim();
  const score = Number($("#score").value);
  if (!name || score < 0 || score > 100) return;

  const tr = document.createElement("tr");
  tr.className = score >= 75 ? "good" : score < 50 ? "bad" : "";
  const cells = ["", name, score].map((v) => {
    const td = document.createElement("td");
    td.textContent = v;
    return td;
  });
  const tdDel = document.createElement("td");
  const del = document.createElement("button");
  del.textContent = "Удалить";
  del.className = "danger";
  tdDel.append(del);
  tr.append(...cells, tdDel);
  tbody.append(tr);
  form.reset();
  $("#name").focus();
  updateTable();
});

tbody.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.closest("tr").remove();
    updateTable();
  }
});
updateTable();
