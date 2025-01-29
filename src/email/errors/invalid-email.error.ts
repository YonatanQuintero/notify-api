import { DomainError } from "src/common/primitives/domain-error";

export class InvalidEmailError extends DomainError {
    constructor(email: string) {
        super('INVALID_EMAIL', `Invalid email address "${email}".`);
    }
}