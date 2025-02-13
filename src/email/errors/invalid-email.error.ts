import { HttpStatus } from "@nestjs/common";
import { DomainError } from "src/app/primitives/domain-error";

export class InvalidEmailError extends DomainError {
    constructor(email: string) {
        super(HttpStatus.BAD_REQUEST, 'error.invalid-email', { email });
    }
}