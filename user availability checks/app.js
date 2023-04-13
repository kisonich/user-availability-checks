const users = require('./src/windows');
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Настройка middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Главная страница
app.get('/', (req, res) => {
  res.render('index', { title: 'Веб-приложение' });
});

// Обработка формы пользователей
app.post('/users', (req, res) => {
  const name = req.body.name;
  users((data) => {
    const value = data.includes(name) ? 0 : -1;
    const message = `${name} ${(value === -1) ? 'не найден' : 'найден'}`;
    res.render('users', { title: `Пользователь ${name}`, name, value, message });
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Приложение запущено на http://localhost:${port}`);
});
