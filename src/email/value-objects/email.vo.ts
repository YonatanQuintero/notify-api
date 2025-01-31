import { InvalidEmailError } from '../errors/invalid-email.error';
import { ValueObject } from '../../common/primitives/value-object';
import { ValueRequiredError } from '../../common/errors/value-required.error';
import validator from 'validator';

export class EmailVO extends ValueObject {

    private constructor(private readonly value: string) {
        super();
    }

    static create(email?: string): EmailVO {
        if (!email) {
            throw new ValueRequiredError('Email');
        }

        if (!this.validateEmail(email)) {
            throw new InvalidEmailError(email);
        }

        return new EmailVO(email);
    }

    getValue(): string {
        return this.value;
    }

    private static validateEmail(email: string): boolean {
        return validator.isEmail(email);
    }
}