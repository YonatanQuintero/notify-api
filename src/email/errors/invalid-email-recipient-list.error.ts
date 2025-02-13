import { HttpStatus } from "@nestjs/common";
import { DomainError } from "src/app/primitives/domain-error";

export class InvalidEmailRecipientListError extends DomainError {
    constructor() {
        super(HttpStatus.BAD_REQUEST, 'error.invalid-email-recipient');
    }
}