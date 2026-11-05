import {currentUser,registerUser,loginUser,logoutUser,userOrders} from './modules/auth.js';
import {restoreCatalog,persistCatalog,addCategory,addDish,removeDish,removeCategory,findDish,updateDish} from './modules/menu.js';
import {renderCategories,renderMenu,renderCart,renderOrders,showToast,showError,showView,renderAdmin} from './modules/ui.js';
import {addItem,changeQuantity,createOrder,nextStatus,cancelOrder,reserveStock,returnStock} from './modules/orders.js';
import {loadOrders,saveOrders,clearOrders} from './modules/storage.js';
// Начальные данные приложения
restoreCatalog();let admin=false;let cart=[];let orders=loadOrders();let category='Все';let query='';let user=currentUser();let registerMode=false;
const $=selector=>document.querySelector(selector);
function refresh(){renderCart(cart);renderOrders(userOrders(orders,user));renderAdmin(orders);if(admin)renderAdminOrders();updateAccount();}
function attempt(fn){try{fn();showError('');}catch(error){showError(error.message);showToast(error.message);}}
renderCategories(category);renderMenu(category,query);refresh();
// Выбор категории
$('#categories').addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(!button)return;category=button.dataset.category;renderCategories(category);renderMenu(category,query);});
$('#search').addEventListener('input',event=>{query=event.target.value;renderMenu(category,query);});
$('#products').addEventListener('click',event=>{const button=event.target.closest('[data-add]');if(!button)return;attempt(()=>{cart=addItem(cart,button.dataset.add);refresh();showToast('Блюдо добавлено в заказ');});});
$('#cart-items').addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;attempt(()=>{if(button.dataset.plus)cart=changeQuantity(cart,button.dataset.plus,1);if(button.dataset.minus)cart=changeQuantity(cart,button.dataset.minus,-1);if(button.dataset.remove)cart=cart.filter(x=>x.id!==Number(button.dataset.remove));refresh();});});
// Оформление заказа
$('#checkout').addEventListener('click',()=>attempt(()=>{if(!user)throw Error('Для оформления заказа сначала войдите или зарегистрируйтесь');const order={...createOrder(cart,user.name),userId:user.id};reserveStock(order);orders=[order,...orders];if(!saveOrders(orders))showToast('Внимание: браузер не сохранил историю');persistCatalog();renderMenu(category,query);cart=[];refresh();showView('orders');showToast('Заказ успешно оформлен!');}));
$('#admin-orders').addEventListener('click',event=>{const button=event.target.closest('[data-next],[data-cancel]');if(!button||!admin)return;attempt(()=>{if(button.dataset.cancel){cancelById(button.dataset.cancel,true);return;}const index=orders.findIndex(x=>x.id===button.dataset.next);if(index<0)return;orders[index]=nextStatus(orders[index]);saveOrders(orders);refresh();showToast('Статус заказа обновлён');});});

// Клиент отменяет только собственный заказ; администратор — любой.
function cancelById(id,asAdmin=false){
 const index=orders.findIndex(o=>o.id===id);
 if(index<0)throw Error('Заказ не найден');
 if(!asAdmin&&(!user||orders[index].userId!==user.id))throw Error('Нет доступа к заказу');
 if(!confirm('Отменить заказ?'))return;
 const old=orders[index];orders[index]=cancelOrder(old);returnStock(old);
 saveOrders(orders);persistCatalog();renderMenu(category,query);refresh();showToast('Заказ отменён, остаток восстановлен');
}
$('#orders-list').addEventListener('click',e=>{const btn=e.target.closest('[data-cancel]');if(btn)attempt(()=>cancelById(btn.dataset.cancel));});
document.querySelectorAll('.nav').forEach(button=>button.addEventListener('click',()=>showView(button.dataset.view)));
$('#explore').addEventListener('click',()=>$('#menu-view').scrollIntoView({behavior:'smooth'}));

