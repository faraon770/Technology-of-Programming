const $ = (s) => document.querySelector(s);
const overlay = $("#overlay");
const counter = $("#counter");
let opened = 0;

function openModal() {
  overlay.classList.add("open");
  counter.textContent = ++opened;
}
function closeModal() {
  overlay.classList.remove("open");
}

$("#openBtn").addEventListener("click", openModal);
$("#closeBtn").addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
