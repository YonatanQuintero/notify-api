import { HttpStatus } from '@nestjs/common';
import { DomainError } from '../../app/primitives/domain-error';

export class InvalidTemplateBaseError extends DomainError {
    constructor() {
        super(HttpStatus.INTERNAL_SERVER_ERROR, `Must be a instance of TemplateBase.`);
    }
}