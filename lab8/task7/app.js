const K = "lab8_t7";
const $ = s => document.querySelector(s);
const load = (k = K, f = "ru") => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const save = (v, k = K) => localStorage.setItem(k, JSON.stringify(v));

const dict = {
  ru: { title: "Добро пожаловать", hello: "Это интерфейс на русском языке.", btn: "Нажать", note: "Язык сохраняется в localStorage" },
  kz: { title: "Қош келдіңіз", hello: "Бұл қазақ тіліндегі интерфейс.", btn: "Басу", note: "Тіл localStorage-та сақталады" },
  en: { title: "Welcome", hello: "This is the English interface.", btn: "Click", note: "Language is stored in localStorage" }
};
let lang = load(K, "ru");
if (!dict[lang]) lang = "ru";

function apply() {
  document.documentElement.lang = lang;
  $("#lang").value = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = dict[lang][el.dataset.i18n]);
}
$("#lang").onchange = e => { lang = e.target.value; save(lang); apply(); };
apply();
