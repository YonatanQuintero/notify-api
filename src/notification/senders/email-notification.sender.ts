import { Injectable, Logger } from "@nestjs/common";
import { AbstractNotificationSender } from "../abstracts/notification-sender.abstract";
import { NotificationDto } from "../dtos/notification.dto";
import { AbstractConfigService } from "src/config/abstracts/config.service.abstract";
import { SendEmailQueue } from "src/email/queues/send-email.queue";
import { SmtpConfig } from "src/config/entities/smpt-config.entity";
import { CompanyConfig } from "src/config/entities/company-config.entity";
import { EmailSenderDto } from "src/email/dtos/email-sender.dto";
import { AppConfig } from "src/config/entities/app-config.entity";
import { NotificationMetaDto } from "../dtos/notification-meta.dto";

@Injectable()
export class EmailNotificationSender extends AbstractNotificationSender {

    private readonly logger = new Logger(EmailNotificationSender.name);

    private readonly smtpConfig: SmtpConfig;
    private readonly companyConfig: CompanyConfig;
    private readonly appConfig: AppConfig;
    private readonly fromEmail: string;
    private readonly fromName: string;

    constructor(
        private readonly configService: AbstractConfigService,
        private readonly sendEmailQueue: SendEmailQueue
    ) {
        super();
        this.smtpConfig = this.configService.getSmtpConfig();
        this.companyConfig = this.configService.getCompanyConfig();
        this.appConfig = this.configService.getAppConfig();
        this.fromEmail = this.smtpConfig.user.getValue();
        this.fromName = this.companyConfig.name.getValue();
    }

    async send(dto: NotificationDto, metaDto: NotificationMetaDto): Promise<string> {
        try {
            const result = await this.sendEmailQueue.add(
                new EmailSenderDto(
                    this.fromEmail,
                    this.fromName,
                    dto.recipients,
                    metaDto.lang,
                    dto.name,
                    dto.params,
                    dto.ccEmail,
                    dto.bccEmail,
                ),
            );
            return result.id.toString();
        } catch (error) {
            this.logger.error(`Failed to send notification: ${error.message}`);
            throw error;
        }
    }
}