import { HttpStatus } from "@nestjs/common";
import { DomainError } from "../primitives/domain-error";

export class ValueRequiredError extends DomainError {
    constructor(propertyName: string) {
        super(
            HttpStatus.BAD_REQUEST,
            'error.value-required',
            { propertyName }
        );
    }
}