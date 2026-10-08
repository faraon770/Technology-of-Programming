const $ = (s) => document.querySelector(s);
const textEl = $("#noteText");
const notes = $("#notes");
const countEl = $("#count");

function updateCount() {
  countEl.textContent = `Заметок: ${notes.children.length}`;
}

function addNote() {
  const text = textEl.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  const del = document.createElement("button");
  del.textContent = "Удалить";
  del.className = "danger";
  del.addEventListener("click", () => { li.remove(); updateCount(); });
  li.append(span, del);
  notes.prepend(li);
  textEl.value = "";
  updateCount();
}

$("#addBtn").addEventListener("click", addNote);
textEl.addEventListener("keydown", (e) => { if (e.ctrlKey && e.key === "Enter") addNote(); });
updateCount();
