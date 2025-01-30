import { Module } from '@nestjs/common';
import { AbstractEmailSenderService } from './abstracts/email-sender.service.abstract';
import { NodeMailerService } from './services/node-mailer.service';
import { ConfigurationModule } from 'src/config/configuration.module';
import { I18nAppModule } from 'src/i18n/i18n.module';
import { TemplateRendererModule } from 'src/template-renderer/template-renderer.module';

@Module({
  imports: [ConfigurationModule, I18nAppModule, TemplateRendererModule],
  providers: [{
    provide: AbstractEmailSenderService,
    useClass: NodeMailerService,
  }],
  exports: [AbstractEmailSenderService],
})
export class EmailModule { }
