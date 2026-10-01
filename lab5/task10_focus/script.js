let seconds=25*60,timer=null;
const time=document.querySelector("#time");
function show(){const m=Math.floor(seconds/60),s=seconds%60;time.textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;}
document.querySelector("#start").onclick=()=>{if(timer)return;timer=setInterval(()=>{if(seconds>0){seconds--;show()}else{clearInterval(timer);timer=null;alert("Время вышло!")}},1000)};
document.querySelector("#pause").onclick=()=>{clearInterval(timer);timer=null};
document.querySelector("#reset").onclick=()=>{clearInterval(timer);timer=null;seconds=25*60;show()};show();