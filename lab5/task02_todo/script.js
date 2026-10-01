const input=document.querySelector("#task"), list=document.querySelector("#list");
function update(){
 const all=[...list.children], done=all.filter(x=>x.classList.contains("done")).length;
 document.querySelector("#stats").textContent=`${done} из ${all.length} выполнено`;
 document.querySelector("#bar").style.width=(all.length?done/all.length*100:0)+"%";
}
function add(){
 const t=input.value.trim(); if(!t)return;
 const li=document.createElement("li"); li.innerHTML=`<span>${t}</span><button>✕</button>`;
 li.querySelector("span").onclick=()=>{li.classList.toggle("done");update()};
 li.querySelector("button").onclick=()=>{li.remove();update()};
 list.appendChild(li);input.value="";update();
}
document.querySelector("#add").onclick=add; input.onkeydown=e=>{if(e.key==="Enter")add()};