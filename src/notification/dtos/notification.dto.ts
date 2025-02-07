import { NotificationType } from "../enums/notification-type.enum";

export class NotificationDto {

    constructor(
        readonly type: NotificationType,
        readonly recipients: string[],
        readonly templateName: string,
        readonly params: Record<string, string>,
        readonly lang?: string,
        readonly ccEmail?: string[],
        readonly bccEmail?: string[],
    ) {
    }
}