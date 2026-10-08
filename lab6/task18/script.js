const $ = (s) => document.querySelector(s);
const fs = $("#fs");
const nameInput = $("#nameInput");
const stat = $("#stat");
let folderN = 0, fileN = 0;

function updateStat() {
  const sel = fs.querySelector(".selected");
  stat.textContent = `Элементов: ${fs.children.length}. Выбрано: ${sel ? sel.dataset.name : "ничего"}`;
}

function addItem(type) {
  const li = document.createElement("li");
  const name = nameInput.value.trim() || (type === "folder" ? `Новая папка ${++folderN}` : `Файл ${++fileN}.txt`);
  li.dataset.type = type;
  setName(li, name);
  fs.append(li);
  nameInput.value = "";
  updateStat();
}

function setName(li, name) {
  li.dataset.name = name;
  li.textContent = (li.dataset.type === "folder" ? "📁 " : "📄 ") + name;
}

function selected() { return fs.querySelector(".selected"); }

function rename() {
  const li = selected();
  if (!li) return;
  const name = prompt("Новое имя:", li.dataset.name);
  if (name && name.trim()) setName(li, name.trim());
  updateStat();
}

function remove() {
  const li = selected();
  if (li) li.remove();
  updateStat();
}

$("#addFolder").addEventListener("click", () => addItem("folder"));
$("#addFile").addEventListener("click", () => addItem("file"));
$("#renameBtn").addEventListener("click", rename);
$("#deleteBtn").addEventListener("click", remove);

fs.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  fs.querySelectorAll(".selected").forEach((i) => i.classList.remove("selected"));
  li.classList.add("selected");
  updateStat();
});

// доп. функция: горячие клавиши
document.addEventListener("keydown", (e) => {
  if (document.activeElement === nameInput) return;
  if (e.key === "Delete") remove();
  if (e.key === "F2") { e.preventDefault(); rename(); }
});
updateStat();
