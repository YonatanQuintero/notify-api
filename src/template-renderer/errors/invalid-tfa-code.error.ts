import { HttpStatus } from '@nestjs/common';
import { DomainError } from '../../app/primitives/domain-error';

export class InvalidTFACodeError extends DomainError {
    constructor(code: number) {
        super(HttpStatus.BAD_REQUEST, 'error.invalid-tfa-code', { code });
    }
}