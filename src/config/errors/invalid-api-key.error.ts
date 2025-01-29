import { DomainError } from "../../common/primitives/domain-error";

export class InvalidApiKeyError extends DomainError {
    constructor(minLength: number) {
        super('INVALID_API_KEY', `API key cannot be empty or less than ${minLength} characters long.`);
    }
}