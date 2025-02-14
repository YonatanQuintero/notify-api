import { DomainError } from "src/app/primitives/domain-error";

export class EmailSenderError extends DomainError {
    constructor(message: string) {
        super("email-sender-error", `Error sending email: "${message}"`, { message });
    }
}