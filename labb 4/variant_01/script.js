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

const form = document.getElementById('studentForm');
const result = document.getElementById('result');

function validateName() {
  const value = document.getElementById('fullName').value.trim();
  if (value === '') return setError('fullName', 'Введите ФИО');
  if (value.split(/\s+/).length < 2) return setError('fullName', 'Укажите фамилию и имя (минимум два слова)');
  return setError('fullName', '');
}
function validateEmail() {
  const value = document.getElementById('email').value.trim();
  if (value === '') return setError('email', 'Введите e-mail');
  if (!isEmail(value)) return setError('email', 'E-mail должен быть вида name@example.com');
  return setError('email', '');
}
function validateCourse() {
  if (document.getElementById('course').value === '') return setError('course', 'Выберите курс');
  return setError('course', '');
}
function validateAgree() {
  if (!document.getElementById('agree').checked) return setError('agree', 'Подтвердите согласие с правилами');
  return setError('agree', '');
}

// Творческое задание: проверка «на лету» после первого ввода
document.getElementById('fullName').addEventListener('input', validateName);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('course').addEventListener('change', validateCourse);
document.getElementById('agree').addEventListener('change', validateAgree);

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const ok = [validateName(), validateEmail(), validateCourse(), validateAgree()].every(Boolean);
  result.classList.remove('show');
  if (!ok) return;
  const course = document.getElementById('course');
  result.innerHTML = '<h2>Регистрация прошла успешно</h2>' +
    '<p>ФИО: ' + document.getElementById('fullName').value.trim() + '</p>' +
    '<p>E-mail: ' + document.getElementById('email').value.trim() + '</p>' +
    '<p>Курс: ' + course.options[course.selectedIndex].text + '</p>';
  result.classList.add('show');
});
