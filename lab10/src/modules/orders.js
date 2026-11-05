import {findDish} from './menu.js';
import {calculateTotal} from './pricing.js';
export const statuses=['Новый','Готовится','Готов','Выдан'];
export function addItem(cart,id){const dish=findDish(id);if(!dish)throw new Error('Блюдо не найдено');const next=cart.map(x=>({...x}));const item=next.find(x=>x.id===Number(id));if(item){if(item.quantity>=99)throw new Error('Максимум 99 порций одного блюда');if(item.quantity>=dish.stock)throw new Error('Недостаточно порций в наличии');item.quantity++;}else {if(dish.stock<1)throw new Error('Нет в наличии');next.push({id:Number(id),quantity:1});}return next;}
export function changeQuantity(cart,id,delta){const next=cart.map(x=>({...x}));const item=next.find(x=>x.id===Number(id));if(!item)return next;if(delta>0&&item.quantity+delta>findDish(id).stock)throw Error('Недостаточно порций в наличии');item.quantity=Math.max(0,Math.min(99,item.quantity+delta));return next.filter(x=>x.quantity>0);}
export function createOrder(cart,customer){const name=customer.trim().replace(/\s+/g,' ');if(name.length<2)throw new Error('Введите имя (минимум 2 символа)');if(name.length>60)throw new Error('Имя слишком длинное');if(!cart.length)throw new Error('Добавьте хотя бы одно блюдо');const items=cart.map(x=>{const dish=findDish(x.id);if(!dish||!Number.isInteger(x.quantity)||x.quantity<1||x.quantity>99)throw new Error('Некорректный состав заказа');if(x.quantity>dish.stock)throw Error(`Недостаточно порций: ${dish.name}`);return {id:dish.id,name:dish.name,price:dish.price,quantity:x.quantity};});return {id:(globalThis.crypto?.randomUUID?.()||String(Date.now())+'-'+Math.random().toString(36).slice(2)),customer:name,items,total:calculateTotal(cart,findDish),status:statuses[0],createdAt:new Date().toISOString()};}
export function nextStatus(order){const index=statuses.indexOf(order.status);return {...order,status:statuses[Math.min(index+1,statuses.length-1)]};}

// Заказ можно отменить, пока он не готов и не выдан.
export function cancelOrder(order) {
 if(!['Новый','Готовится'].includes(order.status))throw Error('Этот заказ уже нельзя отменить');
 return {...order,status:'Отменён'};
}
// Списание остатков после успешного оформления.
export function reserveStock(order) {
 for(const item of order.items){const dish=findDish(item.id);if(!dish||dish.stock<item.quantity)throw Error('Недостаточно порций');}
 for(const item of order.items)findDish(item.id).stock-=item.quantity;
}
// Возврат остатков при отмене.
export function returnStock(order) {
 for(const item of order.items){const dish=findDish(item.id);if(dish)dish.stock+=item.quantity;}
}
