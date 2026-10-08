const $ = (s) => document.querySelector(s);
const input = $("#itemInput");
const addBtn = $("#addBtn");
const list = $("#list");
const stat = $("#stat");

function updateStat() {
  const all = list.children.length;
  const done = list.querySelectorAll(".done").length;
  stat.textContent = `Куплено: ${done} из ${all}`; // доп. функция: счетчик
}

function addItem() {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.textContent = text;
  list.append(li);
  input.value = "";
  input.focus();
  updateStat();
}

addBtn.addEventListener("click", addItem);
input.addEventListener("keydown", (e) => { if (e.key === "Enter") addItem(); });
list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
    updateStat();
  }
});
updateStat();
