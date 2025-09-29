import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

@Injectable()
export class StatsMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.baseUrl.trim().length === 0 || /\.[A-Za-z]+$/.test(req.baseUrl)) {
      next();
      return;
    }

    const client = Redis.createClient();

    await client.select(2);

    if (req.ip) {
      await client.sadd('ip', req.ip);
    }

    await client.hincrby('paths', req.baseUrl, 1);

    await client.quit();

    next();
  }
}
