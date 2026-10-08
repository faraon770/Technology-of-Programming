const $ = (s) => document.querySelector(s);
const mainImg = $("#main");
const caption = $("#caption");
const thumbs = $("#thumbs");

const slides = [
  ["#e63946", "Закат"], ["#2a9d8f", "Море"], ["#f4a261", "Пустыня"],
  ["#6a4c93", "Ночь"], ["#457b9d", "Небо"]
];

const makeSrc = (color, text) => "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360"><rect width="600" height="360" fill="${color}"/><text x="300" y="195" font-size="56" fill="#fff" text-anchor="middle" font-family="Arial">${text}</text></svg>`
);

let current = 0;

function show(i) {
  current = (i + slides.length) % slides.length;
  const [color, name] = slides[current];
  mainImg.src = makeSrc(color, name);
  mainImg.alt = name;
  caption.textContent = `${name} (${current + 1}/${slides.length})`;
  thumbs.querySelectorAll(".thumb").forEach((t, idx) => t.classList.toggle("active", idx === current));
}

slides.forEach(([color, name], i) => {
  const img = document.createElement("img");
  img.className = "thumb";
  img.src = makeSrc(color, name);
  img.alt = name;
  img.dataset.index = i;
  thumbs.append(img);
});

thumbs.addEventListener("click", (e) => {
  if (e.target.classList.contains("thumb")) show(Number(e.target.dataset.index));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") show(current + 1);
  if (e.key === "ArrowLeft") show(current - 1);
});
show(0);
