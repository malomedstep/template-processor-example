// Как я уже указал, шаблон построен на nodejs и express
// Что это для нас значит:
//   как обычно мы запускаем сайт в браузере? 2 варианта:
//    - просто открыть html страницу в браузере, как файл
//    - использовать live server
//   если использовать live server - запускается простейший веб-сервер, 
//   который принимает запросы, и в зависимости от строки запроса возвращает тот ли иной файл
//   Например, если запустить live server и ввести в браузере localhost/index.html,
//   live server поймёт, что нам нужен index.html, попытается его найти в папке с проектом, и, если он там есть - вернёт его нам
//   Так работает примитивнейший веб-сервер. Но нам такой вариант не подходит, потому, что нам нужно перед тем, как возвращать страницу
//   скомпоновать её, то есть, подключить хедер, футер и т.д.
//   Поэтому мы создадим свой live server и добавим в него дополнительную логику, для того, чтобы делать эту компоновку
//
//   Строить его мы будем, как уже было указано, на nodejs и express
//   Nodejs позволяет создавать приложения, которые слушают сетевые запросы и возвращают ответы
//   Но писать такое на голом nodejs - больно. Express позволяет уменьшить количество кода, необходимого для таких приложений

// импортируем express, чтобы создать и настроить сервер
const express = require('express');

// импортируем модуль с маршрутами, детальнее читай в routes/index.js
const routes = require('./routes');

// импортируем пакет для работы с путями, он нужен будет чуть ниже
const path = require('path');

// импортируем небольшой пакет, с помощью которого наш сервер будет возвращать иконку сайта
const favicon = require('serve-favicon');

// создаём объект, который будет слушать сеть и обслуживать запросы
const app = express();

// указываем порт 3000, на который должны приходить запросы
// то есть, в адресной строке браузера надо будет указывать localhost:3000, а не просто localhost
app.set('port', 3000);

// указываем путь к папке, в которой будут находиться наши страницы, хедеры и футеры
// тут нам и пригодился path, для того, чтобы сконструировать правильный полный путь к папке
app.set('views', path.join( __dirname, '/views'));

// указываем, что обрабатывать и рендерить страницы будет vash
// существует много view engine - vash, pug, jade и т.д.
// мы используем vash
app.set('view engine', 'vash');

// подключаем модуль, который будет возвращать иконку сайта, указываем путь к ней
app.use(favicon(__dirname + '/public/favicon.ico'));

// указываем, что статические файлы (css, js, ttf, png и т.д.) будут лежать в папке public
app.use(express.static(path.join(__dirname, 'public')));

// всё, что выше - трогать не надо, один раз написано и всё

// а вот ниже мы настраиваем маршруты, это трогать надо
// семантика следующая:
// app.get(маршрут, обработчик)
// где:
// маршрут - текст, указываемый в адресной строке браузера после localhost:3000
// обработчик - функция, которая будет возвращать нужную страницу
// обработчики определены в routes/index.js, за подробностями прошу туда
// в данном примере у нас 3 страницы и, соответственно, 3 маршрута

app.get('/', routes.home);              // http://localhost:3000 -> home.vash
app.get('/about', routes.about);        // http://localhost:3000/about -> about.vash
app.get('/contacts', routes.contacts);  // http://localhost:3000/contacts -> contacts.vash
// если нужно добавить еще страницы на сайт - регистрируем их тут, например
// если хотим добавить страницу профиля пользователя, делаем следующее:
// - создаем в папке views файл profile.vash с кодом страницы
// - создаем обработчик в routes/index.js - там увидишь, как это делается
// - добавляем тут следующую строку 
//
//         app.get('/profile', routes.profile);
//
// после всех этих телодвижений, можно открывать http://localhost:3000/profile



// запускаем сервер, с этого момента приложение будет слушать 3000 порт, принимать запросы и отдавать страницы
// тут ничего менять тоже не нужно
app.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});