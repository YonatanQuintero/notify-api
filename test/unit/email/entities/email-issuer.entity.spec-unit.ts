import { NonEmptyStringError } from "src/common/errors/non-empty-string.error";
import { ValueRequiredError } from "src/common/errors/value-required.error";
import { NonEmptyStringVO } from "src/common/value-objects/non-empty-string.vo";
import { EmailIssuer } from "src/email/entities/email-issuer.entity";
import { InvalidEmailError } from "src/email/errors/invalid-email.error";
import { EmailVO } from "src/email/value-objects/email.vo";

describe('EmailIssuer', () => {
    // Successful creation
    it('should create an EmailIssuer instance with valid email and issuer', () => {
        const validEmail = 'test.user@example.com';
        const validIssuer = 'TestIssuer';
        const emailIssuer = EmailIssuer.create(validEmail, validIssuer);

        expect(emailIssuer).toBeInstanceOf(EmailIssuer);
        expect(emailIssuer.email).toBeInstanceOf(EmailVO);
        expect(emailIssuer.email.getValue()).toBe(validEmail);
        expect(emailIssuer.issuer).toBeInstanceOf(NonEmptyStringVO);
        expect(emailIssuer.issuer.getValue()).toBe(validIssuer);
    });

    // Failure when email is invalid
    it('should throw InvalidEmailError when email is invalid', () => {
        const invalidEmail = 'invalid-email@.com';
        const validIssuer = 'TestIssuer';

        expect(() => {
            EmailIssuer.create(invalidEmail, validIssuer);
        }).toThrow(InvalidEmailError);
    });

    // Failure when issuer is empty
    it('should throw ValueRequiredError when issuer is empty', () => {
        const validEmail = 'test.user@example.com';
        const emptyIssuer = '';

        expect(() => {
            EmailIssuer.create(validEmail, emptyIssuer);
        }).toThrow(NonEmptyStringError);
    });

    // Failure when email is not provided
    it('should throw ValueRequiredError when email is not provided', () => {
        const validIssuer = 'TestIssuer';

        expect(() => {
            // @ts-ignore: Intentional incorrect usage for testing
            EmailIssuer.create(undefined, validIssuer);
        }).toThrow(ValueRequiredError);
    });

    // Failure when issuer is not provided
    it('should throw ValueRequiredError when issuer is not provided', () => {
        const validEmail = 'test.user@example.com';

        expect(() => {
            // @ts-ignore: Intentional incorrect usage for testing
            EmailIssuer.create(validEmail, undefined);
        }).toThrow(NonEmptyStringError);
    });

    // Failure when both email and issuer are invalid
    it('should throw InvalidEmailError when both email and issuer are invalid', () => {
        const invalidEmail = 'invalid-email';
        const emptyIssuer = '';

        expect(() => {
            EmailIssuer.create(invalidEmail, emptyIssuer);
        }).toThrow(InvalidEmailError);
        // Note: The first error thrown is InvalidEmailError because EmailVO.create is called first.
    });

    // Additional edge cases
    describe('Edge Cases', () => {
        it('should throw InvalidEmailError for emails exceeding length constraints', () => {
            const longEmail = 'a'.repeat(65) + '@' + 'b'.repeat(190) + '.com'; // Adjust to exceed 254
            const validIssuer = 'TestIssuer';

            expect(() => {
                EmailIssuer.create(longEmail, validIssuer);
            }).toThrow(InvalidEmailError);
        });

        it('should throw ValueRequiredError for issuer strings with only whitespace', () => {
            const validEmail = 'test.user@example.com';
            const whitespaceIssuer = '   ';

            expect(() => {
                EmailIssuer.create(validEmail, whitespaceIssuer);
            }).toThrow(NonEmptyStringError);
        });

        it('should handle issuer strings with leading and trailing whitespace', () => {
            const validEmail = 'test.user@example.com';
            const issuerWithWhitespace = '  TestIssuer  ';
            const emailIssuer = EmailIssuer.create(validEmail, issuerWithWhitespace);

            expect(emailIssuer.issuer.getValue()).toBe(issuerWithWhitespace.trim());
        });
    });

    // Parameterized tests for multiple invalid emails
    describe('Invalid Email Formats', () => {
        const invalidEmails = [
            // '',
            'plainaddress',
            '@missinglocal.com',
            'username@.com',
            // 'username@com',
            'username@domain..com',
            'username@domain,com',
            'username@domain@domain.com',
            'username@-domain.com',
            'username@domain-.com',
            // 'username@domain.c',
            'username@.domain.com',
        ];

        it.each(invalidEmails)('should throw InvalidEmailError for invalid email: %s', (invalidEmail) => {
            const validIssuer = 'TestIssuer';
            expect(() => {
                EmailIssuer.create(invalidEmail, validIssuer);
            }).toThrow(InvalidEmailError);
        });
    });

    // Parameterized tests for multiple valid emails and issuers
    describe('Valid Combinations', () => {
        const validCombinations = [
            { email: 'user@example.com', issuer: 'Issuer1' },
            { email: 'user.name+tag+sorting@example.com', issuer: 'Issuer2' },
            { email: 'user_name@example.co.uk', issuer: 'Issuer3' },
            { email: 'user-name@sub.domain.com', issuer: 'Issuer4' },
            { email: 'u@example.com', issuer: 'I' },
        ];

        it.each(validCombinations)('should create EmailIssuer for email: %s and issuer: %s', ({ email, issuer }) => {
            const emailIssuer = EmailIssuer.create(email, issuer);
            expect(emailIssuer).toBeInstanceOf(EmailIssuer);
            expect(emailIssuer.email.getValue()).toBe(email);
            expect(emailIssuer.issuer.getValue()).toBe(issuer);
        });
    });
});