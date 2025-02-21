import { LanguageEnum } from 'src/config/enums/language.enum'
import { WelcomeEmailDto } from '../dtos/welcome-email.dto'
import { Injectable } from '@nestjs/common'
import { TemplateRenderer } from 'src/template-renderer/entities/template-renderer.entity'
import { NotificationNameEnum } from '../enums/notification-name.enum'
import { SmtpConfig } from 'src/config/entities/smpt-config.entity'
import { CompanyConfig } from 'src/config/entities/company-config.entity'
import { AbstractTemplateRendererService } from 'src/template-renderer/abstracts/template-renderer.service.abstract'
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract'
import { SendEmailQueue } from 'src/email/queues/send-email.queue'
import { SubjectService } from 'src/email/services/subject.service'
import { EmailSender } from 'src/email/entities/email-sender.entity'
import { EmailBaseDto } from '../dtos/email-base.dto'
import { RecoverPasswordSuccessEmailDto } from '../dtos/recover-password-success-email.dto'
import { TfaEmailDto } from '../dtos/tfa-email.dto'
import { UpdateEmailDto } from '../dtos/update-email.dto'
import { UpdatePasswordDto } from '../dtos/update-password-email.dto'
import { createBase, createTFA } from 'src/template-renderer/factories/template-entity.factory'

@Injectable()
export class EmailNotificationService {
  private readonly smtpConfig: SmtpConfig
  private readonly companyConfig: CompanyConfig

  constructor (
    private readonly templateRendererService: AbstractTemplateRendererService,
    private readonly configService: AbstractConfigService,
    private readonly sendEmailQueue: SendEmailQueue,
    private readonly subjectService: SubjectService
  ) {
    this.smtpConfig = this.configService.getSmtpConfig()
    this.companyConfig = this.configService.getCompanyConfig()
  }

  private async sendEmail (template: TemplateRenderer, dto: EmailBaseDto): Promise<string> {
    const html = await this.templateRendererService.render(template)

    const subject = this.subjectService.getSubject(
      template.name.getValue(),
      template.language.getValue()
    )

    const emailSender = EmailSender.create(
      this.smtpConfig.user.getValue(),
      this.companyConfig.name.getValue(),
      dto.to,
      subject,
      html,
      dto.cc,
      dto.bcc
    )

    const job = await this.sendEmailQueue.add(emailSender.toDto())

    return job.id.toString()
  }

  async sendBaseEmail (dto: EmailBaseDto, lang: LanguageEnum, name: NotificationNameEnum): Promise<string> {
    const template = TemplateRenderer.create(
      name,
      lang,
      createBase(
        dto.username,
        this.companyConfig.name.getValue(),
        this.companyConfig.websiteUrl.getValue(),
        this.companyConfig.iconUrl.getValue()
      )
    )

    return await this.sendEmail(template, dto)
  }

  async sendWelcomeEmail (dto: WelcomeEmailDto, lang: LanguageEnum): Promise<string> {
    return await this.sendBaseEmail(dto, lang, NotificationNameEnum.WELCOME)
  }

  async sendRecoverPasswordSuccessEmail (dto: RecoverPasswordSuccessEmailDto, lang: LanguageEnum): Promise<string> {
    return await this.sendBaseEmail(dto, lang, NotificationNameEnum.RECOVER_PASSWORD_SUCCESS)
  }

  async sendUpdateEmail (dto: UpdateEmailDto, lang: LanguageEnum): Promise<string> {
    return await this.sendBaseEmail(dto, lang, NotificationNameEnum.UPDATE_EMAIL)
  }

  async sendUpdatePassword (dto: UpdatePasswordDto, lang: LanguageEnum): Promise<string> {
    return await this.sendBaseEmail(dto, lang, NotificationNameEnum.UPDATE_PASSWORD)
  }

  async sendTfaEmail (dto: TfaEmailDto, lang: LanguageEnum, ipClient: string): Promise<string> {
    const template = TemplateRenderer.create(
      NotificationNameEnum.TFA,
      lang,
      createTFA(
        dto.username,
        this.companyConfig.name.getValue(),
        this.companyConfig.websiteUrl.getValue(),
        this.companyConfig.iconUrl.getValue(),
        dto.code,
        dto.ttlFormatted,
        ipClient
      )
    )

    return await this.sendEmail(template, dto)
  }
}
