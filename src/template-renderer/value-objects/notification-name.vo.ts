import { NotificationNameEnum } from "../enums/notification-name.enum";
import { InvalidTemplateNameError } from "../errors/invalid-notification-name.error";
import { ValueRequiredError } from "../../common/errors/value-required.error";
import { ValueObject } from "../../common/primitives/value-object";

export class NotificationNameVO extends ValueObject {

    private constructor(private readonly value: NotificationNameEnum) {
        super();
    }

    static create(name?: string | NotificationNameEnum): NotificationNameVO {
        if (!name) {
            throw new ValueRequiredError('Notification Name');
        }

        if (typeof name === 'string') {
            const trimmed = name.trim() as NotificationNameEnum;
            if (!Object.values(NotificationNameEnum).includes(trimmed)) {
                throw new InvalidTemplateNameError(name);
            }
            return new NotificationNameVO(trimmed);
        }

        return new NotificationNameVO(name);
    }

    getValue(): NotificationNameEnum {
        return this.value;
    }
}