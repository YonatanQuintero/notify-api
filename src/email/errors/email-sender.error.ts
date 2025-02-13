import { HttpStatus } from "@nestjs/common";
import { DomainError } from "src/app/primitives/domain-error";

export class EmailSenderError extends DomainError {
    constructor(message: string) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, 'error.invalid-email-error', { message });
    }
}