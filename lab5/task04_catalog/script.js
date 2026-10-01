const products=[{n:"Наушники",p:12990,e:"🎧"},{n:"Клавиатура",p:18990,e:"⌨️"},{n:"Мышь",p:9990,e:"🖱️"},{n:"Монитор",p:89990,e:"🖥️"},{n:"Power Bank",p:15990,e:"🔋"},{n:"Смарт-часы",p:34990,e:"⌚"}];
function render(){
 const q=document.querySelector("#search").value.toLowerCase(), max=Number(document.querySelector("#max").value)||Infinity;
 document.querySelector("#catalog").innerHTML=products.filter(x=>x.n.toLowerCase().includes(q)&&x.p<=max)
 .map(x=>`<div class="card"><div class="emoji">${x.e}</div><h3>${x.n}</h3><b>${x.p.toLocaleString()} ₸</b></div>`).join("");
}
document.querySelector("#search").oninput=render;document.querySelector("#max").oninput=render;render();