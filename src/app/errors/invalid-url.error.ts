import { DomainError } from "../primitives/domain-error";

export class InvalidUrlError extends DomainError {
    constructor(url: string) {
        super('invalid-url', `Invalid URL "${url}"`, { url });
    }
}