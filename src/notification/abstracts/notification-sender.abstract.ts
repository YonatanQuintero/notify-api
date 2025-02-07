import { Injectable } from "@nestjs/common";
import { NotificationDto } from "../dtos/notification.dto";
import { NotificationMetaDto } from "../dtos/notification-meta.dto";

@Injectable()
export abstract class AbstractNotificationSender {

    abstract send(dto: NotificationDto, metaDto: NotificationMetaDto): Promise<string>;
}