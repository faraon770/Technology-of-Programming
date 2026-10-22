const K = "lab8_t6";
const $ = s => document.querySelector(s);
const load = (k = K, f = "") => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

const ta = $("#text"), st = $("#status");
ta.value = load(K, "");
if (ta.value) st.textContent = "Черновик восстановлен";

ta.addEventListener("input", () => {
  save(ta.value);
  st.textContent = "Сохранено в " + new Date().toLocaleTimeString("ru-RU");
});
$("#clear").onclick = () => { localStorage.removeItem(K); ta.value = ""; st.textContent = "Черновик очищен"; };
