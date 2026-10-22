const DK = "lab8_t17_draft";
const AK = "lab8_t17_apps";
const $ = s => document.querySelector(s);
const h = (t, a = {}, ...c) => { const e = document.createElement(t); for (const [k, v] of Object.entries(a)) { if (k === "on") for (const [ev, f] of Object.entries(v)) e.addEventListener(ev, f); else e.setAttribute(k, v); } c.flat().forEach(x => { if (x != null && x !== false) e.append(x); }); return e; };
const sget = (k, f) => { try { return JSON.parse(sessionStorage.getItem(k)) ?? f; } catch { return f; } };
const lget = (k, f) => { try { const v = JSON.parse(localStorage.getItem(k)); return Array.isArray(v) ? v : f; } catch { return f; } };

const F = ["name", "group", "subject", "date", "comment"];
let d = sget(DK, { step: 0 });
F.forEach(n => $("#" + n).value = d[n] ?? "");
const err = $(".err");

function readInputs() {
  F.forEach(n => d[n] = $("#" + n).value.trim());
  sessionStorage.setItem(DK, JSON.stringify(d));
}
function renderApps() {
  const apps = lget(AK, []);
  const ul = $("#apps");
  ul.replaceChildren();
  if (!apps.length) ul.append(h("div", { class: "empty" }, "Заявок пока нет"));
  apps.forEach(a => ul.append(h("li", {}, h("div", { class: "grow" }, h("strong", {}, a.subject || "Без предмета"), h("div", { class: "muted" }, a.name + ", " + a.group + ", " + (a.date || "дата не указана"))))));
}
function show() {
  document.querySelectorAll(".step").forEach(s => s.classList.toggle("hidden", Number(s.dataset.step) !== d.step));
  $("#prog").textContent = "Шаг " + (d.step + 1) + " из 3";
  $("#back").classList.toggle("hidden", d.step === 0);
  $("#next").classList.toggle("hidden", d.step === 2);
  $("#submit").classList.toggle("hidden", d.step !== 2);
  renderApps();
}
F.forEach(n => $("#" + n).addEventListener("input", readInputs));
$("#next").onclick = () => {
  readInputs();
  if (d.step === 0 && !d.name) { err.textContent = "Укажите ФИО"; return; }
  if (d.step === 1 && !d.subject) { err.textContent = "Укажите предмет"; return; }
  err.textContent = "";
  d.step++;
  sessionStorage.setItem(DK, JSON.stringify(d));
  show();
};
$("#back").onclick = () => { readInputs(); d.step--; sessionStorage.setItem(DK, JSON.stringify(d)); show(); };
$("#submit").onclick = () => {
  readInputs();
  const { step, ...record } = d;
  localStorage.setItem(AK, JSON.stringify([...lget(AK, []), record]));
  sessionStorage.removeItem(DK);
  d = { step: 0 };
  F.forEach(n => $("#" + n).value = "");
  show();
};
show();
