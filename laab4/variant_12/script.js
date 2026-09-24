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

const form = document.getElementById('confForm');
const result = document.getElementById('result');
const counter = document.getElementById('counter');

function getSections() {
  return Array.from(document.querySelectorAll('input[name="section"]:checked'))
    .map(function (box) { return box.value; });
}

// Творческое: счётчик выбранных секций
document.querySelectorAll('input[name="section"]').forEach(function (box) {
  box.addEventListener('change', function () {
    counter.textContent = 'Выбрано секций: ' + getSections().length;
  });
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  result.classList.remove('show');

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const role = document.getElementById('role').value;
  const sections = getSections();

  const results = [];
  results.push(setError('fullName', fullName === '' ? 'Введите ФИО' : ''));

  let emailMessage = '';
  if (email === '') emailMessage = 'Введите e-mail';
  else if (!isEmail(email)) emailMessage = 'E-mail должен быть вида name@example.com';
  results.push(setError('email', emailMessage));

  results.push(setError('role', role === '' ? 'Выберите роль участника' : ''));
  results.push(setError('sections', sections.length === 0 ? 'Выберите хотя бы одну секцию' : ''));

  if (!results.every(Boolean)) return;

  result.innerHTML = '<h2>Вы зарегистрированы</h2>' +
    '<p>ФИО: ' + fullName + '</p><p>E-mail: ' + email + '</p>' +
    '<p>Роль: ' + role + '</p><p>Секции: ' + sections.join(', ') + '</p>';
  result.classList.add('show');
});
