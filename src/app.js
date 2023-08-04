const http = require('http');
const getUsers = require('./modules/users');

// Обработчик запроса
const server = http.createServer( (request, response) => {
    // request - запрос, response - ответ
    // 2 теперь расширим функционал сервера и добавим ... списка пользователей в формате JSON при обращении по адресу /users

    const urlParams = new URLSearchParams(request.url.slice(1));

    if (urlParams.has('hello')) {
        const name = urlParams.get('hello');
    
    if (name) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(`Hello, ${name}!`);
    } else {
        response.writeHead(400, { 'Content-Type': 'text/html' });
        response.end('Enter a name');
    }
  } else if (request.url === '?users') {
    getUsers(getUsers, 'utf-8', (err, data) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end();
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(data);
      }
    });
  } else if (Object.keys(urlParams).length === 0) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end('Hello, World!');
  } else {
    response.writeHead(500, { 'Content-Type': 'text/html' });
    response.end();
  }

    // на любой запрос отвечает hello, world
    response.status = 200; // статус ответа 200
    response.statusMessage = "OK"; // сообщение ОК
    response.header = "Content-Type: text/plain"; // чтобы понимать, что добавляем именно строку
    response.write("hello, world"); // передадим в тело сообщения строку hello, world
    response.end();
});

server.listen(3003,() => {
    console.log("Сервер запущен по адресу http://127.0.0.1:3003");
})