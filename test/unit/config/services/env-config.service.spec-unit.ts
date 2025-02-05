import { Logger } from '@nestjs/common';
import { InvalidPortError } from 'src/config/errors/invalid-port.error';
import { InvalidApiKeyError } from 'src/config/errors/invalid-api-key.error';
import { InvalidEnvironmentError } from 'src/config/errors/invalid-environment.error';
import { EnvConfigService } from 'src/config/services/env-config.service';
import { AppConfig } from 'src/config/entities/app-config.entity';
import { RedisConfig } from 'src/config/entities/redis-config.entity';
import { InvalidUrlError } from 'src/common/errors/invalid-url.error';
import { NonEmptyStringError } from 'src/common/errors/non-empty-string.error';
import { InvalidRedisDBError } from 'src/config/errors/invalid-redis-db.error';

describe('EnvConfigService', () => {
    let envBackup: NodeJS.ProcessEnv;

    beforeEach(() => {
        // Backup the original environment variables
        envBackup = { ...process.env };

        // Provide default valid environment variables for each test
        process.env = {
            PORT: '3000',
            API_KEY: 'a'.repeat(64), // Minimum valid API key length
            ENVIRONMENT: 'production',
            DEFAULT_LANG: 'en-us',
            SMTP_HOST: 'smtp.example.com',
            SMTP_PORT: '587',
            SMTP_USER: 'smtp-user',
            SMTP_PASS: 'smtp-pass',
            COMPANY_NAME: 'Example Company',
            COMPANY_ICON_URL: 'https://example.com/icon.png',
            COMPANY_WEBSITE_URL: 'https://example.com',
            COMPANY_ADDRESS: '123 Example Street',
            REDIS_URL: 'redis://localhost:6379/0',
            REDIS_PORT: '6379',
            REDIS_HOST: 'localhost',
            REDIS_DB: '0'
        };
    });

    afterEach(() => {
        // Restore the original environment variables
        process.env = envBackup;
    });

    it('should create an AppConfig instance with valid environment variables', () => {
        const envConfigService = new EnvConfigService();
        const appConfig = envConfigService.getAppConfig();

        expect(appConfig).toBeInstanceOf(AppConfig);
        expect(appConfig.port.getValue()).toBe(3000);
        expect(appConfig.apiKey.getValue()).toBe('a'.repeat(64));
        expect(appConfig.environment.getValue()).toBe('production');
        expect(appConfig.defaultLang.getValue()).toBe('en-us');
        expect(appConfig.smptHost.getValue()).toBe('smtp.example.com');
    });

    it('should throw an error if PORT is invalid', () => {
        process.env.PORT = '0'; // Invalid port
        const envConfigService = new EnvConfigService();

        expect(() => envConfigService.getAppConfig()).toThrow(InvalidPortError);
    });

    it('should throw an error if API_KEY is missing', () => {
        delete process.env.API_KEY; // Missing API key
        const envConfigService = new EnvConfigService();

        expect(() => envConfigService.getAppConfig()).toThrow(InvalidApiKeyError);
    });

    it('should throw an error if ENVIRONMENT is invalid', () => {
        process.env.ENVIRONMENT = 'invalid-env'; // Invalid environment
        const envConfigService = new EnvConfigService();

        expect(() => envConfigService.getAppConfig()).toThrow(
            InvalidEnvironmentError
        );
    });

    it('should log an error and rethrow if AppConfig creation fails', () => {
        const loggerSpy = jest.spyOn(Logger, 'error').mockImplementation(() => { });
        process.env.PORT = 'invalid'; // Invalid port (non-numeric)

        const envConfigService = new EnvConfigService();

        expect(() => envConfigService.getAppConfig()).toThrow();
        expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('Error creating AppConfig:'));
        loggerSpy.mockRestore();
    });

    it('should create a RedisConfig instance with valid environment variables', () => {
        const envConfigService = new EnvConfigService();
        const redisConfig = envConfigService.getRedisConfig();

        expect(redisConfig).toBeInstanceOf(RedisConfig);
        expect(redisConfig.url.getValue()).toBe('redis://localhost:6379/0');
        expect(redisConfig.port.getValue()).toBe(6379);
        expect(redisConfig.host.getValue()).toBe('localhost');
        expect(redisConfig.db.getValue()).toBe(0);
    });

    it('should throw an error if REDIS_URL is invalid', () => {
        process.env.REDIS_URL = 'invalid-url'; // Invalid URL
        const envConfigService = new EnvConfigService();
        expect(() => envConfigService.getRedisConfig()).toThrow(InvalidUrlError);
    });

    it('should throw an error if REDIS_PORT is invalid', () => {
        process.env.REDIS_PORT = '-1'; // Invalid port
        const envConfigService = new EnvConfigService();
        expect(() => envConfigService.getRedisConfig()).toThrow(InvalidPortError);
    });

    it('should throw an error if REDIS_HOST is invalid', () => {
        delete process.env.REDIS_HOST; // Invalid host
        const envConfigService = new EnvConfigService();
        expect(() => envConfigService.getRedisConfig()).toThrow(NonEmptyStringError);
    });

    it('should throw an error if REDIS_DB is invalid', () => {
        process.env.REDIS_DB = '16'; // Invalid DB index
        const envConfigService = new EnvConfigService();
        expect(() => envConfigService.getRedisConfig()).toThrow(InvalidRedisDBError);
    });

    it('should log an error and rethrow if RedisConfig creation fails', () => {
        const loggerSpy = jest.spyOn(Logger, 'error').mockImplementation(() => { });
        process.env.REDIS_URL = 'invalid-url'; // Invalid URL

        const envConfigService = new EnvConfigService();

        expect(() => envConfigService.getRedisConfig()).toThrow();
        expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('Error creating RedisConfig:'));
        loggerSpy.mockRestore();
    });
});
