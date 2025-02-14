import { DomainError } from "src/app/primitives/domain-error";

export class InvalidEmailRecipientListError extends DomainError {
    constructor() {
        super(
            'invalid-email-recipient-list',
            'At least one email is required.',
        );
    }
}