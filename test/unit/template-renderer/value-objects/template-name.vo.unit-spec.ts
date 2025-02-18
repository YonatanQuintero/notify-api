import { ValueRequiredError } from "src/app/errors/value-required.error";
import { TemplateNameEnum } from "src/template-renderer/enum/template-name.enum";
import { InvalidTemplateNameError } from "src/template-renderer/errors/invalid-template-name.error";
import { TemplateNameVO } from "src/template-renderer/value-objects/template-name.vo";

describe('TemplateNameVO', () => {
    describe('create()', () => {
        it('should throw ValueRequiredError when no name is provided', () => {
            expect(() => TemplateNameVO.create(undefined)).toThrow(ValueRequiredError);
            expect(() => TemplateNameVO.create(null)).toThrow(ValueRequiredError);
        });

        it('should throw InvalidTemplateNameError when an invalid string is provided', () => {
            const invalidName = 'invalid_template';
            expect(() => TemplateNameVO.create(invalidName)).toThrow(InvalidTemplateNameError);
        });

        it('should create a TemplateNameVO instance when a valid enum string is provided (ignoring case and trimming)', () => {

            const validValue = TemplateNameEnum.WELCOME;
            const input = `   ${validValue.toUpperCase()}   `;
            const instance = TemplateNameVO.create(input);
            expect(instance).toBeInstanceOf(TemplateNameVO);
            expect(instance.getValue()).toBe(validValue);
        });

        it('should create a TemplateNameVO instance when a valid TemplateNameEnum value is provided', () => {
            const validValue = TemplateNameEnum.WELCOME;
            const instance = TemplateNameVO.create(validValue);
            expect(instance).toBeInstanceOf(TemplateNameVO);
            expect(instance.getValue()).toBe(validValue);
        });
    });
});
