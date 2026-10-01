const qs=[["Что такое DOM?",["Модель документа","База данных","Сервер"],0],["Как объявить константу?",["let","const","varr"],1],["Событие клика?",["input","click","loadx"],1],["Строгое равенство?",["==","=","==="],2],["Цикл со счетчиком?",["for","if","function"],0]];
document.querySelector("#quiz").innerHTML=qs.map((q,i)=>`<div class="question"><b>${i+1}. ${q[0]}</b>${q[1].map((a,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${a}</label>`).join("")}</div>`).join("");
document.querySelector("#finish").onclick=()=>{
 let score=0;qs.forEach((q,i)=>{const a=document.querySelector(`input[name=q${i}]:checked`);if(a&&Number(a.value)===q[2])score++});
 document.querySelector("#result").textContent=`Результат: ${score} / ${qs.length}`;
};