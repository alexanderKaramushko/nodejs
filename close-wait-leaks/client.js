const net = require('node:net');

const socket = net.connect(9000, '127.0.0.1');

socket.on('connect', () => {
  console.log('Connected');

  socket.end('Hello PostgreSQL');
  console.log('FIN initiated');
});

socket.on('end', () => {
  console.log('Server sent FIN');
});

socket.on('close', () => {
  console.log('Connection closed');
});

socket.on('error', console.error);