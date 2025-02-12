import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AbstractConfigService } from './config/abstracts/config.service.abstract';
import { LanguageInterceptor } from './app/interceptors/language.interceptor';
import { IPClientInterceptor } from './app/interceptors/ip-client.interceptor';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AbstractConfigService);
  const { port } = configService.getAppConfig();
  app.useGlobalInterceptors(new LanguageInterceptor(configService));
  app.useGlobalInterceptors(new IPClientInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port.getValue(), () => {
    Logger.log(`Application is running on: http://localhost:${port.getValue()}`, 'Bootstrap');
  });

}
bootstrap();
