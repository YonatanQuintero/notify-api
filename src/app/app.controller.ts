import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

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

  @Get('/send-email')
  async sendEmail() {
    const sent = await this.appService.sendEmail();
    return { sent };
  }

  @Get('send-email-on-queue')
  async sendEmailOnQueue() {
    const jobId = await this.appService.sendEmailonQueue();
    return { jobId };
  }

  @Get('/send-welcome-email')
  async sendWelcomeEmail() {
    const jobId = await this.appService.sendWelcomeEmail();
    return { jobId };
  }
}
