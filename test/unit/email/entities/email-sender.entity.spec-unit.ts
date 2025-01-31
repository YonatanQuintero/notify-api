import { InvalidLanguageError } from "src/config/errors/invalid-language.error";
import { LanguageVO } from "src/config/value-objects/language.vo";
import { EmailIssuer } from "src/email/entities/email-issuer.entity";
import { EmailRecipientList } from "src/email/entities/email-recipient-list.entity";
import { EmailSender } from "src/email/entities/email-sender.entity";
import { InvalidEmailError } from "src/email/errors/invalid-email.error";
import { InvalidTemplateNameError } from "src/template-renderer/errors/invalid-template-name.error";
import { TemplateNameVO } from "src/template-renderer/value-objects/template-name.vo";

describe('EmailSender', () => {
    const validFromEmail = 'from@example.com';
    const validFromName = 'From Name';
    const validToEmails = ['to1@example.com', 'to2@example.com'];
    const validLang = 'en-us';
    const validTemplateName = 'welcome';
    const validParams = new Map<string, string>([['key', 'value']]);
    const validCcEmails = ['cc@example.com'];
    const validBccEmails = ['bcc@example.com'];

    it('should create an EmailSender instance with all properties provided', () => {
        const sender = EmailSender.create(
            validFromEmail,
            validFromName,
            validToEmails,
            validLang,
            validTemplateName,
            validParams,
            validCcEmails,
            validBccEmails
        );

        expect(sender).toBeInstanceOf(EmailSender);
        expect(sender.from).toBeInstanceOf(EmailIssuer);
        expect(sender.to).toBeInstanceOf(EmailRecipientList);
        expect(sender.lang).toBeInstanceOf(LanguageVO);
        expect(sender.templateName).toBeInstanceOf(TemplateNameVO);
        expect(sender.params).toBeInstanceOf(Map);
        expect(sender.cc).toBeDefined();
        expect(sender.cc?.length).toBe(validCcEmails.length);
        expect(sender.bcc).toBeDefined();
        expect(sender.bcc?.length).toBe(validBccEmails.length);
    });

    it('should create an EmailSender instance without optional cc and bcc emails', () => {
        const sender = EmailSender.create(
            validFromEmail,
            validFromName,
            validToEmails,
            validLang,
            validTemplateName,
            validParams
        );

        expect(sender).toBeInstanceOf(EmailSender);
        expect(sender.cc).toBeUndefined();
        expect(sender.bcc).toBeUndefined();
    });

    it('should throw an error if fromEmail is invalid', () => {
        const invalidFromEmail = 'invalid-email';
        expect(() => {
            EmailSender.create(
                invalidFromEmail,
                validFromName,
                validToEmails,
                validLang,
                validTemplateName,
                validParams,
                validCcEmails,
                validBccEmails
            );
        }).toThrow(InvalidEmailError);
    });

    it('should throw an error if any email in the to list is invalid', () => {
        const invalidToEmails = ['to1@example.com', 'invalid-email'];
        expect(() => {
            EmailSender.create(
                validFromEmail,
                validFromName,
                invalidToEmails,
                validLang,
                validTemplateName,
                validParams
            );
        }).toThrow(InvalidEmailError);
    });

    it('should throw an error if language is invalid', () => {
        const invalidLang = 'xyz-abc';
        expect(() => {
            EmailSender.create(
                validFromEmail,
                validFromName,
                validToEmails,
                invalidLang,
                validTemplateName,
                validParams
            );
        }).toThrow(InvalidLanguageError);
    });

    it('should throw an error if templateName is invalid', () => {
        const invalidTemplateName = 'invalid-template-name';
        expect(() => {
            EmailSender.create(
                validFromEmail,
                validFromName,
                validToEmails,
                validLang,
                invalidTemplateName,
                validParams
            );
        }).toThrow(InvalidTemplateNameError);
    });
});
