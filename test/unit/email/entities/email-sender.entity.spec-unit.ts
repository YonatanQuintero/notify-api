import { InvalidLanguageError } from "src/config/errors/invalid-language.error";
import { LanguageVO } from "src/config/value-objects/language.vo";
import { EmailSenderDto } from "src/email/dtos/email-sender.dto";
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
    const validParams = { 'key': 'value' };
    const validCcEmails = ['cc@example.com'];
    const validBccEmails = ['bcc@example.com'];

    const validEmailSenderDto = new EmailSenderDto(
        validFromEmail,
        validFromName,
        validToEmails,
        validLang,
        validTemplateName,
        validParams,
        validCcEmails,
        validBccEmails
    );

    it('should create an EmailSender instance with all properties provided', () => {
        const sender = EmailSender.create(
            validEmailSenderDto
        );

        expect(sender).toBeInstanceOf(EmailSender);
        expect(sender.from).toBeInstanceOf(EmailIssuer);
        expect(sender.to).toBeInstanceOf(EmailRecipientList);
        expect(sender.lang).toBeInstanceOf(LanguageVO);
        expect(sender.templateName).toBeInstanceOf(TemplateNameVO);
        expect(sender.params).toBeInstanceOf(Object);
        expect(sender.cc).toBeDefined();
        expect(sender.cc?.length).toBe(validCcEmails.length);
        expect(sender.bcc).toBeDefined();
        expect(sender.bcc?.length).toBe(validBccEmails.length);
    });

    it('should create an EmailSender instance without optional cc and bcc emails', () => {
        const senderDto = new EmailSenderDto(
            validFromEmail,
            validFromName,
            validToEmails,
            validLang,
            validTemplateName,
            validParams
        );
        const sender = EmailSender.create(senderDto);

        expect(sender).toBeInstanceOf(EmailSender);
        expect(sender.cc).toBeUndefined();
        expect(sender.bcc).toBeUndefined();
    });

    it('should throw an error if fromEmail is invalid', () => {
        const invalidFromEmail = 'invalid-email';
        const senderDto = new EmailSenderDto(
            invalidFromEmail,
            validFromName,
            validToEmails,
            validLang,
            validTemplateName,
            validParams
        );
        expect(() => {
            EmailSender.create(senderDto);
        }).toThrow(InvalidEmailError);
    });

    it('should throw an error if any email in the to list is invalid', () => {
        const invalidToEmails = ['to1@example.com', 'invalid-email'];
        const senderDto = new EmailSenderDto(
            validFromEmail,
            validFromName,
            invalidToEmails,
            validLang,
            validTemplateName,
            validParams
        );
        expect(() => {
            EmailSender.create(senderDto);
        }).toThrow(InvalidEmailError);
    });

    it('should throw an error if language is invalid', () => {
        const invalidLang = 'xyz-abc';
        const senderDto = new EmailSenderDto(
            validFromEmail,
            validFromName,
            validToEmails,
            invalidLang,
            validTemplateName,
            validParams
        );
        expect(() => {
            EmailSender.create(senderDto);
        }).toThrow(InvalidLanguageError);
    });

    it('should throw an error if templateName is invalid', () => {
        const invalidTemplateName = 'invalid-template-name';
        const senderDto = new EmailSenderDto(
            validFromEmail,
            validFromName,
            validToEmails,
            validLang,
            invalidTemplateName,
            validParams
        );
        expect(() => {
            EmailSender.create(senderDto);
        }).toThrow(InvalidTemplateNameError);
    });
});
