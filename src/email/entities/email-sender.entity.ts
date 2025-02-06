import { TemplateNameVO } from "src/template-renderer/value-objects/template-name.vo";
import { LanguageVO } from "src/config/value-objects/language.vo";
import { TemplateNameEnum } from "src/template-renderer/enums/template-name.enum";
import { LanguageEnum } from "src/config/enums/language.enum";
import { EmailIssuer } from "./email-issuer.entity";
import { EmailRecipientList } from "./email-recipient-list.entity";
import { EmailVO } from "../value-objects/email.vo";
import { EmailSenderDto } from "../dtos/email-sender.dto";

export class EmailSender {
    private constructor(
        public readonly from: EmailIssuer,
        public readonly to: EmailRecipientList,
        public readonly lang: LanguageVO,
        public readonly templateName: TemplateNameVO,
        public readonly params: Record<string, string>,
        public readonly cc?: EmailVO[],
        public readonly bcc?: EmailVO[]
    ) {
    }

    static create(
        emailSenderDto: EmailSenderDto
    ): EmailSender {
        const {
            fromEmail, fromName, toEmail, lang, templateName, params, ccEmail, bccEmail
        } = emailSenderDto;
        const from = EmailIssuer.create(fromEmail, fromName);
        const to = EmailRecipientList.create(toEmail);
        const langVO = LanguageVO.create(lang);
        const templateNameVO = TemplateNameVO.create(templateName);
        const cc = ccEmail ? ccEmail.map((cc) => EmailVO.create(cc)) : undefined;
        const bcc = bccEmail ? bccEmail.map((bcc) => EmailVO.create(bcc)) : undefined;
        return new EmailSender(from, to, langVO, templateNameVO, params, cc, bcc);
    }
}