import { spawn } from 'child_process';
import net from 'net';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const socket = new net.Socket();
socket.setEncoding('utf-8');

const client = socket.connect(3000, 'localhost', () => {
  console.log('Подсоединились к приложению очереди')
});

const logs = spawn('tail', ['-f', path.join(path.dirname(__filename), 'access.log')]);

logs.stdout.setEncoding('utf8');

logs.stdout.on('data', (log) => {
  const parts = /GET\s(\S+)\sHTTP/g.exec(log);

  if (parts && /\.jpg$|\.png|\.gif|\.svg/.test(parts[1])) {
    client.write(parts[1]);
  }
});

process.on('SIGINT', () => {
  console.log('');
  console.log('Сокет отключен');
  client.destroy();
});
