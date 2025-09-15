import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import { series } from 'async';

export type User = {
  uuid: string;
  firstName: string;
  lastName: string;
  score: number;
  date: string;
};

export type Score = {
  userId: string;
  firstName: string;
  lastName: string;
  score: number;
  date: string;
};

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async createUserWithInfo(body: { firstName: string; lastName: string }) {
    const { firstName, lastName } = body;

    const date = new Date().toUTCString();
    const uuid = uuidv4();

    await this.redisService.client.hset(uuid, 'uuid', uuid);
    await this.redisService.client.hset(uuid, 'firstName', firstName);
    await this.redisService.client.hset(uuid, 'lastName', lastName);
    await this.redisService.client.hset(uuid, 'score', 0);
    await this.redisService.client.hset(uuid, 'date', date);

    await this.redisService.client.rpush(
      'users',
      JSON.stringify({
        uuid,
        firstName,
        lastName,
        score: 0,
        date,
      }),
    );
  }

  async getUsers(): Promise<User[]> {
    const users = await this.redisService.client.lrange('users', 0, -1);

    return users.map((user) => JSON.parse(user) as User);
  }

  async addScore(body: {
    userId: string;
    name: string;
    score: number;
  }): Promise<void> {
    const { userId, name, score } = body;

    const users = await this.getUsers();
    const user = await this.redisService.client.hgetall(userId);
    const userIndex = users.findIndex(({ uuid }) => uuid === user.uuid);

    if (!user || userIndex === -1) {
      throw new Error('Пользователь не найден');
    }

    const commonScore = Number.parseInt(user.score ?? '0', 10) + score;

    await this.redisService.client.lset(
      'users',
      userIndex,
      JSON.stringify({
        ...user,
        score: commonScore,
      }),
    );

    await this.redisService.client.hset(userId, 'score', commonScore);

    const currentScore = await this.redisService.client.zscore(name, userId);
    const gameScore = Number.parseInt(currentScore ?? '0', 10) + score;

    await this.redisService.client.zadd(name, gameScore, userId);
  }

  async getScores(params: { name: string; count: number }): Promise<Score[]> {
    const { name, count = -1 } = params;

    const userIds = await (this.redisService.client.zrange(
      name,
      0,
      count <= 0 ? count : count - 1,
    ) as unknown as Promise<string[]>);

    const scores = userIds.reduceRight((acc, userId) => {
      return [
        ...acc,
        (callback: (...params: any[]) => any) => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this.redisService.client.hgetall(userId, function getUser(err, obj) {
            callback(err, obj);
          });
        },
      ];
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return series([...scores]);
  }
}
