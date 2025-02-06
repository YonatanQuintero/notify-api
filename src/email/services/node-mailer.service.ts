import { Injectable, Logger } from "@nestjs/common";
import { AbstractEmailSenderService } from "../abstracts/email-sender.service.abstract";
import { EmailSender } from "../entities/email-sender.entity";
import { AbstractConfigService } from "src/config/abstracts/config.service.abstract";
import { AbstractTemplateRendererService } from "src/template-renderer/abstracts/template-renderer.service.abstract";
import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { AppConfig } from "src/config/entities/app-config.entity";
import { I18nService } from "nestjs-i18n";
import { TemplateRenderer } from "src/template-renderer/entities/template-renderer.entity";
import { InvalidEmailError } from "../errors/invalid-email.error";

@Injectable()
export class NodeMailerService extends AbstractEmailSenderService {

    private readonly transporter: nodemailer.Transporter;
    private readonly appConfig: AppConfig;

    constructor(
        private readonly i18n: I18nService,
        private readonly configService: AbstractConfigService,
        private readonly templateRendererService: AbstractTemplateRendererService
    ) {
        super();
        this.appConfig = this.configService.getAppConfig();
        this.transporter = nodemailer.createTransport({
            host: this.appConfig.smptHost.getValue(),
            port: this.appConfig.smptPort.getValue(),
            auth: {
                user: this.appConfig.smptUser.getValue(),
                pass: this.appConfig.smptPass.getValue(),
            },
        });
    }

    async send(emailSender: EmailSender): Promise<boolean> {

        try {

            return new Promise(async (resolve, reject) => {
                const mailOptions = await this.buildEmail(emailSender);
                this.transporter.sendMail(mailOptions, (error: any) => {
                    const { to, templateName } = emailSender;
                    if (error) {
                        Logger.error(error.message);
                        Logger.error(JSON.stringify(emailSender));
                        return reject(new InvalidEmailError(error.message));
                    }
                    to.getValues().forEach((email) => {
                        Logger.log(
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
            templateName,
            params,
            cc,
            bcc,
        } = emailSender;

        params["companyName"] = this.appConfig.companyName.getValue();
        params["companySite"] = this.appConfig.companyWebsiteUrl.getValue();
        params["companyIconUrl"] = this.appConfig.companyIconUrl.getValue();
        params["companyAddress"] = this.appConfig.companyAddress.getValue();

        const subject = this.i18n.t(
            `subject.${templateName.getValue()}`,
            { lang: lang.getValue() }
        );

        const html = await this.templateRendererService.render(
            TemplateRenderer.create(
                templateName.getValue(),
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