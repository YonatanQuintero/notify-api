import { Injectable, Logger } from '@nestjs/common'
import { AbstractEmailSenderService } from '../abstracts/email-sender.service.abstract'
import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { EmailSenderDto } from '../dtos/email-sender.dto'
import { EmailSenderError } from '../errors/email-sender.error'
import { NodeMailerTransporterService } from './node-mailer-transporter.service'

@Injectable()
export class NodeMailerService extends AbstractEmailSenderService {
  private readonly logger = new Logger(NodeMailerService.name)
  private readonly transporter: nodemailer.Transporter

  constructor (
    private readonly transporterService: NodeMailerTransporterService
  ) {
    super()
    this.transporter = this.transporterService.getTransporter()
  }

  private async buildEmail (emailSender: EmailSenderDto): Promise<Mail.Options> {
    const {
      fromEmail,
      fromName,
      toEmail,
      subject,
      html,
      ccEmail,
      bccEmail
    } = emailSender

    return {
      from: {
        name: fromName,
        address: fromEmail
      },
      to: toEmail.join(','),
      cc: (ccEmail != null) ? ccEmail.join(',') : undefined,
      bcc: (bccEmail != null) ? bccEmail.join(',') : undefined,
      subject,
      html
    }
  }

  async send (emailSender: EmailSenderDto): Promise<boolean> {
    try {
      const mailOptions = await this.buildEmail(emailSender)
      return await new Promise((resolve, reject) => {
        this.transporter.sendMail(mailOptions, (error: any) => {
          const { toEmail, subject } = emailSender
          if (error != null) {
            this.logger.error(error.message)
            this.logger.error(JSON.stringify(emailSender))
            reject(new EmailSenderError(error.message))
            return
          }
          toEmail.forEach(email => this.logger.log(`Email sent to: ${email} (${subject})`))
          return resolve(true)
        })
      })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      this.logger.error(`Error sending email: ${message}`)
      throw error
    }
  }
}
