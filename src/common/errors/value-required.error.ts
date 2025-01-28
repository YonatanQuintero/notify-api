import { DomainError } from "../primitives/domain-error";

export class ValueRequiredError extends DomainError {
    constructor(propertyName: string) {
        super('VALUE_REQUIRED', `Value for "${propertyName}" is required.`);
    }
}