let secret = Math.floor(Math.random()*100)+1, tries=0;
const hint=document.querySelector("#hint");
function start(){secret=Math.floor(Math.random()*100)+1;tries=0;hint.textContent="Попыток: 0";}
document.querySelector("#check").onclick=()=>{
 const n=Number(document.querySelector("#guess").value); tries++;
 if(!n || n<1 || n>100) hint.textContent="Введите число от 1 до 100";
 else if(n===secret) hint.textContent=`🎉 Угадал! Число ${secret}. Попыток: ${tries}`;
 else hint.textContent=(n<secret?"📈 Нужно больше":"📉 Нужно меньше")+` • Попыток: ${tries}`;
};
document.querySelector("#new").onclick=start;