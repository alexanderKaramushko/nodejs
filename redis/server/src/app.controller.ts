import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService, Score, Stats, User } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  createUserWithInfo(
    @Body() body: { firstName: string; lastName: string; score: number },
  ): Promise<void> {
    return this.appService.createUserWithInfo(body);
  }

  @Get('users')
  getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }

  @Post('score/add/:id')
  addScore(
    @Param() params: { id: string },
    @Body() body: { name: string; score: number },
  ): Promise<string> {
    return this.appService
      .addScore({
        userId: params.id,
        name: body.name,
        score: body.score,
      })
      .then(() => 'OK');
  }

  @Get('scores')
  getScores(
    @Query('name') name: string,
    @Query('count') count: number,
  ): Promise<Score[]> {
    return this.appService.getScores({
      name: name,
      count: count,
    });
  }

  @Get('stats')
  getStats(): Promise<Stats> {
    return this.appService.getStats();
  }
}
