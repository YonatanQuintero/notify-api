import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { I18nService } from "nestjs-i18n";
import { AbstractConfigService } from "src/config/abstracts/config.service.abstract";
import { NodeMailerService } from "src/email/services/node-mailer.service";
import { AbstractTemplateRendererService } from "src/template-renderer/abstracts/template-renderer.service.abstract";
import { EmailSenderDto } from "src/email/dtos/email-sender.dto";
import { SmtpConfig } from "src/config/entities/smpt-config.entity";
import { CompanyConfig } from "src/config/entities/company-config.entity";
import { EmailSenderError } from "src/email/errors/email-sender.error";
import { NodeMailerTransporterService } from "src/email/services/node-mailer-transporter.service";

// Mock nodemailer's createTransport method
jest.mock('nodemailer');

describe('NodeMailerService', () => {
    let nodeMailerService: NodeMailerService;
    let i18nServiceMock: Partial<I18nService>;
    let configServiceMock: Partial<AbstractConfigService>;
    let templateRendererServiceMock: Partial<AbstractTemplateRendererService>;
    let nodeMailerTransporterService: NodeMailerTransporterService;
    let transporterSendMailMock: jest.Mock;

    const fakeSmtpConfig: SmtpConfig = {
        host: { getValue: () => 'smtp.example.com' },
        port: { getValue: () => 587 },
        user: { getValue: () => 'user@example.com' },
        pass: { getValue: () => 'password' },
    } as unknown as SmtpConfig;

    const fakeCompanyConfig: CompanyConfig = {
        name: { getValue: () => 'Example Company' },
        websiteUrl: { getValue: () => 'https://example.com' },
        iconUrl: { getValue: () => 'https://example.com/icon.png' },
        address: { getValue: () => '123 Example St' },
    } as unknown as CompanyConfig;

    beforeEach(() => {
        transporterSendMailMock = jest.fn();
        // When createTransport is called, return a fake transporter with a sendMail method
        (nodemailer.createTransport as jest.Mock).mockReturnValue({
            sendMail: transporterSendMailMock,
        });

        i18nServiceMock = {
            t: jest.fn().mockImplementation((key: string, options: any) => `Subject for ${key}`),
        };

        configServiceMock = {
            getSmtpConfig: jest.fn().mockReturnValue(fakeSmtpConfig),
            getCompanyConfig: jest.fn().mockReturnValue(fakeCompanyConfig)
        };

        nodeMailerTransporterService = new NodeMailerTransporterService(
            configServiceMock as AbstractConfigService
        );

        templateRendererServiceMock = {
            render: jest.fn().mockResolvedValue('<html>Test Email</html>'),
        };

        nodeMailerService = new NodeMailerService(
            nodeMailerTransporterService as NodeMailerTransporterService,
        );
    });

    it('should send email successfully and resolve true', async () => {
        const emailSenderDto = new EmailSenderDto(
            'from@example.com',
            'From Name',
            ['to@example.com'],
            'subject test',
            '<p>Test</p>',
            ['cc@example.com'],
            ['bcc@example.com']
        );

        // Simulate successful sending by calling the callback with no error.
        transporterSendMailMock.mockImplementation(
            (mailOptions: Mail.Options, callback: (error: any, info?: any) => void) => {
                callback(null, { response: 'OK' });
            }
        );

        const result = await nodeMailerService.send(emailSenderDto);
        expect(result).toBe(true);
        expect(transporterSendMailMock).toHaveBeenCalled();
    });

    it('should reject sending email when transporter.sendMail returns an error', async () => {
        const emailSenderDto = new EmailSenderDto(
            'from@example.com',
            'From Name',
            ['to@example.com'],
            'subject test',
            '<p>Test</p>',
            ['cc@example.com'],
            ['bcc@example.com']
        );

        const errorMessage = 'SMTP connection error';

        transporterSendMailMock.mockImplementation(
            (mailOptions: Mail.Options, callback: (error: any, info?: any) => void) => {
                callback({ message: errorMessage });
            }
        );

        await expect(nodeMailerService.send(emailSenderDto)).rejects.toThrow(EmailSenderError);
    });
});
