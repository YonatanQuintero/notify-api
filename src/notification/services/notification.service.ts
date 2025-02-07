import { Injectable } from "@nestjs/common";
import { NotificationSenderFactory } from "../factories/notification-sender.factory";
import { NotificationDto } from "../dtos/notification.dto";
import { NotificationMetaDto } from "../dtos/notification-meta.dto";

@Injectable()
export class NotificationService {

    constructor(
        private readonly senderFactory: NotificationSenderFactory
    ) { }

    async sendNotification(dto: NotificationDto, metaDto: NotificationMetaDto): Promise<string> {
        const sender = this.senderFactory.getSender(dto.type);
        return await sender.send(dto, metaDto);
    }
}