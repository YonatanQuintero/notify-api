import { NotificationNameEnum } from "../enums/notification-name.enum";
import { NotificationTypeEnum } from "../enums/notification-type.enum";

export class NotificationDto {

    constructor(
        readonly type: NotificationTypeEnum,
        readonly recipients: string[],
        readonly name: NotificationNameEnum,
        readonly params: Record<string, string>,
        readonly ccEmail?: string[],
        readonly bccEmail?: string[],
    ) {
    }
}