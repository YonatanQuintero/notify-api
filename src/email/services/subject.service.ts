import { Injectable } from "@nestjs/common";
import { I18nService } from 'nestjs-i18n';
import { LanguageEnum } from "src/config/enums/language.enum";
import { NotificationNameEnum } from "src/notification/enums/notification-name.enum";

@Injectable()
export class SubjectService {
    constructor(
        private readonly i18n: I18nService,
    ) { }

    getSubject(name: NotificationNameEnum, lang: LanguageEnum): string {
        return this.i18n.t(`subject.${name}`, { lang });
    }
}