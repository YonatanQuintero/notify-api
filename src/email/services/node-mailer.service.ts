import { Injectable, Logger } from "@nestjs/common";
import { AbstractEmailSenderService } from "../abstracts/email-sender.service.abstract";
import { EmailSender } from "../entities/email-sender.entity";
import { AbstractConfigService } from "src/config/abstracts/config.service.abstract";
import { AbstractTemplateRendererService } from "src/template-renderer/abstracts/template-renderer.service.abstract";
import * as nodemailer from "nodemailer";

@Injectable()
export class NodeMailerService extends AbstractEmailSenderService {

    private readonly transporter: nodemailer.Transporter;

    constructor(
        private readonly configService: AbstractConfigService,
        private readonly templateRendererService: AbstractTemplateRendererService
    ) {
        super();
    }



    async send(emailSender: EmailSender): Promise<boolean> {

        try {

            return false;

        } catch (error) {
            Logger.error(`Error sending email: ${error.message}`);
            throw error;
        }

    }
}