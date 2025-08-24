import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  createUserWithInfo(
    @Body() body: { firstName: string; lastName: string; score: number },
  ): Promise<string> {
    return this.appService.createUserWithInfo(body);
  }
}
