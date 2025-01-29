import { TemplateNameVO } from "src/template-renderer/value-objects/template-name.vo";
import { EmailAddress } from "./email-address.entity";
import { LanguageVO } from "src/config/value-objects/language.vo";
import { TemplateNameEnum } from "src/template-renderer/enums/template-name.enum";
import { LanguageEnum } from "src/config/enums/language.enum";

export class EmailSender {
    private constructor(
        public readonly from: EmailAddress,
        public readonly to: EmailAddress[],
        public readonly lang: LanguageVO,
        public readonly templateName: TemplateNameVO,
        public readonly map: Map<string, string>,
        public readonly cc?: EmailAddress[],
        public readonly bcc?: EmailAddress[],
    ) { }

    static create(
        fromEmail: string,
        fromName: string,
        toEmail: string[],
        toNames: string[],
        lang: string | LanguageEnum,
        templateName: string | TemplateNameEnum,
        params: Map<string, string>,
        ccEmail?: string[],
        ccName?: string[],
        bccEmail?: string[],
        bccName?: string[],
    ): EmailSender {
        const from = EmailAddress.create(fromEmail, fromName);
        const to = toEmail.map((email, index) => EmailAddress.create(email, toNames[index]));
        const langVO = LanguageVO.create(lang);
        const templateNameVO = TemplateNameVO.create(templateName);
        const cc = ccEmail ? ccEmail.map((email, index) => EmailAddress.create(email, ccName ? ccName[index] : '')) : undefined;
        const bcc = bccEmail ? bccEmail.map((email, index) => EmailAddress.create(email, bccName ? bccName[index] : '')) : undefined;
        return new EmailSender(from, to, langVO, templateNameVO, params, cc, bcc);
    }
}