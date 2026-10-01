let expenses=[];
function render(){
 const list=document.querySelector("#list"); list.innerHTML="";
 expenses.forEach((x,i)=>{const li=document.createElement("li");li.innerHTML=`<span>${x.name}</span><b>${x.price.toLocaleString()} ₸</b><button>✕</button>`;
 li.querySelector("button").onclick=()=>{expenses.splice(i,1);render()};list.appendChild(li)});
 document.querySelector("#total").textContent=expenses.reduce((s,x)=>s+x.price,0).toLocaleString()+" ₸";
}
document.querySelector("#add").onclick=()=>{
 const name=document.querySelector("#name").value.trim(), price=Number(document.querySelector("#price").value);
 if(name&&price>0){expenses.push({name,price});document.querySelector("#name").value="";document.querySelector("#price").value="";render();}
};