import { DomainError } from "src/app/primitives/domain-error";

export class InvalidNotificationNameError extends DomainError {
    constructor(name: string, allowedNames: string) {
        super(
            'invalid-notification-name',
            `Invalid notification name "${name}". Allowed values are: ${allowedNames} `,
            { name, allowedNames }
        );
    }
}