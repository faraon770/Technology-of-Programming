const K = "lab8_t3";
const $ = s => document.querySelector(s);
const load = (k = K, f = {}) => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

const s = { theme: "light", size: 16, ...load(K, {}) };
const theme = $("#theme"), size = $("#size");

function apply() {
  document.documentElement.dataset.theme = s.theme;
  $(".app").style.fontSize = s.size + "px";
  $("#sv").textContent = s.size + " px";
  theme.value = s.theme;
  size.value = s.size;
}
theme.onchange = () => { s.theme = theme.value; save(s); apply(); };
size.oninput = () => { s.size = Number(size.value); save(s); apply(); };
apply();
