// Учебная авторизация: аккаунты доступны только в этом браузере.
import { checkFullName, checkPhone, checkEmail, checkPassword } from './validation.js';

const USERS = 'campus-food-users-v1';
const SESSION = 'campus-food-session-v1';

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

// Пароль не храним открытым текстом. Это не замена серверной защите.
async function passwordHash(password, salt) {
  const data = new TextEncoder().encode(salt + ':' + password);
  const bytes = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(bytes), n => n.toString(16).padStart(2, '0')).join('');
}

export function currentUser() {
  const id = read(SESSION, null);
  return read(USERS, []).find(user => user.id === id) || null;
}

export async function registerUser(name, phone, email, password) {
  name = checkFullName(name);
  phone = checkPhone(phone);
  email = checkEmail(email);
  checkPassword(password);

  const users = read(USERS, []);
  if (users.some(user => user.email === email)) throw Error('Этот email уже зарегистрирован');
  if (users.some(user => user.phone === phone)) throw Error('Этот номер уже зарегистрирован');

  const salt = crypto.randomUUID();
  const user = { id: crypto.randomUUID(), name, phone, email, salt,
    hash: await passwordHash(password, salt) };
  users.push(user);
  localStorage.setItem(USERS, JSON.stringify(users));
  localStorage.setItem(SESSION, JSON.stringify(user.id));
  return user;
}

export async function loginUser(email, password) {
  email = checkEmail(email);
  const user = read(USERS, []).find(item => item.email === email);
  if (!user || user.hash !== await passwordHash(password, user.salt)) {
    throw Error('Неверный email или пароль');
  }
  localStorage.setItem(SESSION, JSON.stringify(user.id));
  return user;
}

export function logoutUser() { localStorage.removeItem(SESSION); }
export function userOrders(orders, user) {
  return user ? orders.filter(order => order.userId === user.id) : [];
}
