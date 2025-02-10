import { Module } from "@nestjs/common";
import { EmailModule } from "src/email/email.module";
import { NotificationService } from "./services/notification.service";
import { NotificationController } from "./controllers/notification.controller";
import { NotificationSenderFactory } from "./factories/notification-sender.factory";
import { EmailNotificationSender } from "./senders/email-notification.sender";

@Module({
    imports: [
        EmailModule
    ],
    controllers: [
        // EmailNotification
        NotificationController
    ],
    providers: [
        NotificationSenderFactory,
        EmailNotificationSender,
        NotificationService
    ],
    exports: [],
})
export class NotificationModule { }