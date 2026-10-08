const $ = (s) => document.querySelector(s);
const input = $("#cardInput");
const columns = [...document.querySelectorAll(".col")];
const containers = columns.map((c) => c.querySelector(".cards"));

function updateAll() {
  columns.forEach((col, i) => {
    col.querySelector(".cnt").textContent = containers[i].children.length;
  });
  containers.forEach((cont, i) => {
    cont.querySelectorAll(".kcard").forEach((card) => {
      card.querySelector('[data-act="left"]').disabled = i === 0;
      card.querySelector('[data-act="right"]').disabled = i === containers.length - 1;
    });
  });
}

function addCard() {
  const text = input.value.trim();
  if (!text) return;
  const card = document.createElement("div");
  card.className = "kcard";
  card.innerHTML = `<p></p><button data-act="left">←</button><button data-act="right">→</button><button data-act="del" class="danger">✕</button>`;
  card.querySelector("p").textContent = text;
  containers[0].append(card);
  input.value = "";
  updateAll();
}

document.querySelector(".board").addEventListener("click", (e) => {
  const act = e.target.dataset.act;
  if (!act) return;
  const card = e.target.closest(".kcard");
  const idx = containers.indexOf(card.parentElement);
  if (act === "left" && idx > 0) containers[idx - 1].append(card);
  if (act === "right" && idx < containers.length - 1) containers[idx + 1].append(card);
  if (act === "del") card.remove();
  updateAll();
});

$("#addBtn").addEventListener("click", addCard);
input.addEventListener("keydown", (e) => { if (e.key === "Enter") addCard(); });
updateAll();
