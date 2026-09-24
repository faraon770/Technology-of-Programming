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

const form = document.getElementById('employeeForm');
const result = document.getElementById('result');
const cityBlock = document.getElementById('cityBlock');

// Динамическое поле: показываем город только при формате «Удалённо»
document.querySelectorAll('input[name="format"]').forEach(function (radio) {
  radio.addEventListener('change', function () {
    cityBlock.classList.toggle('hidden', selectedRadio('format') !== 'Удалённо');
  });
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  result.classList.remove('show');

  const fullName = document.getElementById('fullName').value.trim();
  const ageText = document.getElementById('age').value.trim();
  const age = Number(ageText);
  const department = document.getElementById('department').value;
  const format = selectedRadio('format');
  const city = document.getElementById('city').value.trim();

  const results = [];
  results.push(setError('fullName', fullName === '' ? 'Введите ФИО' : ''));

  let ageMessage = '';
  if (ageText === '') ageMessage = 'Введите возраст';
  else if (!Number.isInteger(age)) ageMessage = 'Возраст должен быть целым числом';
  else if (age < 18 || age > 70) ageMessage = 'Возраст должен быть от 18 до 70 лет';
  results.push(setError('age', ageMessage));

  results.push(setError('department', department === '' ? 'Выберите отдел' : ''));
  results.push(setError('format', format === '' ? 'Выберите формат работы' : ''));

  if (format === 'Удалённо') {
    results.push(setError('city', city === '' ? 'Укажите город проживания' : ''));
  }

  if (!results.every(Boolean)) return;

  result.innerHTML = '<h2>Анкета принята</h2>' +
    '<p>ФИО: ' + fullName + '</p><p>Возраст: ' + age + '</p>' +
    '<p>Отдел: ' + department + '</p><p>Формат: ' + format + '</p>' +
    (format === 'Удалённо' ? '<p>Город: ' + city + '</p>' : '');
  result.classList.add('show');
});
