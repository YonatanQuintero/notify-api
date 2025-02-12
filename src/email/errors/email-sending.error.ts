import { DomainError } from "src/app/primitives/domain-error";

export class EmailSendingError extends DomainError {
    constructor(message: string) {
        super("EMAIL_SENDING_ERROR", message);
    }
}
