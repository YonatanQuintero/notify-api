import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AbstractAppConfig } from './infrastructure/abstracts/app-config.abstract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigProvider = app.get<AbstractAppConfig>(AbstractAppConfig);
  const { port } = appConfigProvider.getAppConfig();

  await app.listen(port.getValue(), () => {
    Logger.log(`Application is running on: http://localhost:${port.getValue()}`, 'Bootstrap');
  });
  
}
bootstrap();
