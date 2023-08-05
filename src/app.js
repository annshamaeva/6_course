const http = require('http');
const getUsers = require('./modules/users');

// Обработчик запроса
const server = http.createServer((request, response) => {
    // request - запрос, response - ответ
    // 2 теперь расширим функционал сервера и добавим ... списка пользователей в формате JSON при обращении по адресу /users
    if (request.url === '/?users') {
        response.status = 200; // статус ответа 200
        response.statusMessage = "OK"; // сообщение ОК
        response.header = "Content-Type: application/json"; // чтобы понимать, что добавляем именно строку
        response.write(getUsers()); // передадим в тело сообщения строку hello, world
        response.end();

        return;
    }
    if (request.url === '/?hello=<name>') {
        response.status = 200; // статус ответа 200
        response.statusMessage = "OK"; // сообщение ОК
        response.header = "Content-Type: text/plain"; // чтобы понимать, что добавляем именно строку
        response.write("Hallo, ."); // передадим в тело сообщения строку hello, world
        response.end();
    } else {
        response.status = 400; // статус ответа 400
        response.header = "Content-Type: text/plain"; // чтобы понимать, что добавляем именно строку
        response.write("Enter a name"); // передадим в тело сообщения строку hello, world
        response.end();
    }

    // на любой запрос отвечает hello, world
    response.status = 200; // статус ответа 200
    response.statusMessage = "OK"; // сообщение ОК
    response.header = "Content-Type: text/plain"; // чтобы понимать, что добавляем именно строку
    response.write("Hello, World!"); // передадим в тело сообщения строку hello, world
    response.end();

    if (request) {
        if (Object.keys(request.params).length > 0) {
            response.status = 500
            response.header = "Content-Type: text/plain"; // чтобы понимать, что добавляем именно строку
            response.write("Пустой ответ"); // передадим в тело сообщения строку 
            response.end();

            return
        }
    }
});

server.listen(3003, () => {
    console.log("Сервер запущен по адресу http://127.0.0.1:3003");
})