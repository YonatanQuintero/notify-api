import { DomainError } from "src/app/primitives/domain-error";

export class InvalidEmailRecipientListError extends DomainError {
    constructor() {
        super('INVALID_EMAIL_RECIPIENT', 'At least one email is required.');
    }
}