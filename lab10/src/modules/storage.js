const KEY='campus-food-orders-v1';
export function loadOrders(){try{const data=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(data)?data:[];}catch{return [];}}
export function saveOrders(orders){try{localStorage.setItem(KEY,JSON.stringify(orders));return true;}catch{return false;}}
export function clearOrders(){try{localStorage.removeItem(KEY);return true;}catch{return false;}}
