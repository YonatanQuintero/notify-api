import { ValueRequiredError } from "src/common/errors/value-required.error";
import { LanguageEnum } from "src/config/enums/language.enum";
import { InvalidLanguageError } from "src/config/errors/invalid-language.error";
import { TemplateRenderer } from "src/template-renderer/entities/template-renderer.entity";
import { NotificationNameEnum } from "src/notification/enums/notification-name.enum";
import { InvalidNotificationNameError } from "src/notification/errors/invalid-notification-name.error";
import { TemplateEntityFactory } from "src/template-renderer/factories/template-entity.factory";
import { TemplateBase } from "src/template-renderer/entities/template-base.entity";
import { InvalidTemplateBaseError } from "src/template-renderer/errors/invalid-template-base.error";

describe('TemplateRenderer', () => {

    let params: TemplateBase;

    beforeEach(() => {
        params = TemplateEntityFactory.createBase(
            'JohnDoe',
            'Company Inc.',
            'https://example.com',
            'https://example.com/logo.png'
        )
    });

    it('should create a TemplateRenderer with valid string name and language', () => {


        const renderer = TemplateRenderer.create(
            'welcome',      // valid string in NotificationNameEnum
            'en-us',        // valid string in LanguageEnum
            params
        );

        expect(renderer).toBeInstanceOf(TemplateRenderer);
        expect(renderer.name.getValue()).toBe(NotificationNameEnum.WELCOME);
        expect(renderer.language.getValue()).toBe(LanguageEnum.EN_US);
        expect(renderer.params).toEqual(params.toObject());
    });

    it('should create a TemplateRenderer with enum values for name and language', () => {

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
        expect(() =>
            TemplateRenderer.create(undefined as any, LanguageEnum.EN_US, params)
        ).toThrow(ValueRequiredError);
    });

    it('should throw ValueRequiredError if language is missing', () => {
        expect(() =>
            TemplateRenderer.create(NotificationNameEnum.WELCOME, undefined as any, params)
        ).toThrow(ValueRequiredError);
    });

    it('should throw InvalidTemplateNameError if name is invalid', () => {
        expect(() =>
            TemplateRenderer.create('INVALID_NAME', LanguageEnum.EN_US, params)
        ).toThrow(InvalidNotificationNameError);
    });

    it('should throw an error if language is invalid', () => {
        expect(() =>
            TemplateRenderer.create(NotificationNameEnum.WELCOME, 'invalid-lang', params)
        ).toThrow(InvalidLanguageError);
    });

    it('should throw InvalidTemplateBase if params are undefined', () => {
        expect(() =>
            TemplateRenderer.create(NotificationNameEnum.WELCOME, LanguageEnum.EN_US, undefined as any)
        ).toThrow(InvalidTemplateBaseError);
    });
});
