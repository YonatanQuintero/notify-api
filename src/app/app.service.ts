import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { TemplateNameEnum } from 'src/template-renderer/enums/template-name.enum';
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { AbstractTemplateRendererService } from 'src/template-renderer/abstracts/template-renderer.service.abstract';
import { TemplateRenderer } from 'src/template-renderer/entities/template-renderer.entity';
import { AbstractEmailSenderService } from 'src/email/abstracts/email-sender.service.abstract';
import { EmailSender } from 'src/email/entities/email-sender.entity';
import { AppConfig } from 'src/config/entities/app-config.entity';
import { SendEmailQueue } from 'src/email/queues/send-email.queue';

@Injectable()
export class AppService {

  private readonly appConfig: AppConfig;

  constructor(
    private readonly i18n: I18nService,
    private readonly templateRendererService: AbstractTemplateRendererService,
    private readonly configService: AbstractConfigService,
    private readonly emailService: AbstractEmailSenderService,
    private readonly sendEmailQueue: SendEmailQueue,
  ) {
    this.appConfig = this.configService.getAppConfig();
  }

  getHello(): string {
    return this.i18n.t("test.hello-world", { lang: "es-la" });
  }

  async getTemplate(): Promise<string> {
    return this.templateRendererService.render(
      TemplateRenderer.create(
        TemplateNameEnum.WELCOME,
        LanguageEnum.EN_US,
        {
          "username": "John Doe",
          "companyName": this.appConfig.companyName.getValue(),
          "companySite": this.appConfig.companyWebsiteUrl.getValue(),
          "companyIconUrl": this.appConfig.companyIconUrl.getValue(),
        }
      )
    );
  }

  async sendEmail(): Promise<boolean> {
    const emailSender = EmailSender.create(
      this.appConfig.smptUser.getValue(),
      this.appConfig.companyName.getValue(),
      ["yhonax.qrz@gmail.com"],
      LanguageEnum.ES_LA,
      TemplateNameEnum.WELCOME,
      { "username": "John Doe" }
    )
    return await this.emailService.send(
      emailSender
    );
  }

  async sendEmailonQueue(): Promise<string> {
    const emailSender = EmailSender.create(
      this.appConfig.smptUser.getValue(),
      this.appConfig.companyName.getValue(),
      ["yhonax.qrz@gmail.com"],
      LanguageEnum.ES_LA,
      TemplateNameEnum.WELCOME,
      { "username": "John Doe" }
    );

    const result = await this.sendEmailQueue.add(emailSender);
    return result.id.toString();
  }
}