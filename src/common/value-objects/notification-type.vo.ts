import { NotificationType } from "../enums/notification-type.enum";
import { InvalidNotificationTypeError } from "../errors/invalid-notification-type.error";
import { ValueRequiredError } from "../errors/value-required.error";
import { ValueObject } from "../primitives/value-object";

export class NotificationTypeVO extends ValueObject {

    private constructor(private readonly value: NotificationType) {
        super();
    }

    static create(type?: string): NotificationTypeVO {
        if (!type) {
            throw new ValueRequiredError('Notification type');
        }

        const notificationType = type.trim() as NotificationType;
        if (!Object.values(NotificationType).includes(notificationType)) {
            throw new InvalidNotificationTypeError(type);
        }

        return new NotificationTypeVO(notificationType);
    }

    getValue(): NotificationType {
        return this.value;
    }
}