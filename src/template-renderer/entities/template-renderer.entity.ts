import { LanguageVO } from "src/config/value-objects/language.vo";
import { NotificationNameVO } from "src/notification/value-objects/notification-name.vo";
import { TemplateBase } from "./template-base.entity";
import { TemplateBaseVO } from "../value-objects/template-base.vo";

export class TemplateRenderer {

    private constructor(
        public readonly name: NotificationNameVO,
        public readonly language: LanguageVO,
        public readonly params: Record<string, string>
    ) {
    }

    static create<T extends TemplateBase>(
        name: string,
        language: string,
        params: T
    ): TemplateRenderer {
        return new TemplateRenderer(
            NotificationNameVO.create(name),
            LanguageVO.create(language),
            TemplateBaseVO.create(params).getValue().toObject()
        );
    }
}