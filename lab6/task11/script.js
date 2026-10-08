const $ = (s) => document.querySelector(s);
const faq = $("#faq");
const search = $("#search");

const data = [
  ["Что такое DOM?", "Объектная модель документа — дерево объектов, представляющее HTML-страницу."],
  ["Как найти элемент?", "С помощью getElementById(), querySelector() и querySelectorAll()."],
  ["Как создать элемент?", "Методом document.createElement(), затем добавить через append()."],
  ["Как удалить элемент?", "Вызвать у элемента метод remove()."],
  ["Как подписаться на событие?", "Использовать метод addEventListener(тип, обработчик)."]
];

data.forEach(([q, a]) => {
  const item = document.createElement("div");
  item.className = "item";
  const btn = document.createElement("button");
  btn.className = "q";
  btn.textContent = q;
  const ans = document.createElement("div");
  ans.className = "a";
  ans.textContent = a;
  item.append(btn, ans);
  faq.append(item);
});

faq.addEventListener("click", (e) => {
  const btn = e.target.closest(".q");
  if (!btn) return;
  const item = btn.parentElement;
  const wasOpen = item.classList.contains("open");
  faq.querySelectorAll(".item.open").forEach((i) => i.classList.remove("open")); // только один открыт
  if (!wasOpen) item.classList.add("open");
});

// доп. функция: поиск
search.addEventListener("input", () => {
  const text = search.value.toLowerCase();
  faq.querySelectorAll(".item").forEach((item) => {
    const q = item.querySelector(".q").textContent.toLowerCase();
    item.classList.toggle("hidden", !q.includes(text));
  });
});
