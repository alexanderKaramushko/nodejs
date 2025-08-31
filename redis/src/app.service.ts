import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import { series } from 'async';

export type User = {
  firstName: string;
  lastName: string;
  score: number;
};

export type Score = {
  userId: string;
  name: string;
  score: number;
};

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async createUserWithInfo(body: {
    firstName: string;
    lastName: string;
    score: number;
  }): Promise<User> {
    const { firstName, lastName, score } = body;

    const date = new Date().toUTCString();
    const uuid = uuidv4();

    await this.redisService.client.hset(uuid, 'uuid', uuid);
    await this.redisService.client.hset(uuid, 'firstName', firstName);
    await this.redisService.client.hset(uuid, 'lastName', lastName);
    await this.redisService.client.hset(uuid, 'score', score);
    await this.redisService.client.hset(uuid, 'date', date);

    return this.redisService.client.hgetall(uuid) as unknown as Promise<User>;
  }

  async addScore(body: {
    userId: string;
    name: string;
    score: number;
  }): Promise<void> {
    const { userId, name, score } = body;

    await this.redisService.client.zadd(name, score, userId);
  }

  async getScores(params: { name: string; count: number }): Promise<Score[]> {
    const userIds = await (this.redisService.client.zrange(
      params.name,
      0,
      params.count,
    ) as unknown as Promise<string[]>);

    const scores = userIds.map((userId) => {
      return (callback: (...params: any[]) => any) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.redisService.client.hgetall(userId, function getUser(err, obj) {
          callback(err, obj);
        });
      };
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return series([...scores]);
  }
}
