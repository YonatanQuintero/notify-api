import { Injectable } from "@nestjs/common";
import { NotificationDto } from "../dtos/notification.dto";

@Injectable()
export abstract class AbstractNotificationSender {

    abstract send(dto: NotificationDto): Promise<string>;
}