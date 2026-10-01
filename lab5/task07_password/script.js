document.querySelector("#pass").oninput=e=>{
 const p=e.target.value, tests=[p.length>=8,/\d/.test(p),/[A-ZА-Я]/.test(p)];
 ["len","num","upper"].forEach((id,i)=>document.querySelector("#"+id).classList.toggle("ok",tests[i]));
 const score=tests.filter(Boolean).length, names=["Слабый","Слабый","Средний","Надежный"];
 document.querySelector("#level").textContent=p?names[score]:"Введите пароль";
 document.querySelector("#strength").style.width=(score/3*100)+"%";
};