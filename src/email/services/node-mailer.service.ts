import { Injectable, Logger } from "@nestjs/common";
import { AbstractEmailSenderService } from "../abstracts/email-sender.service.abstract";
import { EmailSender } from "../entities/email-sender.entity";
import { AbstractConfigService } from "src/config/abstracts/config.service.abstract";
import { AbstractTemplateRendererService } from "src/template-renderer/abstracts/template-renderer.service.abstract";
import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { I18nService } from "nestjs-i18n";
import { TemplateRenderer } from "src/template-renderer/entities/template-renderer.entity";
import { InvalidEmailError } from "../errors/invalid-email.error";
import { SmtpConfig } from "src/config/entities/smpt-config.entity";
import { CompanyConfig } from "src/config/entities/company-config.entity";

@Injectable()
export class NodeMailerService extends AbstractEmailSenderService {

    private readonly logger = new Logger(NodeMailerService.name);
    private readonly transporter: nodemailer.Transporter;
    private readonly smtpConfig: SmtpConfig;
    private readonly companyConfig: CompanyConfig;

    constructor(
        private readonly i18n: I18nService,
        private readonly configService: AbstractConfigService,
        private readonly templateRendererService: AbstractTemplateRendererService
    ) {
        super();
        this.smtpConfig = this.configService.getSmtpConfig();
        this.companyConfig = this.configService.getCompanyConfig();
        this.transporter = nodemailer.createTransport({
            host: this.smtpConfig.host.getValue(),
            port: this.smtpConfig.port.getValue(),
            auth: {
                user: this.smtpConfig.user.getValue(),
                pass: this.smtpConfig.pass.getValue(),
            },
        });
    }

    async send(emailSender: EmailSender): Promise<boolean> {

        try {

            return new Promise(async (resolve, reject) => {
                const mailOptions = await this.buildEmail(emailSender);
                this.transporter.sendMail(mailOptions, (error: any) => {
                    const { to, notificationName: templateName } = emailSender;
                    if (error) {
                        Logger.error(error.message);
                        Logger.error(JSON.stringify(emailSender));
                        return reject(new InvalidEmailError(error.message));
                    }
                    to.getValues().forEach((email) => {
                        this.logger.log(
                            `Email sent to: ${email} (${templateName.getValue()})`
                        );
                    });
                    return resolve(true);
                });
            });

        } catch (error) {
            Logger.error(`Error sending email: ${error.message}`);
            throw error;
        }
    }

    private async buildEmail(emailSender: EmailSender): Promise<Mail.Options> {

        const {
            from,
            to,
            lang,
            notificationName,
            params,
            cc,
            bcc,
        } = emailSender;

        params["companyName"] = this.companyConfig.name.getValue();
        params["companySite"] = this.companyConfig.websiteUrl.getValue();
        params["companyIconUrl"] = this.companyConfig.iconUrl.getValue();
        params["companyAddress"] = this.companyConfig.address.getValue();

        const subject = this.i18n.t(
            `subject.${notificationName.getValue()}`,
            { lang: lang.getValue() }
        );

        const html = await this.templateRendererService.render(
            TemplateRenderer.create(
                notificationName.getValue(),
                lang.getValue(),
                params
            )
        );

        return {
            from: {
                name: from.issuer.getValue(),
                address: from.email.getValue()
            },
            to: to.getValues().join(','),
            cc: cc ? cc.map((ccEmail) => ccEmail.getValue()).join(',') : undefined,
            bcc: bcc ? bcc.map((bccEmail) => bccEmail.getValue()).join(',') : undefined,
            subject,
            html
        }
    }
}