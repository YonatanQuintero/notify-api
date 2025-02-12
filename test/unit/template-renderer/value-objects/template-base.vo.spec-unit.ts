import { NonEmptyStringVO } from "src/common/value-objects/non-empty-string.vo";
import { UrlVO } from "src/common/value-objects/url.vo";
import { TemplateBase } from "src/template-renderer/entities/template-base.entity";
import { InvalidTemplateBaseError } from "src/template-renderer/errors/invalid-template-base.error";
import { TemplateBaseVO } from "src/template-renderer/value-objects/template-base.vo";

// we create a dummy subclass for testing purposes.
class DummyTemplateBase extends TemplateBase {
    // If TemplateBase requires constructor arguments, supply minimal dummy values.
    constructor() {
        super(
            NonEmptyStringVO.create('username'),
            NonEmptyStringVO.create('companyName'),
            UrlVO.create('https://company.com'),
            UrlVO.create('https://company.com/icon.png')
        );
    }
}

describe('TemplateBaseVO', () => {
    it('should create a TemplateBaseVO instance when provided a valid TemplateBase instance', () => {
        const validTemplate = new DummyTemplateBase();
        const vo = TemplateBaseVO.create(validTemplate);
        expect(vo.getValue()).toBe(validTemplate);
    });

    it('should throw InvalidTemplateBaseError when provided an invalid template', () => {
        expect(() => TemplateBaseVO.create({})).toThrow(InvalidTemplateBaseError);
    });
});
