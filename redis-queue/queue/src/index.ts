import net from 'net';
import { Redis } from 'ioredis';

let redis: Redis;

net
  .createServer(async (socket) => {
    redis = new Redis({
      host: "localhost",
      port: 6379,
    });

    redis.on('error', (error) => {
      console.log(error.message)
    });

    await redis.select(6);

    socket.on('data', (imageUrl) => {
      console.log(`Получен ${imageUrl} от ${socket.remoteAddress} на порту ${socket.remotePort}`);

      redis.rpush('images', imageUrl);
    });
  })
  .listen(3000)
  .on('close', async () => {
    await redis.flushdb();

    redis.quit();
  })

console.log('Очередь сообщений запущена на порту 3000')