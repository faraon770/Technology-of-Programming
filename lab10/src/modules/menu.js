export const categories = ['Все','Горячее','Супы','Салаты','Напитки','Десерты'];
export const menu = [
{id:1,image:'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=640&q=80',name:'Плов с говядиной',category:'Горячее',price:1450,emoji:'🍛',description:'Ароматный рис, сочная говядина и овощи',color:'#fff0d9'},
{id:2,image:'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=640&q=80',name:'Курица с рисом',category:'Горячее',price:1350,emoji:'🍗',description:'Нежная курица с рассыпчатым рисом',color:'#fce9dc'},
{id:3,image:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=640&q=80',name:'Борщ домашний',category:'Супы',price:850,emoji:'🥣',description:'Сытный суп со сметаной',color:'#f9e4e4'},
{id:4,image:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=640&q=80',name:'Лапша с курицей',category:'Супы',price:790,emoji:'🍜',description:'Домашний бульон и свежая зелень',color:'#f9eecf'},
{id:5,image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=640&q=80',name:'Салат Цезарь',category:'Салаты',price:1250,emoji:'🥗',description:'Курица, салат, сыр и хрустящие сухарики',color:'#e7f3db'},
{id:6,image:'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=640&q=80',name:'Овощной салат',category:'Салаты',price:690,emoji:'🥬',description:'Свежие сезонные овощи',color:'#e5f4e6'},
{id:7,image:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=640&q=80',name:'Чай с лимоном',category:'Напитки',price:350,emoji:'🍵',description:'Горячий ароматный чай',color:'#e8f1d9'},
{id:8,image:'https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=640&q=80',name:'Компот ягодный',category:'Напитки',price:450,emoji:'🧃',description:'Домашний ягодный компот',color:'#f6e3ef'},
{id:9,image:'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=640&q=80',name:'Чизкейк',category:'Десерты',price:950,emoji:'🍰',description:'Нежный сливочный десерт',color:'#f9e8ef'},
{id:10,image:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=640&q=80',name:'Круассан',category:'Десерты',price:650,emoji:'🥐',description:'Свежая хрустящая выпечка',color:'#fff0d9'}
];
menu.forEach(dish => dish.stock = 100); // Начальный остаток каждой позиции
export function findDish(id){return menu.find(item=>item.id===Number(id));}
export function filterMenu(category='Все',query=''){const q=query.trim().toLocaleLowerCase('ru');return menu.filter(item=>(category==='Все'||item.category===category)&&(`${item.name} ${item.description}`).toLocaleLowerCase('ru').includes(q));}

// Каталог редактируется отдельно от DOM. Данные сохраняются только в этом браузере.
const CATALOG_KEY='campus-food-catalog-v2';
export function restoreCatalog(){
 try { const saved=JSON.parse(localStorage.getItem(CATALOG_KEY)||'null');
  if(!saved)return;
  if(Array.isArray(saved.categories)&&Array.isArray(saved.menu)){
   const cleanCategories=saved.categories.filter(x=>typeof x==='string'&&x.length>0&&x.length<=40&&x!=='Все');
   const cleanMenu=saved.menu.filter(x=>Number.isSafeInteger(x.id)&&x.id>0&&typeof x.name==='string'&&x.name.length<=80&&cleanCategories.includes(x.category)&&Number.isSafeInteger(x.price)&&x.price>0&&x.price<=1000000).map(x=>({...x,description:String(x.description||'').slice(0,200),image:String(x.image||'').slice(0,700000),emoji:String(x.emoji||'🍽️').slice(0,8),stock:Number.isSafeInteger(x.stock)&&x.stock>=0?x.stock:100,color:'#f1f6ec'}));
   categories.splice(0,categories.length,'Все',...new Set(cleanCategories));menu.splice(0,menu.length,...cleanMenu);
  }
 }catch{ /* поврежденные данные не блокируют приложение */ }
}
export function persistCatalog(){try{localStorage.setItem(CATALOG_KEY,JSON.stringify({categories:categories.slice(1),menu}));return true;}catch{return false;}}
export function addCategory(name){const value=String(name||'').trim().replace(/\s+/g,' ');if(value.length<2||value.length>40)throw Error('Название категории: от 2 до 40 символов');if(categories.some(x=>x.toLocaleLowerCase('ru')===value.toLocaleLowerCase('ru')))throw Error('Такая категория уже существует');categories.push(value);return value;}
export function addDish(data){const name=String(data.name||'').trim().replace(/\s+/g,' ');const price=Number(data.price);const category=String(data.category||'');const description=String(data.description||'').trim();const image=String(data.image||'').trim();if(name.length<2||name.length>80)throw Error('Название блюда: от 2 до 80 символов');if(!categories.includes(category)||category==='Все')throw Error('Выберите категорию');if(!Number.isSafeInteger(price)||price<1||price>1000000)throw Error('Цена должна быть целым числом от 1 до 1 000 000');if(description.length>200)throw Error('Описание слишком длинное');if(image&&(!(/^https:\/\//i.test(image)||/^data:image\/(png|jpeg|webp);base64,/i.test(image))||image.length>700000))throw Error('Фото должно быть ссылкой https://');const stock=Number(data.stock ?? 20);if(!Number.isSafeInteger(stock)||stock<0||stock>100000)throw Error('Остаток: от 0 до 100 000');const id=Math.max(0,...menu.map(x=>x.id))+1;const dish={id,name,price,stock,category,description,image,emoji:'🍽️',color:'#f1f6ec'};menu.push(dish);return dish;}
export function removeDish(id){const index=menu.findIndex(x=>x.id===Number(id));if(index<0)throw Error('Блюдо не найдено');return menu.splice(index,1)[0];}
export function removeCategory(name){if(name==='Все'||!categories.includes(name))throw Error('Категория не найдена');if(menu.some(x=>x.category===name))throw Error('Сначала удалите блюда из категории');categories.splice(categories.indexOf(name),1);}

// Изменение цены и остатков в админке.
export function updateDish(id, price, stock) {
 const dish=findDish(id);
 if(!dish)throw Error('Блюдо не найдено');
 price=Number(price);stock=Number(stock);
 if(!Number.isSafeInteger(price)||price<1||price>1000000)throw Error('Неверная цена');
 if(!Number.isSafeInteger(stock)||stock<0||stock>100000)throw Error('Неверный остаток');
 dish.price=price;dish.stock=stock;
 return dish;
}
