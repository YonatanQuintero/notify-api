import { DomainError } from "../primitives/domain-error";

export class InvalidUrlError extends DomainError {
    constructor(url: string) {
        super('INVALID_URL', `Invalid URL "${url}".`);
    }
}