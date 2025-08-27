import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppService, Score, User } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  createUserWithInfo(
    @Body() body: { firstName: string; lastName: string; score: number },
  ): Promise<User> {
    return this.appService.createUserWithInfo(body);
  }

  @Post('add-score/:id')
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

  @Post('get-scores')
  getScores(@Body() body: { name: string }): Promise<Score[]> {
    return this.appService.getScores({
      name: body.name,
    });
  }
}
