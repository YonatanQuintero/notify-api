import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { NotificationNameEnum } from 'src/notification/enums/notification-name.enum';
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { AbstractTemplateRendererService } from 'src/template-renderer/abstracts/template-renderer.service.abstract';
import { TemplateRenderer } from 'src/template-renderer/entities/template-renderer.entity';
import { AbstractEmailSenderService } from 'src/email/abstracts/email-sender.service.abstract';
import { EmailSender } from 'src/email/entities/email-sender.entity';
import { SendEmailQueue } from 'src/email/queues/send-email.queue';
import { EmailSenderDto } from 'src/email/dtos/email-sender.dto';
import { SmtpConfig } from 'src/config/entities/smpt-config.entity';
import { CompanyConfig } from 'src/config/entities/company-config.entity';
import { threadId } from 'worker_threads';
import { TemplateEntityFactory } from 'src/template-renderer/factories/template-entity.factory';
import { WelcomeEmailDto } from 'src/notification/dtos/welcome-email.dto';
import { TemplateBase } from 'src/template-renderer/entities/template-base.entity';
import { WelcomeTemplate } from 'src/template-renderer/entities/welcome-template.entity';
import { SubjectService } from 'src/email/services/subject.service';

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
    private readonly subjectService: SubjectService,
  ) {
    this.smtpConfig = this.configService.getSmtpConfig();
    this.companyConfig = this.configService.getCompanyConfig();
  }

  getHello(): string {
    return this.i18n.t("test.hello-world", { lang: "es-la" });
  }

  async getTemplate(): Promise<string> {

    const params = TemplateEntityFactory.createBase(
      "John Doe",
      this.companyConfig.name.getValue(),
      this.companyConfig.websiteUrl.getValue(),
      this.companyConfig.iconUrl.getValue(),
    );

    const template = TemplateRenderer.create(
      NotificationNameEnum.WELCOME,
      LanguageEnum.EN_US,
      params
    );

    return this.templateRendererService.render(template);

  }

  async sendEmail(): Promise<boolean> {
    // const emailSender = EmailSender.create(new EmailSenderDto(
    //   this.smtpConfig.user.getValue(),
    //   this.companyConfig.name.getValue(),
    //   ["yhonax.qrz@gmail.com"],
    //   LanguageEnum.ES_LA,
    //   NotificationNameEnum.WELCOME,
    //   { "username": "John Doe" }
    // ))

    // return await this.emailService.send(
    //   emailSender
    // );
    return false;
  }

  async sendEmailonQueue(): Promise<string> {
    // const result = await this.sendEmailQueue.add(new EmailSenderDto(
    //   this.smtpConfig.user.getValue(),
    //   this.companyConfig.name.getValue(),
    //   ["yhonax.qrz@gmail.com"],
    //   LanguageEnum.ES_LA,
    //   NotificationNameEnum.WELCOME,
    //   { "username": "John Doe" }
    // ));
    // return result.id.toString();
    return "Not implemented";
  }

  async sendWelcomeEmail(): Promise<string> {

    const welcomeEmailDto: WelcomeEmailDto = {
      "toEmail": ["yhonax.qrz@gmail.com"],
      "username": "yonax",
      "ccEmail": ["yonax73@gmail.com"],
      "bccEmail": ["yonatan.a.quintero@gmail.com"]
    }

    const headers = {
      "language": "es-la",
    }

    const template = TemplateRenderer.create(
      NotificationNameEnum.WELCOME,
      headers.language,
      TemplateEntityFactory.createBase(
        welcomeEmailDto.username,
        this.companyConfig.name.getValue(),
        this.companyConfig.websiteUrl.getValue(),
        this.companyConfig.iconUrl.getValue(),
      )
    );

    const html = await this.templateRendererService.render(template);

    const subject = this.subjectService.getSubject(
      template.name.getValue(),
      template.language.getValue()
    );

    const emailSender = EmailSender.create(
      this.smtpConfig.user.getValue(),
      this.companyConfig.name.getValue(),
      welcomeEmailDto.toEmail,
      subject,
      html,
      welcomeEmailDto.ccEmail,
      welcomeEmailDto.bccEmail
    );

    const job = await this.sendEmailQueue.add(emailSender.toDto());

    return job.id.toString();

  }


}