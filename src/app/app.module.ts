import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from '../config/configuration.module';
import { I18nAppModule } from './../i18n/i18n.module';
import { TemplateRendererModule } from 'src/template-renderer/template-renderer.module';

@Module({
  imports: [
    ConfigurationModule,
    I18nAppModule,
    TemplateRendererModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
