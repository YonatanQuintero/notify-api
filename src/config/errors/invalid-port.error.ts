import { HttpStatus } from '@nestjs/common';
import { DomainError } from '../../app/primitives/domain-error';

export class InvalidPortError extends DomainError {
    constructor(port: number) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, 'error.invalid-port', { port });
    }
}
