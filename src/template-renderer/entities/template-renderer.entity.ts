import { LanguageEnum } from "src/config/enums/language.enum";
import { NotificationNameEnum } from "src/notification/enums/notification-name.enum";
import { LanguageVO } from "src/config/value-objects/language.vo";
import { NotificationNameVO } from "src/notification/value-objects/notification-name.vo";
import { TemplateBase } from "./template-base.entity";

export class TemplateRenderer {

    private constructor(
        public readonly name: NotificationNameVO,
        public readonly language: LanguageVO,
        public readonly params: Record<string, string>
    ) {
    }

    static create<T extends TemplateBase>(
        name: string | NotificationNameEnum,
        language: string | LanguageEnum,
        params: T
    ): TemplateRenderer {
        return new TemplateRenderer(
            NotificationNameVO.create(name),
            LanguageVO.create(language),
            params.toObject()
        );
    }
}