const net = require('node:net');

const server = net.createServer(
  { allowHalfOpen: true },
  (socket) => {
    console.log('Client connected');

    socket.on('data', (chunk) => {
      console.log(chunk);
      console.log('Received:', chunk.toString());
    });

    socket.on('end', () => {
      console.log('Received FIN from client');

      // Намеренно НЕ вызываем socket.end()
      // Хотим сохранить CLOSE_WAIT
      socket.end();
    });

    socket.on('close', () => {
      console.log('Socket closed');
    });
  },
);

server.listen(9000, '127.0.0.1', () => {
  console.log('Server PID:', process.pid);
});