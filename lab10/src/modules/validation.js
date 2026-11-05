// Проверки вынесены отдельно, чтобы их легко найти и изменить.
export function checkFullName(value) {
  const name = String(value || '').trim().replace(/\s+/g, ' ');
  const words = name.split(' ');
  if (words.length < 2 || words.length > 3 || !words.every(word => /^[А-Яа-яЁёӘәҒғҚқҢңӨөҰұҮүҺһІіA-Za-z-]{2,}$/.test(word))) {
    throw new Error('Введите ФИО: фамилию и имя (можно отчество), только буквы, минимум по 2 буквы');
  }
  return name;
}

export function checkPhone(value) {
  const raw = String(value || '').trim();
  // Разрешаем +7 777 123 45 67, 8 (777) 123-45-67, 87771234567.
  if (!/^[+\d\s()-]+$/.test(raw)) throw new Error('Номер телефона содержит недопустимые символы');
  const digits = raw.replace(/\D/g, '');
  if (digits.length !== 11 || !['7', '8'].includes(digits[0]) || digits[1] !== '7') {
    throw new Error('Введите номер Казахстана: +7 777 123 45 67');
  }
  return '+7' + digits.slice(1);
}

export function checkEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Введите корректный email');
  return email;
}

export function checkPassword(value) {
  if (String(value).length < 8) throw new Error('Пароль должен содержать минимум 8 символов');
  return value;
}
