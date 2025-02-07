import { ValueRequiredError } from "src/common/errors/value-required.error";
import { LanguageEnum } from "src/config/enums/language.enum";
import { InvalidLanguageError } from "src/config/errors/invalid-language.error";
import { TemplateRenderer } from "src/template-renderer/entities/template-renderer.entity";
import { NotificationNameEnum } from "src/template-renderer/enums/notification-name.enum";
import { InvalidNotificationNameError } from "src/template-renderer/errors/invalid-notification-name.error";

describe('TemplateRenderer', () => {
    it('should create a TemplateRenderer with valid string name and language', () => {
        const params = {
            'username': 'JohnDoe',
            'code': '123456',
        };

        const renderer = TemplateRenderer.create(
            'welcome',      // valid string in NotificationNameEnum
            'en-us',        // valid string in LanguageEnum
            params
        );

        expect(renderer).toBeInstanceOf(TemplateRenderer);
        expect(renderer.name.getValue()).toBe(NotificationNameEnum.WELCOME);
        expect(renderer.language.getValue()).toBe(LanguageEnum.EN_US);
        expect(renderer.params).toEqual(params);
    });

    it('should create a TemplateRenderer with enum values for name and language', () => {
        const params = {
            'someValue': 'someKey'
        };

        const renderer = TemplateRenderer.create(
            NotificationNameEnum.RECOVER_PASSWORD_SUCCESS, // direct enum
            LanguageEnum.ES_LA,                        // direct enum
            params
        );

        expect(renderer).toBeInstanceOf(TemplateRenderer);
        expect(renderer.name.getValue()).toBe(NotificationNameEnum.RECOVER_PASSWORD_SUCCESS);
        expect(renderer.language.getValue()).toBe(LanguageEnum.ES_LA);
    });

    it('should throw ValueRequiredError if name is missing', () => {
        const params = {};
        expect(() =>
            TemplateRenderer.create(undefined as any, LanguageEnum.EN_US, params)
        ).toThrow(ValueRequiredError);
    });

    it('should throw ValueRequiredError if language is missing', () => {
        const params = {};
        expect(() =>
            TemplateRenderer.create(NotificationNameEnum.WELCOME, undefined as any, params)
        ).toThrow(ValueRequiredError);
    });

    it('should throw InvalidTemplateNameError if name is invalid', () => {
        const params = {};
        expect(() =>
            TemplateRenderer.create('INVALID_NAME', LanguageEnum.EN_US, params)
        ).toThrow(InvalidNotificationNameError);
    });

    it('should throw an error if language is invalid', () => {
        const params = {};
        expect(() =>
            TemplateRenderer.create(NotificationNameEnum.WELCOME, 'invalid-lang', params)
        ).toThrow(InvalidLanguageError);
    });

    it('should accept an empty params map', () => {
        const emptyParams = {};
        const renderer = TemplateRenderer.create(
            NotificationNameEnum.WELCOME,
            LanguageEnum.EN_US,
            emptyParams
        );
        expect(Object.keys(renderer.params).length).toBe(0);
    });
});
