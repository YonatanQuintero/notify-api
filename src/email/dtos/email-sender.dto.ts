import { LanguageEnum } from "src/config/enums/language.enum";
import { NotificationNameEnum } from "src/notification/enums/notification-name.enum";

export class EmailSenderDto {

    constructor(
        readonly fromEmail: string,
        readonly fromName: string,
        readonly toEmail: string[],
        readonly lang: string | LanguageEnum,
        readonly notificationName: string | NotificationNameEnum,
        readonly params: Record<string, string>,
        readonly ccEmail?: string[],
        readonly bccEmail?: string[],
    ) { }
}