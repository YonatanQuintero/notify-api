import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { Transporter } from 'nodemailer'
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract'

@Injectable()
export class NodeMailerTransporterService {
  private readonly transporter: Transporter

  constructor (
    private readonly configService: AbstractConfigService
  ) {
    const smtpConfig = this.configService.getSmtpConfig()
    this.transporter = nodemailer.createTransport({
      host: smtpConfig.host.getValue(),
      port: smtpConfig.port.getValue(),
      auth: {
        user: smtpConfig.user.getValue(),
        pass: smtpConfig.pass.getValue()
      }
    })
  }

  getTransporter (): Transporter {
    return this.transporter
  }
}
