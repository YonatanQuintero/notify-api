import { HttpStatus } from "@nestjs/common";
import { DomainError } from "src/app/primitives/domain-error";

export class InvalidNotificationNameError extends DomainError {
    constructor(name: string, allowedNames: string) {
        super(
            HttpStatus.BAD_REQUEST,
            'error.invalid-notification-name',
            { name, allowedNames }
        );
    }
}