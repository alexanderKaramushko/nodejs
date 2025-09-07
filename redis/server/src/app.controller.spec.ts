import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { RedisModule } from './redis/redis.module';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [RedisModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('должен вернуть созданного пользователя', async () => {
      expect(
        await appController.createUserWithInfo({
          firstName: 'Alex',
          lastName: 'Karamushko',
          score: 500,
        }),
      ).toEqual({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        date: expect.stringContaining('GMT'),
        firstName: 'Alex',
        lastName: 'Karamushko',
        score: '500',
      });
    });
  });
});
