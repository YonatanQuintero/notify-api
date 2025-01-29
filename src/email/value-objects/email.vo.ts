import { InvalidEmailError } from '../errors/invalid-email.error';
import { ValueObject } from '../../common/primitives/value-object';
import { ValueRequiredError } from '../../common/errors/value-required.error';

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
        // Regular expression for basic email structure
        const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        // Check for length limits and basic structure in one go
        if (
            !email ||
            email.length > 254 ||
            !emailRegex.test(email)
        ) {
            return false;
        }

        // Split and check part lengths
        const [localPart, domainPart] = email.split('@');
        if (localPart.length > 64 || domainPart.length > 255) {
            return false;
        }

        const domainParts = domainPart.split('.');
        if (domainParts.some(part => part.length > 63)) {
            return false;
        }

        return true;
    }
}