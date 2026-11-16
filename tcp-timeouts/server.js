const net = require('node:net');

const socket = net.connect({
  // ведет на 192.168.1.1, интерфейс en1
  // проверяем connection timeout:
  // sudo tcpdump -nn -i en0 \ 'host 203.0.113.10 and tcp port 5432'
  host: '203.0.113.10',
  port: 5432,
});

const timer = setTimeout(() => {
  console.log('CLIENT_CONNECT_TIMEOUT: 4000ms');
  socket.destroy();
}, 4000);

socket.on('connect', () => {
  clearTimeout(timer);
  console.log('CONNECTED');
  socket.end();
});

socket.on('error', (error) => {
  clearTimeout(timer);
  console.log('ERROR:', error.code);
});

socket.on('close', () => clearTimeout(timer));