const $ = (s) => document.querySelector(s);
const arena = $("#arena");
const target = $("#target");
const scoreEl = $("#score");
const missEl = $("#miss");
const timeEl = $("#time");
const msg = $("#msg");
const startBtn = $("#startBtn");
const GOAL = 10;

let score = 0, miss = 0, startTime = 0, timer = null, playing = false;
$("#goal").textContent = GOAL;

function moveTarget() {
  const maxX = arena.clientWidth - target.offsetWidth;
  const maxY = arena.clientHeight - target.offsetHeight;
  target.style.left = Math.floor(Math.random() * maxX) + "px";
  target.style.top = Math.floor(Math.random() * maxY) + "px";
}

function start() {
  score = 0; miss = 0; playing = true;
  scoreEl.textContent = 0; missEl.textContent = 0; msg.textContent = "";
  target.classList.add("active");
  moveTarget();
  startBtn.textContent = "Заново";
  startTime = Date.now();
  clearInterval(timer);
  timer = setInterval(() => {
    timeEl.textContent = ((Date.now() - startTime) / 1000).toFixed(1);
  }, 100);
}

function finish() {
  playing = false;
  clearInterval(timer);
  target.classList.remove("active");
  const t = ((Date.now() - startTime) / 1000).toFixed(1);
  timeEl.textContent = t;
  msg.textContent = `Игра окончена! ${GOAL} попаданий за ${t} с, промахов: ${miss}.`;
}

target.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!playing) return;
  scoreEl.textContent = ++score;
  if (score >= GOAL) finish();
  else moveTarget();
});

arena.addEventListener("click", () => {
  if (!playing) return;
  missEl.textContent = ++miss; // доп. функция: счетчик промахов и таймер
});

startBtn.addEventListener("click", start);
