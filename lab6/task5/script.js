const $ = (s) => document.querySelector(s);
const status = $("#status");

function toast(text) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = text;
  document.body.append(t);
  setTimeout(() => t.remove(), 1500);
}

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  status.textContent = `Текущая тема: ${dark ? "тёмная" : "светлая"}`;
  try { localStorage.setItem("lab6-theme", dark ? "dark" : "light"); } catch (e) {}
}

function toggleTheme() {
  applyTheme(!document.body.classList.contains("dark"));
  toast("Тема изменена");
}

$("#toggle").addEventListener("click", toggleTheme);
document.addEventListener("keydown", (e) => { if (e.key.toLowerCase() === "t") toggleTheme(); });

let saved = null;
try { saved = localStorage.getItem("lab6-theme"); } catch (e) {}
applyTheme(saved !== "light");
