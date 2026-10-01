const students=[];
document.querySelector("#add").onclick=()=>{
 const name=document.querySelector("#student").value.trim();
 const grades=document.querySelector("#grades").value.split(",").map(Number).filter(x=>!isNaN(x));
 if(!name||!grades.length)return;
 students.push({name,grades}); render();
};
function render(){
 document.querySelector("#body").innerHTML=students.map(s=>{
 const avg=s.grades.reduce((a,b)=>a+b,0)/s.grades.length;
 return `<tr><td>${s.name}</td><td>${s.grades.join(", ")}</td><td><b>${avg.toFixed(1)}</b></td></tr>`;
 }).join("");
}