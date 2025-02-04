import { ValueRequiredError } from "src/common/errors/value-required.error";
import { LanguageEnum } from "src/config/enums/language.enum";
import { InvalidLanguageError } from "src/config/errors/invalid-language.error";
import { TemplateRenderer } from "src/template-renderer/entities/template-renderer.entity";
import { TemplateNameEnum } from "src/template-renderer/enums/template-name.enum";
import { InvalidTemplateNameError } from "src/template-renderer/errors/invalid-template-name.error";

describe('TemplateRenderer', () => {
    it('should create a TemplateRenderer with valid string name and language', () => {
        const params = new Map<string, string>([
            ['username', 'JohnDoe'],
            ['code', '123456'],
        ]);

        const renderer = TemplateRenderer.create(
            'welcome',      // valid string in TemplateNameEnum
            'en-us',        // valid string in LanguageEnum
            params
        );

        expect(renderer).toBeInstanceOf(TemplateRenderer);
        expect(renderer.name.getValue()).toBe(TemplateNameEnum.WELCOME);
        expect(renderer.language.getValue()).toBe(LanguageEnum.EN_US);
        expect(renderer.params).toEqual(params);
    });

    it('should create a TemplateRenderer with enum values for name and language', () => {
        const params = new Map<string, string>([
            ['someKey', 'someValue'],
        ]);

        const renderer = TemplateRenderer.create(
            TemplateNameEnum.RECOVER_PASSWORD_SUCCESS, // direct enum
            LanguageEnum.ES_LA,                        // direct enum
            params
        );

        expect(renderer).toBeInstanceOf(TemplateRenderer);
        expect(renderer.name.getValue()).toBe(TemplateNameEnum.RECOVER_PASSWORD_SUCCESS);
        expect(renderer.language.getValue()).toBe(LanguageEnum.ES_LA);
    });

    it('should throw ValueRequiredError if name is missing', () => {
        const params = new Map<string, string>([]);
        expect(() =>
            TemplateRenderer.create(undefined as any, LanguageEnum.EN_US, params)
        ).toThrow(ValueRequiredError);
    });

    it('should throw ValueRequiredError if language is missing', () => {
        const params = new Map<string, string>([]);
        expect(() =>
            TemplateRenderer.create(TemplateNameEnum.WELCOME, undefined as any, params)
        ).toThrow(ValueRequiredError);
    });

    it('should throw InvalidTemplateNameError if name is invalid', () => {
        const params = new Map<string, string>([]);
        expect(() =>
            TemplateRenderer.create('INVALID_NAME', LanguageEnum.EN_US, params)
        ).toThrow(InvalidTemplateNameError);
    });

    it('should throw an error if language is invalid', () => {
        const params = new Map<string, string>([]);
        expect(() =>
            TemplateRenderer.create(TemplateNameEnum.WELCOME, 'invalid-lang', params)
        ).toThrow(InvalidLanguageError);
    });

    it('should accept an empty params map', () => {
        const emptyParams = new Map<string, string>();
        const renderer = TemplateRenderer.create(
            TemplateNameEnum.WELCOME,
            LanguageEnum.EN_US,
            emptyParams
        );
        expect(renderer.params.size).toBe(0);
    });
});
