document.querySelector("#calc").onclick=()=>{
 const price=Number(document.querySelector("#price").value), count=Number(document.querySelector("#count").value), delivery=Number(document.querySelector("#delivery").value);
 const total=price*count+delivery;
 document.querySelector("#result").textContent=total.toLocaleString()+" ₸";
};