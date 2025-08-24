import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async createUserWithInfo(body: {
    firstName: string;
    lastName: string;
    score: number;
  }): Promise<any> {
    const { firstName, lastName, score } = body;

    const date = new Date().toUTCString();
    const uuid = uuidv4();

    await this.redisService.client.hset(uuid, 'firstName', firstName);
    await this.redisService.client.hset(uuid, 'lastName', lastName);
    await this.redisService.client.hset(uuid, 'score', score);
    await this.redisService.client.hset(uuid, 'date', date);

    return this.redisService.client.hgetall(uuid);
  }
}
