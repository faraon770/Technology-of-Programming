const $ = (s) => document.querySelector(s);
const input = $("#taskInput");
const tasks = $("#tasks");
const stat = $("#stat");

function updateStat() {
  const total = tasks.children.length;
  const done = tasks.querySelectorAll(".done").length;
  stat.textContent = `Всего: ${total}, выполнено: ${done}, осталось: ${total - done}`;
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  const check = document.createElement("input");
  check.type = "checkbox";
  const span = document.createElement("span");
  span.textContent = text;
  const del = document.createElement("button");
  del.textContent = "✕";
  del.className = "danger";
  li.append(check, span, del);
  tasks.append(li);
  input.value = "";
  updateStat();
}

tasks.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  if (e.target.tagName === "BUTTON") {
    li.remove();
  } else if (e.target.tagName === "SPAN" || e.target.type === "checkbox") {
    li.classList.toggle("done");
    li.querySelector("input").checked = li.classList.contains("done");
  }
  updateStat();
});

$("#addBtn").addEventListener("click", addTask);
input.addEventListener("keydown", (e) => { if (e.key === "Enter") addTask(); });
$("#clearBtn").addEventListener("click", () => {
  tasks.querySelectorAll(".done").forEach((li) => li.remove());
  updateStat();
});

// доп. функция: фильтр задач
document.querySelector(".filters").addEventListener("click", (e) => {
  const f = e.target.dataset.filter;
  if (!f) return;
  tasks.classList.remove("show-active", "show-done");
  if (f !== "all") tasks.classList.add("show-" + f);
});
updateStat();
