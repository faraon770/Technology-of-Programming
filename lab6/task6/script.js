const $ = (s) => document.querySelector(s);
const input = $("#nameInput");
const greeting = $("#greeting");

function timeGreeting() {
  const h = new Date().getHours();
  if (h < 6) return "Доброй ночи";
  if (h < 12) return "Доброе утро";
  if (h < 18) return "Добрый день";
  return "Добрый вечер";
}

input.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const name = input.value.trim();
  greeting.classList.toggle("empty", !name);
  greeting.textContent = name ? `${timeGreeting()}, ${name}!` : "Пожалуйста, введите имя";
});

input.addEventListener("input", () => {
  if (!input.value.trim()) greeting.textContent = "";
});
