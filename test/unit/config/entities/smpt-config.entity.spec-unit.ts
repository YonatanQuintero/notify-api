import { PortVO } from '../../../../src/config/value-objects/port.vo';
import { InvalidPortError } from 'src/config/errors/invalid-port.error';
import { NonEmptyStringError } from 'src/app/errors/non-empty-string.error';
import { NonEmptyStringVO } from 'src/app/value-objects/non-empty-string.vo';
import { SmtpConfig } from 'src/config/entities/smpt-config.entity';

describe('SmptConfig', () => {
    const validData = {
        host: 'smtp.example.com',
        port: 587,
        user: 'smtp-user',
        pass: 'smtp-pass'
    };

    it('should create an SmptConfig instance with valid data', () => {
        const smptConfig = SmtpConfig.create(
            validData.host,
            validData.port,
            validData.user,
            validData.pass
        );

        expect(smptConfig).toBeInstanceOf(SmtpConfig);
        expect(smptConfig.host).toBeInstanceOf(NonEmptyStringVO);
        expect(smptConfig.port).toBeInstanceOf(PortVO);
        expect(smptConfig.user).toBeInstanceOf(NonEmptyStringVO);
        expect(smptConfig.pass).toBeInstanceOf(NonEmptyStringVO);
        expect(smptConfig.host.getValue()).toBe(validData.host);
    });

    it('should throw an error if the SMTP host is empty', () => {
        expect(() =>
            SmtpConfig.create(
                '', // Empty SMTP host
                validData.port,
                validData.user,
                validData.pass,
            )
        ).toThrow(NonEmptyStringError);
    });

    it('should throw an error if the port is invalid', () => {
        expect(() =>
            SmtpConfig.create(
                validData.host,
                -1, // Invalid port
                validData.user,
                validData.pass
            )
        ).toThrow(InvalidPortError);
    });

    it('should throw an error if the user is empty', () => {
        expect(() =>
            SmtpConfig.create(
                validData.host,
                validData.port,
                '', // Empty user
                validData.pass,
            )
        ).toThrow(NonEmptyStringError);
    });

    it('should throw an error if the password is empty', () => {
        expect(() =>
            SmtpConfig.create(
                validData.host,
                validData.port,
                validData.user,
                '' // Empty password
            )
        ).toThrow(NonEmptyStringError);
    });
});