
const net = require('node:net');

let connectionId = 0;

const server = net.createServer((socket) => {
  const id = ++connectionId;

  console.log(`\nClient #${id} connected`);
  console.log({
    local: `${socket.localAddress}:${socket.localPort}`,
    remote: `${socket.remoteAddress}:${socket.remotePort}`,
  });

  socket.write(`Hello from TCP server. Client #${id}\n`);

  socket.on('data', (data) => {
    console.log(`Client #${id}: ${data.toString().trim()}`);
    socket.write(`Echo: ${data}`);
  });

  socket.on('end', () => {
    console.log(`Client #${id} disconnected`);
  });

  socket.on('error', (error) => {
    console.error(`Client #${id} error:`, error.code);
  });
});

server.listen(9000, '127.0.0.1', () => {
  console.log(`Server PID: ${process.pid}`);
  console.log('Listening on 127.0.0.1:9000');
});
