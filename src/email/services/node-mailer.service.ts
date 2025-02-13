import { Injectable, Logger } from "@nestjs/common";
import { AbstractEmailSenderService } from "../abstracts/email-sender.service.abstract";
import { AbstractConfigService } from "src/config/abstracts/config.service.abstract";
import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { SmtpConfig } from "src/config/entities/smpt-config.entity";
import { EmailSenderDto } from "../dtos/email-sender.dto";
import { EmailSenderError } from "../errors/email-sender.error";

@Injectable()
export class NodeMailerService extends AbstractEmailSenderService {

    private readonly logger = new Logger(NodeMailerService.name);
    private readonly transporter: nodemailer.Transporter;
    private readonly smtpConfig: SmtpConfig;

    constructor(
        private readonly configService: AbstractConfigService,
    ) {
        super();
        this.smtpConfig = this.configService.getSmtpConfig();
        this.transporter = nodemailer.createTransport({
            host: this.smtpConfig.host.getValue(),
            port: this.smtpConfig.port.getValue(),
            auth: {
                user: this.smtpConfig.user.getValue(),
                pass: this.smtpConfig.pass.getValue(),
            },
        });
    }

    private async buildEmail(emailSender: EmailSenderDto): Promise<Mail.Options> {

        const {
            fromEmail,
            fromName,
            toEmail,
            subject,
            html,
            ccEmail,
            bccEmail,
        } = emailSender;

        return {
            from: {
                name: fromName,
                address: fromEmail,
            },
            to: toEmail.join(','),
            cc: ccEmail ? ccEmail.join(',') : undefined,
            bcc: bccEmail ? bccEmail.join(',') : undefined,
            subject,
            html
        }
    }

    async send(emailSender: EmailSenderDto): Promise<boolean> {

        try {

            return new Promise(async (resolve, reject) => {
                const mailOptions = await this.buildEmail(emailSender);
                this.transporter.sendMail(mailOptions, (error: any) => {
                    const { toEmail, subject } = emailSender;
                    if (error) {
                        this.logger.error(error.message);
                        this.logger.error(JSON.stringify(emailSender));
                        return reject(new EmailSenderError(error.message));
                    }
                    toEmail.forEach(email => this.logger.log(`Email sent to: ${email} (${subject})`));
                    return resolve(true);
                });
            });

        } catch (error) {
            this.logger.error(`Error sending email: ${error.message}`);
            throw error;
        }
    }
}