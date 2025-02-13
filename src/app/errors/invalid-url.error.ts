import { HttpStatus } from "@nestjs/common";
import { DomainError } from "../primitives/domain-error";

export class InvalidUrlError extends DomainError {
    constructor(url: string) {
        super(HttpStatus.BAD_REQUEST, 'error.invalid-url', { url });
    }
}