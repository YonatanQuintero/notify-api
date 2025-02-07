import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { NotificationNameEnum } from 'src/template-renderer/enums/notification-name.enum';
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { AbstractTemplateRendererService } from 'src/template-renderer/abstracts/template-renderer.service.abstract';
import { TemplateRenderer } from 'src/template-renderer/entities/template-renderer.entity';
import { AbstractEmailSenderService } from 'src/email/abstracts/email-sender.service.abstract';
import { EmailSender } from 'src/email/entities/email-sender.entity';
import { SendEmailQueue } from 'src/email/queues/send-email.queue';
import { EmailSenderDto } from 'src/email/dtos/email-sender.dto';
import { SmtpConfig } from 'src/config/entities/smpt-config.entity';
import { CompanyConfig } from 'src/config/entities/company-config.entity';

@Injectable()
export class AppService {

  private readonly smtpConfig: SmtpConfig;
  private readonly companyConfig: CompanyConfig;

  constructor(
    private readonly i18n: I18nService,
    private readonly templateRendererService: AbstractTemplateRendererService,
    private readonly configService: AbstractConfigService,
    private readonly emailService: AbstractEmailSenderService,
    private readonly sendEmailQueue: SendEmailQueue,
  ) {
    this.smtpConfig = this.configService.getSmtpConfig();
    this.companyConfig = this.configService.getCompanyConfig();
  }

  getHello(): string {
    return this.i18n.t("test.hello-world", { lang: "es-la" });
  }

  async getTemplate(): Promise<string> {
    return this.templateRendererService.render(
      TemplateRenderer.create(
        NotificationNameEnum.WELCOME,
        LanguageEnum.EN_US,
        {
          "username": "John Doe",
          "companyName": this.companyConfig.name.getValue(),
          "companySite": this.companyConfig.websiteUrl.getValue(),
          "companyIconUrl": this.companyConfig.iconUrl.getValue(),
        }
      )
    );
  }

  async sendEmail(): Promise<boolean> {
    const emailSender = EmailSender.create(new EmailSenderDto(
      this.smtpConfig.user.getValue(),
      this.companyConfig.name.getValue(),
      ["yhonax.qrz@gmail.com"],
      LanguageEnum.ES_LA,
      NotificationNameEnum.WELCOME,
      { "username": "John Doe" }
    ))

    return await this.emailService.send(
      emailSender
    );
  }

  async sendEmailonQueue(): Promise<string> {
    const result = await this.sendEmailQueue.add(new EmailSenderDto(
      this.smtpConfig.user.getValue(),
      this.companyConfig.name.getValue(),
      ["yhonax.qrz@gmail.com"],
      LanguageEnum.ES_LA,
      NotificationNameEnum.WELCOME,
      { "username": "John Doe" }
    ));
    return result.id.toString();
  }
}