import { Injectable, Logger } from "@nestjs/common";
import { AbstractEmailSenderService } from "../abstracts/email-sender.service.abstract";
import { AbstractConfigService } from "src/config/abstracts/config.service.abstract";
import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { InvalidEmailError } from "../errors/invalid-email.error";
import { SmtpConfig } from "src/config/entities/smpt-config.entity";
import { EmailSenderDto } from "../dtos/email-sender.dto";

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

    async send(emailSender: EmailSenderDto): Promise<boolean> {

        try {

            return new Promise(async (resolve, reject) => {
                const mailOptions = await this.buildEmail(emailSender);
                this.transporter.sendMail(mailOptions, (error: any) => {
                    const { toEmail, subject } = emailSender;
                    if (error) {
                        Logger.error(error.message);
                        Logger.error(JSON.stringify(emailSender));
                        return reject(new InvalidEmailError(error.message));
                    }
                    toEmail.forEach(email => this.logger.log(`Email sent to: ${email} (${subject})`));
                    return resolve(true);
                });
            });

        } catch (error) {
            Logger.error(`Error sending email: ${error.message}`);
            throw error;
        }
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

        // params["companyName"] = this.companyConfig.name.getValue();
        // params["companySite"] = this.companyConfig.websiteUrl.getValue();
        // params["companyIconUrl"] = this.companyConfig.iconUrl.getValue();
        // params["companyAddress"] = this.companyConfig.address.getValue();

        // const subject = this.i18n.t(
        //     `subject.${notificationName.getValue()}`,
        //     { lang: lang.getValue() }
        // );

        // const html = await this.templateRendererService.render(
        //     TemplateRenderer.create(
        //         notificationName.getValue(),
        //         lang.getValue(),
        //         params
        //     )
        // );

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
}