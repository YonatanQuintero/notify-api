import { ValueRequiredError } from "src/common/errors/value-required.error";
import { TemplateNameEnum } from "src/template-renderer/enums/template-name.enum";
import { InvalidTemplateNameError } from "src/template-renderer/errors/invalid-template-name.error";
import { TemplateNameVO } from "src/template-renderer/value-objects/template-name.vo";

describe('TemplateNameVO', () => {
    it('should create a TemplateNameVO from a valid string', () => {
        const vo = TemplateNameVO.create('welcome');
        expect(vo).toBeInstanceOf(TemplateNameVO);
        expect(vo.getValue()).toBe(TemplateNameEnum.WELCOME);
    });

    it('should create a TemplateNameVO from a valid enum value', () => {
        const vo = TemplateNameVO.create(TemplateNameEnum.RECOVER_PASSWORD_SUCCESS);
        expect(vo).toBeInstanceOf(TemplateNameVO);
        expect(vo.getValue()).toBe(TemplateNameEnum.RECOVER_PASSWORD_SUCCESS);
    });

    it('should trim the string before validation', () => {
        const vo = TemplateNameVO.create('   welcome   ');
        expect(vo.getValue()).toBe(TemplateNameEnum.WELCOME);
    });

    it('should throw a ValueRequiredError if the template name is undefined', () => {
        expect(() => TemplateNameVO.create(undefined)).toThrow(ValueRequiredError);
    });

    it('should throw an InvalidNotificationTypeError if the string is not in the enum', () => {
        expect(() => TemplateNameVO.create('INVALID_NAME')).toThrow(InvalidTemplateNameError);
    });

    it('should consider two TemplateNameVOs equal if they have the same enum value', () => {
        const vo1 = TemplateNameVO.create(TemplateNameEnum.WELCOME);
        const vo2 = TemplateNameVO.create(TemplateNameEnum.WELCOME);
        expect(vo1.equals(vo2)).toBe(true);
    });

    it('should consider two TemplateNameVOs not equal if they have different enum values', () => {
        const vo1 = TemplateNameVO.create(TemplateNameEnum.WELCOME);
        const vo2 = TemplateNameVO.create(TemplateNameEnum.RECOVER_PASSWORD_SUCCESS);
        expect(vo1.equals(vo2)).toBe(false);
    });
});
