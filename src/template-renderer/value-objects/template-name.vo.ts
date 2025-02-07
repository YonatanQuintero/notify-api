import { NotificationNameEnum } from "../enums/notification-name.enum";
import { InvalidTemplateNameError } from "../errors/invalid-template-name.error";
import { ValueRequiredError } from "../../common/errors/value-required.error";
import { ValueObject } from "../../common/primitives/value-object";

export class TemplateNameVO extends ValueObject {

    private constructor(private readonly value: NotificationNameEnum) {
        super();
    }

    static create(name?: string | NotificationNameEnum): TemplateNameVO {
        if (!name) {
            throw new ValueRequiredError('Template Name');
        }

        if (typeof name === 'string') {
            const trimmed = name.trim() as NotificationNameEnum;
            if (!Object.values(NotificationNameEnum).includes(trimmed)) {
                throw new InvalidTemplateNameError(name);
            }
            return new TemplateNameVO(trimmed);
        }

        return new TemplateNameVO(name);
    }

    getValue(): NotificationNameEnum {
        return this.value;
    }
}