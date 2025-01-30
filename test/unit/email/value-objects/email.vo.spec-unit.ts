import { ValueRequiredError } from "src/common/errors/value-required.error";
import { InvalidEmailError } from "src/email/errors/invalid-email.error";
import { EmailVO } from "src/email/value-objects/email.vo";

describe('EmailVO', () => {
    // Successful creation
    it('should create an EmailVO instance with a valid email', () => {
        const validEmail = 'test.user@example.com';
        const emailVO = EmailVO.create(validEmail);
        expect(emailVO).toBeInstanceOf(EmailVO);
        expect(emailVO.getValue()).toBe(validEmail);
    });

    // Failure when email is not provided
    it('should throw ValueRequiredError when email is not provided', () => {
        expect(() => {
            EmailVO.create();
        }).toThrow(ValueRequiredError);
    });

    // Failure when email is invalid
    it('should throw InvalidEmailError when email format is invalid', () => {
        const invalidEmail = 'invalid-email@.com';
        expect(() => {
            EmailVO.create(invalidEmail);
        }).toThrow(InvalidEmailError);
    });

    // Failure when local part exceeds 64 characters
    it('should throw InvalidEmailError when local part exceeds 64 characters', () => {
        const longLocalPart = 'a'.repeat(65);
        const email = `${longLocalPart}@example.com`;
        expect(() => {
            EmailVO.create(email);
        }).toThrow(InvalidEmailError);
    });

    // Failure when domain part exceeds 255 characters
    it('should throw InvalidEmailError when domain part exceeds 255 characters', () => {
        const longDomainPart = 'a'.repeat(256) + '.com';
        const email = `user@${longDomainPart}`;
        expect(() => {
            EmailVO.create(email);
        }).toThrow(InvalidEmailError);
    });

    // Failure when any domain label exceeds 63 characters
    it('should throw InvalidEmailError when a domain label exceeds 63 characters', () => {
        const longDomainLabel = 'a'.repeat(64);
        const email = `user@${longDomainLabel}.com`;
        expect(() => {
            EmailVO.create(email);
        }).toThrow(InvalidEmailError);
    });

    // Failure when email exceeds overall length of 254 characters
    it('should throw InvalidEmailError when email exceeds 254 characters', () => {
        const localPart = 'a'.repeat(64);
        const domainPart = 'b'.repeat(189) + '.com'; // 64 + 1 + 189 + 4 = 258
        const email = `${localPart}@${domainPart}`;
        expect(() => {
            EmailVO.create(email);
        }).toThrow(InvalidEmailError);
    });

});
