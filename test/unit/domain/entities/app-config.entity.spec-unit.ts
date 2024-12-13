import { AppConfig } from '../../../../src/domain/entities/app-config.entity';
import { PortVO } from '../../../../src/domain/value-objects/port.vo';
import { ApiKeyVO } from '../../../../src/domain/value-objects/api-key.vo';
import { EnvironmentEnum } from '../../../../src/domain/enums/environment.enum';
import { LanguageEnum } from '../../../../src/domain/enums/language.enum';
import { InvalidPortError } from 'src/domain/errors/invalid-port.error';
import { InvalidApiKeyError } from 'src/domain/errors/invalid-api-key.error';
import { InvalidEnvironmentError } from 'src/domain/errors/invalid-environment.error';
import { InvalidLanguageError } from 'src/domain/errors/invalid-language.error';
import { NonEmptyStringError } from 'src/domain/errors/non-empty-string.error';
import { InvalidUrlError } from 'src/domain/errors/invalid-url.error';

describe('AppConfig', () => {
    const validData = {
        port: 3000,
        apiKey: 'a'.repeat(64), // Minimum valid API key length
        environment: EnvironmentEnum.PRODUCTION,
        defaultLang: LanguageEnum.EN_US,
        smptHost: 'smtp.example.com',
        smptPort: 587,
        smptUser: 'smtp-user',
        smptPass: 'smtp-pass',
        companyName: 'Example Company',
        companyIconUrl: 'https://example.com/icon.png',
        companyWebsiteUrl: 'https://example.com',
        companyAddress: '123 Example Street',
    };

    it('should create an AppConfig instance with valid data', () => {
        const appConfig = AppConfig.create(
            validData.port,
            validData.apiKey,
            validData.environment,
            validData.defaultLang,
            validData.smptHost,
            validData.smptPort,
            validData.smptUser,
            validData.smptPass,
            validData.companyName,
            validData.companyIconUrl,
            validData.companyWebsiteUrl,
            validData.companyAddress,
        );

        expect(appConfig).toBeInstanceOf(AppConfig);
        expect(appConfig.port).toBeInstanceOf(PortVO);
        expect(appConfig.apiKey).toBeInstanceOf(ApiKeyVO);
        expect(appConfig.environment.getValue()).toBe(EnvironmentEnum.PRODUCTION);
        expect(appConfig.defaultLang.getValue()).toBe(LanguageEnum.EN_US);
        expect(appConfig.companyWebsiteUrl.getValue()).toBe(validData.companyWebsiteUrl);
    });

    it('should throw an error if any required value is invalid (invalid port)', () => {
        expect(() =>
            AppConfig.create(
                0, // Invalid port
                validData.apiKey,
                validData.environment,
                validData.defaultLang,
                validData.smptHost,
                validData.smptPort,
                validData.smptUser,
                validData.smptPass,
                validData.companyName,
                validData.companyIconUrl,
                validData.companyWebsiteUrl,
                validData.companyAddress,
            )
        ).toThrow(InvalidPortError);
    });

    it('should throw an error if the API key is invalid (too short)', () => {
        expect(() =>
            AppConfig.create(
                validData.port,
                'short-api-key', // Invalid API key
                validData.environment,
                validData.defaultLang,
                validData.smptHost,
                validData.smptPort,
                validData.smptUser,
                validData.smptPass,
                validData.companyName,
                validData.companyIconUrl,
                validData.companyWebsiteUrl,
                validData.companyAddress,
            )
        ).toThrow(InvalidApiKeyError);
    });

    it('should throw an error if the environment is invalid', () => {
        expect(() =>
            AppConfig.create(
                validData.port,
                validData.apiKey,
                'invalid-environment', // Invalid environment
                validData.defaultLang,
                validData.smptHost,
                validData.smptPort,
                validData.smptUser,
                validData.smptPass,
                validData.companyName,
                validData.companyIconUrl,
                validData.companyWebsiteUrl,
                validData.companyAddress,
            )
        ).toThrow(InvalidEnvironmentError);
    });

    it('should throw an error if the default language is invalid', () => {
        expect(() =>
            AppConfig.create(
                validData.port,
                validData.apiKey,
                validData.environment,
                'invalid-language', // Invalid language
                validData.smptHost,
                validData.smptPort,
                validData.smptUser,
                validData.smptPass,
                validData.companyName,
                validData.companyIconUrl,
                validData.companyWebsiteUrl,
                validData.companyAddress,
            )
        ).toThrow(InvalidLanguageError);
    });

    it('should throw an error if the SMTP host is empty', () => {
        expect(() =>
            AppConfig.create(
                validData.port,
                validData.apiKey,
                validData.environment,
                validData.defaultLang,
                '', // Empty SMTP host
                validData.smptPort,
                validData.smptUser,
                validData.smptPass,
                validData.companyName,
                validData.companyIconUrl,
                validData.companyWebsiteUrl,
                validData.companyAddress,
            )
        ).toThrow(NonEmptyStringError);
    });

    it('should throw an error if the company website URL is invalid', () => {
        expect(() =>
            AppConfig.create(
                validData.port,
                validData.apiKey,
                validData.environment,
                validData.defaultLang,
                validData.smptHost,
                validData.smptPort,
                validData.smptUser,
                validData.smptPass,
                validData.companyName,
                validData.companyIconUrl,
                'invalid-url', // Invalid URL
                validData.companyAddress,
            )
        ).toThrow(InvalidUrlError);
    });
});