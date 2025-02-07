import { DomainError } from "src/common/primitives/domain-error";
import { NotificationNameEnum } from "../enums/notification-name.enum";

export class InvalidNotificationNameError extends DomainError {
    constructor(name: string) {
        super('INVALID_NOTIFICATION_NAME',
            `Invalid notification name "${name}". Supported names: ${Object.values(NotificationNameEnum).join(', ')}.`
        );
    }
}