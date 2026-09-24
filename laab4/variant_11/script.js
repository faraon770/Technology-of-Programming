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

const form = document.getElementById('doctorForm');
const result = document.getElementById('result');

// Нельзя выбрать дату в прошлом
const today = new Date().toISOString().slice(0, 10);
document.getElementById('date').min = today;

form.addEventListener('submit', function (event) {
  event.preventDefault();
  result.classList.remove('show');

  const fullName = document.getElementById('fullName').value.trim();
  const speciality = document.getElementById('speciality').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const visit = selectedRadio('visit');

  const results = [];
  results.push(setError('fullName', fullName === '' ? 'Введите ФИО' : ''));
  results.push(setError('speciality', speciality === '' ? 'Выберите специальность врача' : ''));

  let dateMessage = '';
  if (date === '') dateMessage = 'Выберите дату приёма';
  else if (date < today) dateMessage = 'Дата не может быть в прошлом';
  results.push(setError('date', dateMessage));

  let timeMessage = '';
  if (time === '') timeMessage = 'Выберите время приёма';
  else if (time < '08:00' || time > '18:00') timeMessage = 'Врач принимает с 08:00 до 18:00';
  results.push(setError('time', timeMessage));

  results.push(setError('visit', visit === '' ? 'Укажите тип приёма' : ''));

  if (!results.every(Boolean)) return;

  // Творческое: предварительный просмотр записи
  result.innerHTML = '<h2>Вы записаны</h2>' +
    '<p>Пациент: ' + fullName + '</p><p>Врач: ' + speciality + '</p>' +
    '<p>Дата и время: ' + date + ', ' + time + '</p><p>Приём: ' + visit + '</p>';
  result.classList.add('show');
});
