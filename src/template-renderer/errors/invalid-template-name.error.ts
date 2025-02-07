import { DomainError } from "src/common/primitives/domain-error";
import { NotificationNameEnum } from "../enums/notification-name.enum";

export class InvalidTemplateNameError extends DomainError {
    constructor(name: string) {
        super('INVALID_TEMPLATE_NAME',
            `Invalid template name "${name}". Supported names: ${Object.values(NotificationNameEnum).join(', ')}.`
        );
    }
}