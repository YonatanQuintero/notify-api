import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { Transporter } from 'nodemailer'

@Injectable()
export class NodeMailerTransporterStubService {
  private readonly transporter: Transporter
  public sentEmails: Array<{ mailOptions: nodemailer.SendMailOptions, info: any }> = []

  constructor () {
    this.transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true
    })

    // Monkey-patch sendMail to capture the email payload
    const originalSendMail = this.transporter.sendMail.bind(this.transporter)
    this.transporter.sendMail = (mailOptions, callback) => {
      originalSendMail(mailOptions, (error, info) => {
        if (error == null) {
          this.sentEmails.push({ mailOptions, info })
        }
        callback(error, info)
      })
    }
  }

  getTransporter (): Transporter {
    return this.transporter
  }
}
