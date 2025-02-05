import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nAppModule } from './../i18n/i18n.module';
import { TemplateRendererModule } from 'src/template-renderer/template-renderer.module';
import { EmailModule } from 'src/email/email.module';
import { ConfigurationModule } from 'src/config/configuration.module';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  imports: [
    I18nAppModule,
    TemplateRendererModule,
    EmailModule,
    ConfigurationModule,
    QueueModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
