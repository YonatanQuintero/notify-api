import { DomainError } from '../../common/primitives/domain-error';

export class InvalidTFACodeError extends DomainError {
    constructor(code: number) {
        super('INVALID_TFA_CODE', `Invalid tfa code: ${code}. Must be a 6-digit number.`);
    }
}