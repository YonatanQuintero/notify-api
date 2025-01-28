import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { AbstractConfigService } from './config/abstracts/config.service.abstract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AbstractConfigService);
  const { port } = configService.getAppConfig();

  await app.listen(port.getValue(), () => {
    Logger.log(`Application is running on: http://localhost:${port.getValue()}`, 'Bootstrap');
  });

}
bootstrap();
