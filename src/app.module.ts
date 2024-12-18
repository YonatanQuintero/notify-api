import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './infrastructure/config/configuration.module';
import { I18nAppModule } from './i18n/i18n.module';

@Module({
  imports: [
    ConfigurationModule,
    I18nAppModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
