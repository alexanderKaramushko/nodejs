import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

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

  /**
   * @todo
   */
  async getScores(params: { name: string }): Promise<Score[]> {
    return this.redisService.client.zrange(
      params.name,
      0,
      4,
    ) as unknown as Promise<Score[]>;
  }
}
