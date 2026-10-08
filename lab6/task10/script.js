const $ = (s) => document.querySelector(s);
const field = $("#field");
const player = $("#player");
const movesEl = $("#moves");
const STEP = 20;
let x = 0, y = 0, moves = 0;

function render() {
  player.style.left = x + "px";
  player.style.top = y + "px";
  movesEl.textContent = moves;
}

document.addEventListener("keydown", (e) => {
  const maxX = field.clientWidth - player.offsetWidth;
  const maxY = field.clientHeight - player.offsetHeight;
  let nx = x, ny = y;

  if (e.key === "ArrowUp") ny -= STEP;
  else if (e.key === "ArrowDown") ny += STEP;
  else if (e.key === "ArrowLeft") nx -= STEP;
  else if (e.key === "ArrowRight") nx += STEP;
  else return;

  e.preventDefault();
  nx = Math.max(0, Math.min(maxX, nx));
  ny = Math.max(0, Math.min(maxY, ny));
  player.classList.toggle("wall", nx === x && ny === y); // упёрлись в границу
  if (nx !== x || ny !== y) moves++;
  x = nx; y = ny;
  render();
});

x = Math.round((field.clientWidth - 40) / 2);
y = Math.round((field.clientHeight - 40) / 2);
render();
