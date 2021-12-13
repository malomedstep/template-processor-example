// тут нужно немного хардкода
// здесь мы создаем обработчики страниц
// каждой странице будет соответствовать запись вида:
//
// exports.имя = function(_req, res) {
//     res.render('имя_страницы', модель);
// }
//
// где:
//  имя - название обработчика, которое будет использоваться в server.js при регистрации маршрута
//  имя_страницы - название vash шаблона, который нужно скомпоновать и вернуть, при этом .vash не пишем
//  модель - объект с данными, которые мы передаем в vash, когда он будет рендерить страницу
//           чтоб лучше понять, что делает модель, посмотри внимательно на код ниже, а затем венись в shared/layout.vash
//           и посмотри в title в head'е

exports.home = function(_req, res) {
    res.render('home', { title: 'Home' });
}

exports.about = function(_req, res) {
    res.render('about', { title: 'About' });
}

exports.contacts = function(_req, res) {
    res.render('contacts', { title: 'Contacts' });
}

// чтобы добавить обработчик для страницы профиля, нужно добавить тут
//
// exports.profile = function(_req, res) {
//     res.render('profile', { title: 'Profile' });
// }
//
// и выполнить все остальные шаги, указанные в server.js