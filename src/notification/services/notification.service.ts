import { Injectable } from "@nestjs/common";
import { NotificationSenderFactory } from "../factories/notification-sender.factory";
import { NotificationDto } from "../dtos/notification.dto";

@Injectable()
export class NotificationService {

    constructor(
        private readonly senderFactory: NotificationSenderFactory
    ) { }

    sendNotification(dto: NotificationDto): Promise<string> {
        const sender = this.senderFactory.getSender(dto.type);
        return sender.send(dto);
    }
}