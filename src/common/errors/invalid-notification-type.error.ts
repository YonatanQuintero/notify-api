import { NotificationType } from "../enums/notification-type.enum";
import { DomainError } from "../primitives/domain-error";

export class InvalidNotificationTypeError extends DomainError {
    constructor(type: string) {
        super('INVALID_NOTIFICATION_TYPE',
            `Invalid notification type "${type}". Supported types: ${Object.values(NotificationType).join(', ')}.`
        );
    }
}