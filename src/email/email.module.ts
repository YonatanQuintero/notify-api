import { Module } from '@nestjs/common';
import { AbstractEmailSenderService } from './abstracts/email-sender.service.abstract';
import { NodeMailerService } from './services/node-mailer.service';
import { I18nAppModule } from 'src/i18n/i18n.module';
import { TemplateRendererModule } from 'src/template-renderer/template-renderer.module';
import { ConfigurationModule } from 'src/config/configuration.module';
import { SendEmailQueue } from './queues/send-email.queue';
import { SendEmailProcessor } from './processors/send-email.processor';

@Module({
  imports: [
    I18nAppModule,
    TemplateRendererModule,
    ConfigurationModule
  ],
  providers: [{
    provide: AbstractEmailSenderService,
    useClass: NodeMailerService,
  },
    SendEmailQueue,
    SendEmailProcessor
  ],
  exports: [
    AbstractEmailSenderService, SendEmailQueue, SendEmailProcessor
  ],
})
export class EmailModule { }
