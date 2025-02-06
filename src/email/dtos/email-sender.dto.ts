import { LanguageEnum } from "src/config/enums/language.enum";
import { TemplateNameEnum } from "src/template-renderer/enums/template-name.enum";

export class EmailSenderDto {

    constructor(
        readonly fromEmail: string,
        readonly fromName: string,
        readonly toEmail: string[],
        readonly lang: string | LanguageEnum,
        readonly templateName: string | TemplateNameEnum,
        readonly params: Record<string, string>,
        readonly ccEmail?: string[],
        readonly bccEmail?: string[],
    ) { }
}