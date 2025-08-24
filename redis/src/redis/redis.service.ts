import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number.parseInt(process.env.REDIS_PORT ?? '6379', 10),
    });
  }

  get client() {
    return this.redisClient;
  }

  onModuleDestroy() {
    return this.redisClient.quit();
  }
}
