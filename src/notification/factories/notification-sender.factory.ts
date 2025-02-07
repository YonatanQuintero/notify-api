import { Injectable } from "@nestjs/common";
import { EmailNotificationSender } from "../senders/email-notification.sender";
import { AbstractNotificationSender } from "../abstracts/notification-sender.abstract";
import { NotificationTypeEnum } from "../enums/notification-type.enum";

@Injectable()
export class NotificationSenderFactory {
    constructor(
        private readonly emailNotificationSender: EmailNotificationSender
    ) { }

    getSender(type: NotificationTypeEnum): AbstractNotificationSender {
        switch (type) {
            case NotificationTypeEnum.EMAIL:
                return this.emailNotificationSender;
            default:
                throw new Error(`Unsupported notification type: ${type}`);
        }
    }
}