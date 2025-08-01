/**
 * @description
 *
 * Запуск: netcat 127.0.0.1 8124
 */

const repl = require("repl");
const net = require("net");
const packageJSON = require("./package.json");

net
  .createServer(function (socket) {
    // Преобразуем ./package.json в строковую последовательность без отступов
    const str = JSON.stringify(packageJSON, null, 0);
    // Создаем массив 8-ми битных значений длиной str.length
    const binaryArray = new Uint8Array(str.length);

    // Заполняем массив 8-ми битными кодами символов (UTF-8)
    for (var i = 0; i < str.length; i++) {
      ret[i] = str.charCodeAt(i);
    }

    // Отправляем бинарный массив на TCP-сокет
    socket.write(ret);

    repl.start({
      prompt: "node via TCP socket> ",
      socket,
      ignoreUndefined: true,
    });
  })
  .listen(8124, "127.0.0.1");
