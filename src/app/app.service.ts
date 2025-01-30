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

@Injectable()
export class AppService {

  private readonly appConfig: AppConfig;

  constructor(
    private readonly i18n: I18nService,
    private readonly templateRendererService: AbstractTemplateRendererService,
    private readonly configService: AbstractConfigService,
    private readonly emailService: AbstractEmailSenderService
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
        new Map([
          ["username", "John Doe"],
          ["companyName", this.appConfig.companyName.getValue()],
          ["site", this.appConfig.companyWebsiteUrl.getValue()],
          ["logo", this.appConfig.companyIconUrl.getValue()],
        ])
      )
    );
  }

  async sendEmail(): Promise<boolean> {
    return await this.emailService.send(
      EmailSender.create(
        this.appConfig.smptUser.getValue(),
        this.appConfig.companyName.getValue(),
        ["yhonax.qrz@gmail.com"],
        LanguageEnum.ES_LA,
        TemplateNameEnum.WELCOME,
        new Map([["username", "John Doe"]])
      ));
  }
}