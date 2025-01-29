import { LanguageEnum } from "src/config/enums/language.enum";
import { TemplateNameEnum } from "src/template-renderer/enums/template-name.enum";
import { LanguageVO } from "src/config/value-objects/language.vo";
import { TemplateNameVO } from "src/template-renderer/value-objects/template-name.vo";

export class TemplateRenderer {

    private constructor(
        public readonly name: TemplateNameVO,
        public readonly language: LanguageVO,
        public readonly params: Map<string, string>) {
    }

    static create(
        name: string | TemplateNameEnum,
        language: string | LanguageEnum,
        params: Map<string, string>
    ): TemplateRenderer {
        return new TemplateRenderer(
            TemplateNameVO.create(name),
            LanguageVO.create(language),
            params
        );
    }
}