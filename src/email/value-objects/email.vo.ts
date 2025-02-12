import { InvalidEmailError } from '../errors/invalid-email.error';
import { ValueObject } from '../../app/primitives/value-object';
import { ValueRequiredError } from '../../app/errors/value-required.error';
import validator from 'validator';

export class EmailVO extends ValueObject {

    private constructor(private readonly value: string) {
        super();
    }

    static create(email?: string): EmailVO {
        if (!email) {
            throw new ValueRequiredError('Email');
        }

        const normalizedEmail = email.trim().toLowerCase();
        if (!this.validateEmail(normalizedEmail)) {
            throw new InvalidEmailError(email);
        }

        return new EmailVO(normalizedEmail);
    }

    getValue(): string {
        return this.value;
    }

    private static validateEmail(email: string): boolean {
        return validator.isEmail(email);
    }
}