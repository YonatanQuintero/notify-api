import { HttpStatus } from "@nestjs/common";
import { DomainError } from "../../app/primitives/domain-error";

export class InvalidApiKeyError extends DomainError {
    constructor(minLength: number) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, 'error.invalid-api-key', { minLength });
    }
}