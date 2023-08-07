const http = require('http');
const getUsers = require('./modules/users');

// Обработчик запроса
const server = http.createServer((request, response) => {
    // request - запрос, response - ответ
    // 2 теперь расширим функционал сервера и добавим ... списка пользователей в формате JSON при обращении по адресу /users
    
    //Мы записали в переменную url параметры запроса, обратились к ней и получили параметры.
    const url = new URL(request.url, 'http://127.0.0.1');
    console.log(url);
    console.log(url.searchParams);

   // с помощью has мы можем понять, есть ли такой параметр users в запросе - has вернет true, когда параметр есть и false, когда параметра не было.
    if (url.searchParams.has('users')) {
        response.statusCode = 200; // статус ответа 200
        response.statusMessage = "OK"; // сообщение ОК
        response.header = "Content-Type: application/json"; // чтобы понимать, что добавляем именно строку
        response.write(getUsers()); // передадим в тело сообщения строку hello, world
        response.end();

        return;
    }
    // Выводим строку Hallo, name, когда есть параметр hello и задано значение /?hello=<name>
    if (url.searchParams.has('hello')) {
        // Проверка, что есть значение 
        if (url.searchParams.get('hello').length > 0) { 
        response.statusCode = 200; // статус ответа 200
        response.header = "Content-Type: text/plain"; // чтобы понимать, что добавляем именно строку
        response.write('Hallo, ' + url.searchParams.get('hello')); // передадим в тело сообщения строку hello, name
        response.end();
    } else {
        response.statusCode = 400; // статус ответа 400
        response.header = "Content-Type: text/plain"; // чтобы понимать, что добавляем именно строку
        response.write("Enter a name"); // передадим в тело сообщения строку hello, world
        response.end();    
    }

        return
    }
    
    for (const key of url.searchParams.keys()) {
        if (key !== 'hello' && key !== 'users') {
            response.statusCode = 500
            response.header = "Content-Type: text/plain"; // чтобы понимать, что добавляем именно строку
            response.write("Пустой ответ"); // передадим в тело сообщения строку 
            response.end();

            return
        }
    }
    // на любой запрос отвечает hello, world
    response.statusCode = 200; // статус ответа 200
    response.statusMessage = "OK"; // сообщение ОК
    response.header = "Content-Type: text/plain"; // чтобы понимать, что добавляем именно строку
    response.write("Hello, World!"); // передадим в тело сообщения строку hello, world
    response.end();

});

server.listen(3003, () => {
    console.log("Сервер запущен по адресу http://127.0.0.1:3003");
})