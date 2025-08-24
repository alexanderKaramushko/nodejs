import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { RedisService } from 'src/redis/redis.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [RedisService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/create (POST)', () => {
    return request.default(app.getHttpServer()).post('/create').expect(200);
  });
});
