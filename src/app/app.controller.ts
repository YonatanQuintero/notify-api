import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get("status")
  @HttpCode(HttpStatus.OK)
  async status(): Promise<void> {
    console.log('App service is running');
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/template')
  async getTemplate(
  ) {
    const rendered = await this.appService.getTemplate();
    return { rendered };
  }

}
