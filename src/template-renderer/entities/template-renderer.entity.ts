import { LanguageEnum } from "src/config/enums/language.enum";
import { NotificationNameEnum } from "src/template-renderer/enums/notification-name.enum";
import { LanguageVO } from "src/config/value-objects/language.vo";
import { TemplateNameVO } from "src/template-renderer/value-objects/template-name.vo";

export class TemplateRenderer {

    private constructor(
        public readonly name: TemplateNameVO,
        public readonly language: LanguageVO,
        public readonly params: Record<string, string>) {
    }

    static create(
        name: string | NotificationNameEnum,
        language: string | LanguageEnum,
        params: Record<string, string>
    ): TemplateRenderer {
        return new TemplateRenderer(
            TemplateNameVO.create(name),
            LanguageVO.create(language),
            params
        );
    }
}