export function formatPrice(amount){return new Intl.NumberFormat('ru-RU',{maximumFractionDigits:0}).format(amount)+' ₸';}
export function calculateTotal(items,lookup){return items.reduce((sum,item)=>{const dish=lookup(item.id);return sum+(dish?dish.price*item.quantity:0);},0);}
export function countItems(items){return items.reduce((sum,item)=>sum+item.quantity,0);}
