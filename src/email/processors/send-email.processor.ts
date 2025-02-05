import { Process, Processor } from "@nestjs/bull";
import { AbstractProcessor } from "src/queue/abstracts/processor.abstract";
import { SEND_EMAIL_QUEUE } from "src/queue/constants/queue.constants";
import { EmailSender } from "../entities/email-sender.entity";
import { Job } from "bull";
import { Logger } from "@nestjs/common";
import { AbstractEmailSenderService } from "../abstracts/email-sender.service.abstract";
import { AbstractConfigService } from "src/config/abstracts/config.service.abstract";
import { AppConfig } from "src/config/entities/app-config.entity";
import { LanguageEnum } from "src/config/enums/language.enum";
import { TemplateNameEnum } from "src/template-renderer/enums/template-name.enum";

@Processor(SEND_EMAIL_QUEUE)
export class SendEmailProcessor extends AbstractProcessor<EmailSender> {

    private readonly appConfig: AppConfig;

    constructor(
        private readonly emailService: AbstractEmailSenderService,
        private readonly configService: AbstractConfigService
    ) {
        super();
        this.appConfig = this.configService.getAppConfig();
    }

    @Process()
    async run(job: Job<EmailSender>): Promise<void> {
        try {
            // console.log(job.data instanceof EmailSender)
            // const data = job.data as EmailSender;
            // console.log(data);
            // console.log(data.templateName);
            // console.log(data instanceof EmailSender)
            // await this.emailService.send(data);
            const emailSender = EmailSender.create(
                this.appConfig.smptUser.getValue(),
                this.appConfig.companyName.getValue(),
                ["yhonax.qrz@gmail.com"],
                LanguageEnum.ES_LA,
                TemplateNameEnum.WELCOME,
                { "username": "John Doe" }
            )
            await this.emailService.send(
                emailSender
            );
        } catch (error) {
            Logger.error(`Error sending email: ${error.message}`);
        }
    }
}