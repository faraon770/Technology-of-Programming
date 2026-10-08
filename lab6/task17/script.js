const $ = (s) => document.querySelector(s);
const quiz = $("#quiz");
const bar = $("#bar");

const questions = [
  { q: "Каким методом удаляют DOM-элемент?", options: ["delete()", "remove()", "erase()", "drop()"], answer: 1 },
  { q: "Какой метод создаёт новый элемент?", options: ["createElement()", "newNode()", "makeTag()", "add()"], answer: 0 },
  { q: "Как подписаться на событие?", options: ["onEvent()", "listen()", "addEventListener()", "bind()"], answer: 2 },
  { q: "Какое свойство хранит нажатую клавишу?", options: ["event.type", "event.key", "event.target", "event.id"], answer: 1 },
  { q: "Что возвращает querySelectorAll()?", options: ["Один элемент", "Строку", "Число", "Список элементов"], answer: 3 }
];

let index = 0, score = 0;

function showQuestion() {
  const item = questions[index];
  quiz.innerHTML = "";
  const title = document.createElement("h3");
  title.textContent = `${index + 1}/${questions.length}. ${item.q}`;
  quiz.append(title);

  item.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.textContent = text;
    btn.dataset.index = i;
    quiz.append(btn);
  });
  bar.style.width = `${(index / questions.length) * 100}%`;
}

function showResult() {
  bar.style.width = "100%";
  quiz.innerHTML = "";
  const box = document.createElement("div");
  box.className = "result";
  box.innerHTML = `<h3>Тест завершён</h3><div class="score">${score}/${questions.length}</div><p></p>`;
  box.querySelector("p").textContent = score >= 4 ? "Отличный результат!" : score >= 3 ? "Хорошо, но можно лучше." : "Повторите теорию.";
  const again = document.createElement("button");
  again.id = "restart";
  again.textContent = "Пройти заново";
  box.append(again);
  quiz.append(box);
}

quiz.addEventListener("click", (e) => {
  if (e.target.id === "restart") { index = 0; score = 0; showQuestion(); return; }
  if (!e.target.classList.contains("opt")) return;

  const chosen = Number(e.target.dataset.index);
  const correct = questions[index].answer;
  quiz.querySelectorAll(".opt").forEach((b, i) => {
    b.disabled = true;
    if (i === correct) b.classList.add("correct");
  });
  if (chosen === correct) score++;
  else e.target.classList.add("wrong");

  setTimeout(() => {
    index++;
    index < questions.length ? showQuestion() : showResult();
  }, 800);
});

showQuestion();
