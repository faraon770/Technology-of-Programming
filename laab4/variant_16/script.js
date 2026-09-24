// Показать/убрать ошибку у поля с data-field="key"
function setError(key, message) {
  const wrap = document.querySelector('[data-field="' + key + '"]');
  wrap.classList.toggle('invalid', message !== '');
  wrap.classList.toggle('valid', message === '');
  wrap.querySelector('.error').textContent = message;
  return message === '';
}
function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function selectedRadio(name) {
  const el = document.querySelector('input[name="' + name + '"]:checked');
  return el ? el.value : '';
}

const form = document.getElementById('orderForm');
const result = document.getElementById('result');
const cityBlock = document.getElementById('cityBlock');
const addressBlock = document.getElementById('addressBlock');

// Город и адрес нужны только при доставке курьером
document.querySelectorAll('input[name="delivery"]').forEach(function (radio) {
  radio.addEventListener('change', function () {
    const isCourier = selectedRadio('delivery') === 'Курьер';
    cityBlock.classList.toggle('hidden', !isCourier);
    addressBlock.classList.toggle('hidden', !isCourier);
  });
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  result.classList.remove('show');

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const phoneDigits = phone.replace(/\D/g, '');
  const email = document.getElementById('email').value.trim();
  const delivery = selectedRadio('delivery');
  const city = document.getElementById('city').value;
  const address = document.getElementById('address').value.trim();
  const payment = selectedRadio('payment');

  const results = [];
  results.push(setError('name', name.length < 2 ? 'Введите имя (минимум 2 символа)' : ''));

  let phoneMessage = '';
  if (phone === '') phoneMessage = 'Введите телефон';
  else if (phoneDigits.length < 10 || phoneDigits.length > 12) phoneMessage = 'Телефон должен содержать от 10 до 12 цифр';
  results.push(setError('phone', phoneMessage));

  let emailMessage = '';
  if (email === '') emailMessage = 'Введите e-mail';
  else if (!isEmail(email)) emailMessage = 'E-mail должен быть вида name@example.com';
  results.push(setError('email', emailMessage));

  results.push(setError('delivery', delivery === '' ? 'Выберите способ доставки' : ''));
  if (delivery === 'Курьер') {
    results.push(setError('city', city === '' ? 'Выберите город' : ''));
    results.push(setError('address', address.length < 5 ? 'Укажите адрес: улица, дом, квартира' : ''));
  }
  results.push(setError('payment', payment === '' ? 'Выберите способ оплаты' : ''));
  results.push(setError('agreeTerms', document.getElementById('agreeTerms').checked ? '' : 'Примите условия покупки'));
  results.push(setError('agreeData', document.getElementById('agreeData').checked ? '' : 'Дайте согласие на обработку данных'));

  if (!results.every(Boolean)) return;

  result.innerHTML = '<h2>Заказ оформлен</h2>' +
    '<p>Получатель: ' + name + ', ' + phone + '</p><p>E-mail: ' + email + '</p>' +
    '<p>Доставка: ' + delivery + (delivery === 'Курьер' ? ' (' + city + ', ' + address + ')' : '') + '</p>' +
    '<p>Оплата: ' + payment + '</p>';
  result.classList.add('show');
});