// Админка открывается только по Ctrl+Shift+A. Это локальная демонстрация, не серверная авторизация.
const DEMO_PIN='1818';
function renderAdminOrders(){renderOrders(orders,true,'#admin-orders');}
function openAdminLogin(){if(admin){showView('admin');return;}$('#login-error').textContent='';$('#admin-pin').value='';$('#admin-login').showModal();}
document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='a'){e.preventDefault();openAdminLogin();}});
$('#login-cancel').addEventListener('click',()=>$('#admin-login').close());
$('#login-form').addEventListener('submit',e=>{e.preventDefault();if($('#admin-pin').value!==DEMO_PIN){$('#login-error').textContent='Неверный PIN-код';return;}admin=true;$('#admin-login').close();renderAdmin(orders);renderAdminOrders();showView('admin');showToast('Режим администратора включён');});
$('#admin-logout').addEventListener('click',()=>{admin=false;showView('menu');showToast('Вы вышли из админки');});
function refreshCatalog(){persistCatalog()||showToast('Не удалось сохранить каталог: недостаточно памяти браузера');if(category!=='Все'&&!document.querySelector(`[data-category="${CSS.escape(category)}"]`))category='Все';renderCategories(category);renderMenu(category,query);refresh();}
$('#category-form').addEventListener('submit',e=>{e.preventDefault();if(!admin)return;attempt(()=>{addCategory(new FormData(e.target).get('name'));e.target.reset();refreshCatalog();showToast('Категория добавлена');});});
$('#dish-form').addEventListener('submit',async e=>{e.preventDefault();if(!admin)return;const form=e.target;const data=Object.fromEntries(new FormData(form));try{const file=form.elements.photo.files[0];if(file){if(file.size>500000)throw Error('Фото слишком большое: максимум 500 КБ');if(!['image/png','image/jpeg','image/webp'].includes(file.type))throw Error('Поддерживаются JPG, PNG, WebP');data.image=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(Error('Ошибка чтения фотографии'));reader.readAsDataURL(file);});}addDish(data);form.reset();refreshCatalog();showError('');showToast('Блюдо добавлено');}catch(error){showError(error.message);showToast(error.message);}});
$('#admin-dishes').addEventListener('click',e=>{const btn=e.target.closest('[data-del-dish],[data-save-dish]');if(!btn||!admin)return;if(btn.dataset.saveDish){attempt(()=>{const id=Number(btn.dataset.saveDish);updateDish(id,$(`[data-price="${id}"]`).value,$(`[data-stock="${id}"]`).value);refreshCatalog();showToast('Цена и остаток обновлены');});return;}if(!confirm('Удалить блюдо из меню?'))return;attempt(()=>{const id=Number(btn.dataset.delDish);removeDish(id);cart=cart.filter(x=>x.id!==id);refreshCatalog();showToast('Блюдо удалено');});});
$('#admin-categories').addEventListener('click',e=>{const btn=e.target.closest('[data-del-category]');if(!btn||!admin)return;attempt(()=>{removeCategory(btn.dataset.delCategory);category='Все';refreshCatalog();showToast('Категория удалена');});});

// Клиентская регистрация и вход. Хранение локальное: один браузер, без сервера.
function updateAccount(){
 $('#account-label').textContent=user?user.name:'Гость';
 $('#account-open').hidden=!!user;
 $('#account-logout').hidden=!user;
 $('#customer').value=user?.name||'';
 $('#checkout-hint').textContent=user?'Заказ будет привязан к вашему аккаунту.':'Для заказа войдите или зарегистрируйтесь.';
}
function accountMode(mode){registerMode=mode;$('#account-title').textContent=mode?'Регистрация клиента':'Вход клиента';$('#register-name-field').hidden=!mode;$('#account-name').required=mode;$('#register-phone-field').hidden=!mode;$('#account-phone').required=mode;$('#account-submit').textContent=mode?'Зарегистрироваться':'Войти';$('#account-toggle').textContent=mode?'Уже есть аккаунт? Войти':'Нет аккаунта? Зарегистрироваться';$('#account-error').textContent='';}
$('#account-open').addEventListener('click',()=>{accountMode(false);$('#account-form').reset();$('#account-dialog').showModal();});
$('#account-cancel').addEventListener('click',()=>$('#account-dialog').close());
$('#account-toggle').addEventListener('click',()=>accountMode(!registerMode));
$('#account-logout').addEventListener('click',()=>{logoutUser();user=null;cart=[];refresh();showView('menu');showToast('Вы вышли из аккаунта');});
// Проверяем поля и создаём аккаунт либо выполняем вход
$('#account-form').addEventListener('submit',async event=>{
 event.preventDefault();const button=$('#account-submit');button.disabled=true;
 try{const email=$('#account-email').value,password=$('#account-password').value;
 user=registerMode?await registerUser($('#account-name').value,$('#account-phone').value,email,password):await loginUser(email,password);
 $('#account-dialog').close();refresh();showToast(`Здравствуйте, ${user.name}!`);
 }catch(error){$('#account-error').textContent=error.message;}finally{button.disabled=false;}
});
window.addEventListener('storage',event=>{if(event.key==='campus-food-orders-v1'){orders=loadOrders();refresh();}if(event.key==='campus-food-session-v1'){user=currentUser();refresh();}});
// Проверка обновлений статуса в других вкладках того же браузера.
window.addEventListener('focus',()=>{orders=loadOrders();user=currentUser();refresh();});
updateAccount();
