document.querySelector("#register").onclick=()=>{
 const name=document.querySelector("#name").value.trim(), email=document.querySelector("#email").value.trim(), pass=document.querySelector("#password").value;
 const okName=name.length>=2,okEmail=email.includes("@")&&email.includes("."),okPass=pass.length>=8;
 document.querySelector("#nameError").textContent=okName?"":"Введите имя";
 document.querySelector("#emailError").textContent=okEmail?"":"Некорректный email";
 document.querySelector("#passwordError").textContent=okPass?"":"Минимум 8 символов";
 document.querySelector("#success").textContent=okName&&okEmail&&okPass?"✅ Регистрация успешна!":"";
};