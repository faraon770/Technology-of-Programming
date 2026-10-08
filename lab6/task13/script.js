const $ = (s) => document.querySelector(s);
const input = $("#tagInput");
const tags = $("#tags");
const error = $("#error");
const count = $("#count");

function updateCount() {
  count.textContent = `Тегов: ${tags.children.length}`;
}

function addTag() {
  const text = input.value.trim();
  if (!text) { error.textContent = "Пустой тег добавить нельзя"; return; }
  const exists = [...tags.querySelectorAll(".text")].some((t) => t.textContent.toLowerCase() === text.toLowerCase());
  if (exists) { error.textContent = "Такой тег уже есть"; return; }

  const tag = document.createElement("span");
  tag.className = "tag";
  const label = document.createElement("span");
  label.className = "text";
  label.textContent = text;
  const x = document.createElement("span");
  x.className = "x";
  x.textContent = "✕";
  tag.append(label, x);
  tags.append(tag);
  input.value = "";
  error.textContent = "";
  updateCount();
}

input.addEventListener("keydown", (e) => { if (e.key === "Enter") addTag(); });
input.addEventListener("input", () => (error.textContent = ""));
tags.addEventListener("click", (e) => {
  if (e.target.classList.contains("x")) {
    e.target.parentElement.remove();
    updateCount();
  }
});
updateCount();
