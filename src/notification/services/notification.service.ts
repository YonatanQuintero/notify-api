import { Injectable } from "@nestjs/common";
import { NotificationSenderFactory } from "../factories/notification-sender.factory";
import { NotificationDto } from "../dtos/notification.dto";

@Injectable()
export class NotificationService {

    constructor(
        private readonly senderFactory: NotificationSenderFactory
    ) { }

    async sendNotification(dto: NotificationDto): Promise<string> {
        const sender = this.senderFactory.getSender(dto.type);
        return await sender.send(dto);
        // return 'job-123';
    }
}