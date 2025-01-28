import { LanguageVO } from "src/common/value-objects/language.vo";
import { NotificationTypeVO } from "src/common/value-objects/notification-type.vo";

export class TemplateRenderer {

    private constructor(
        public readonly type: NotificationTypeVO,
        public readonly language: LanguageVO,
        public readonly params: Map<string, string>) {
    }

    static create(type: string, language: string, params: Map<string, string>): TemplateRenderer {
        return new TemplateRenderer(
            NotificationTypeVO.create(type),
            LanguageVO.create(language),
            params
        );
    }
}