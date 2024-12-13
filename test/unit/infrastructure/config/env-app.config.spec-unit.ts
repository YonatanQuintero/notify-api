import { EnvAppConfig } from '../../../../src/infrastructure/config/env-app.config';
import { AppConfig } from '../../../../src/domain/entities/app-config.entity';
import { Logger } from '@nestjs/common';
import { EnvironmentEnum } from 'src/domain/enums/environment.enum';
import { InvalidPortError } from 'src/domain/errors/invalid-port.error';
import { InvalidApiKeyError } from 'src/domain/errors/invalid-api-key.error';
import { InvalidEnvironmentError } from 'src/domain/errors/invalid-environment.error';

describe('EnvAppConfig', () => {
    let envBackup: NodeJS.ProcessEnv;

    beforeEach(() => {
        // Backup the original environment variables
        envBackup = { ...process.env };

        // Provide default valid environment variables for each test
        process.env = {
            PORT: '3000',
            API_KEY: 'a'.repeat(64), // Minimum valid API key length
            ENVIRONMENT: 'production',
            DEFAULT_LANG: 'en-US',
            SMTP_HOST: 'smtp.example.com',
            SMTP_PORT: '587',
            SMTP_USER: 'smtp-user',
            SMTP_PASS: 'smtp-pass',
            COMPANY_NAME: 'Example Company',
            COMPANY_ICON_URL: 'https://example.com/icon.png',
            COMPANY_WEBSITE_URL: 'https://example.com',
            COMPANY_ADDRESS: '123 Example Street',
        };
    });

    afterEach(() => {
        // Restore the original environment variables
        process.env = envBackup;
    });

    it('should create an AppConfig instance with valid environment variables', () => {
        const envAppConfig = new EnvAppConfig();
        const appConfig = envAppConfig.getAppConfig();

        expect(appConfig).toBeInstanceOf(AppConfig);
        expect(appConfig.port.getValue()).toBe(3000);
        expect(appConfig.apiKey.getValue()).toBe('a'.repeat(64));
        expect(appConfig.environment.getValue()).toBe('production');
        expect(appConfig.defaultLang.getValue()).toBe('en-US');
        expect(appConfig.smptHost.getValue()).toBe('smtp.example.com');
    });

    it('should throw an error if PORT is invalid', () => {
        process.env.PORT = '0'; // Invalid port
        const envAppConfig = new EnvAppConfig();

        expect(() => envAppConfig.getAppConfig()).toThrow(InvalidPortError);
    });

    it('should throw an error if API_KEY is missing', () => {
        delete process.env.API_KEY; // Missing API key
        const envAppConfig = new EnvAppConfig();

        expect(() => envAppConfig.getAppConfig()).toThrow(InvalidApiKeyError);
    });

    it('should throw an error if ENVIRONMENT is invalid', () => {
        process.env.ENVIRONMENT = 'invalid-env'; // Invalid environment
        const envAppConfig = new EnvAppConfig();

        expect(() => envAppConfig.getAppConfig()).toThrow(
            InvalidEnvironmentError
        );
    });

    it('should log an error and rethrow if AppConfig creation fails', () => {
        const loggerSpy = jest.spyOn(Logger, 'error').mockImplementation(() => { });
        process.env.PORT = 'invalid'; // Invalid port (non-numeric)

        const envAppConfig = new EnvAppConfig();

        expect(() => envAppConfig.getAppConfig()).toThrow();
        expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('Error creating AppConfig:'));
        loggerSpy.mockRestore();
    });
});
