import { Module } from '@nestjs/common';
import { AbstractEmailSenderService } from './abstracts/email-sender.service.abstract';
import { NodeMailerService } from './services/node-mailer.service';
import { I18nAppModule } from 'src/i18n/i18n.module';
import { TemplateRendererModule } from 'src/template-renderer/template-renderer.module';
import { SendEmailQueue } from './queues/send-email.queue';
import { SendEmailProcessor } from './processors/send-email.processor';
import { SubjectService } from './services/subject.service';

@Module({
  imports: [
    I18nAppModule,
    TemplateRendererModule
  ],
  providers: [{
    provide: AbstractEmailSenderService,
    useClass: NodeMailerService,
  },
    SendEmailQueue,
    SendEmailProcessor,
    SubjectService,
  ],
  exports: [
    AbstractEmailSenderService,
    SendEmailQueue,
    SendEmailProcessor,
    SubjectService,
  ],
})
export class EmailModule { }
