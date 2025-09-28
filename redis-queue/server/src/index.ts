import http from 'node:http';
import Redis from 'ioredis';
import { Logger } from '@origranot/ts-logger';

const logger = new Logger();
const server = http.createServer();

server.on('error', (error) => {
  logger.error(error.message);
});

server.on('request', (request, response) => {
  if (request.url?.includes('queue')) {
    const redisClient = new Redis({
      host: "localhost",
      port: 6379,
    });

    redisClient.on('reconnecting', () => {
      logger.info('Попытка реконнекта к Redis');
    });

    redisClient.select(6);

    redisClient.lpop('images', (error, reply) => {
      if (error) {
        response.statusCode = 404;
        logger.error(`Не удалось достать лог из очереди: ${error.message}`);
        return;
      }

      logger.info('Достаем адрес из очереди логов');
      response.statusCode = 200;

      if (reply) {
        response.write(reply);
      } else {
        response.write('Очередь пуста');
      }

      response.end();

      // Закрываем соединение с Redis,
      // чтобы овободить память, так как
      // в один момент сервер может зависнуть из-за
      // пикового кол-ва открытых соединений
      redisClient.quit();
    });
  }
});

server.listen(8124);

console.log('Сервер запущен на порту 8124');