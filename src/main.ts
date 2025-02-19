import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AbstractConfigService } from './config/abstracts/config.service.abstract';
import { LanguageInterceptor } from './app/interceptors/language.interceptor';
import { IPClientInterceptor } from './app/interceptors/ip-client.interceptor';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AbstractConfigService);
  const { port } = configService.getAppConfig();

  app.useGlobalInterceptors(new LanguageInterceptor(configService));
  app.useGlobalInterceptors(new IPClientInterceptor());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));

  const config = new DocumentBuilder()
    .setTitle('Notify API')
    .setDescription('Notification API for sending emails.')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port.getValue(), () => {
    Logger.log(`Application is running on: http://localhost:${port.getValue()}`, 'Bootstrap');
  });

}
bootstrap();
