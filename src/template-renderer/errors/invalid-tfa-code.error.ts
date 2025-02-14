import { HttpStatus } from '@nestjs/common';
import { DomainError } from '../../app/primitives/domain-error';

export class InvalidTFACodeError extends DomainError {
    constructor(code: number) {
        super('invalid-tfa-code', `Invalid TFA Code "${code}". Must be a 6-digit number`, { code });
    }
}