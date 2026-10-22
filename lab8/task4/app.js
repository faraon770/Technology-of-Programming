const K = "lab8_t4";
const $ = s => document.querySelector(s);
const load = (k = K, f = 0) => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

let n = Number(load(K, 0)) || 0;
n++;
save(n);
$("#cnt").textContent = n;
$("#reset").onclick = () => { n = 0; save(n); $("#cnt").textContent = n; };
