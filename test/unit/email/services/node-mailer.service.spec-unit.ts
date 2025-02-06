import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { I18nService } from "nestjs-i18n";
import { AbstractConfigService } from "src/config/abstracts/config.service.abstract";
import { AppConfig } from "src/config/entities/app-config.entity";
import { NodeMailerService } from "src/email/services/node-mailer.service";
import { AbstractTemplateRendererService } from "src/template-renderer/abstracts/template-renderer.service.abstract";
import { EmailSender } from "src/email/entities/email-sender.entity";
import { EmailSenderDto } from "src/email/dtos/email-sender.dto";

// Mock nodemailer's createTransport method
jest.mock('nodemailer');

describe('NodeMailerService', () => {
    let nodeMailerService: NodeMailerService;
    let i18nServiceMock: Partial<I18nService>;
    let configServiceMock: Partial<AbstractConfigService>;
    let templateRendererServiceMock: Partial<AbstractTemplateRendererService>;
    let transporterSendMailMock: jest.Mock;

    const fakeAppConfig: AppConfig = {
        smptHost: { getValue: () => 'smtp.example.com' },
        smptPort: { getValue: () => 587 },
        smptUser: { getValue: () => 'user@example.com' },
        smptPass: { getValue: () => 'password' },
        companyName: { getValue: () => 'Example Company' },
        companyWebsiteUrl: { getValue: () => 'https://example.com' },
        companyIconUrl: { getValue: () => 'https://example.com/icon.png' },
        companyAddress: { getValue: () => '123 Example St' },
    } as unknown as AppConfig;

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
            getAppConfig: jest.fn().mockReturnValue(fakeAppConfig),
        };

        templateRendererServiceMock = {
            render: jest.fn().mockResolvedValue('<html>Test Email</html>'),
        };

        nodeMailerService = new NodeMailerService(
            i18nServiceMock as I18nService,
            configServiceMock as AbstractConfigService,
            templateRendererServiceMock as AbstractTemplateRendererService
        );
    });

    it('should send email successfully and resolve true', async () => {
        const emailSenderDto = new EmailSenderDto(
            'from@example.com',
            'From Name',
            ['to@example.com'],
            'en-us',
            'welcome',
            { 'key': 'value' }
        );
        const emailSender = EmailSender.create(emailSenderDto);

        // Simulate successful sending by calling the callback with no error.
        transporterSendMailMock.mockImplementation(
            (mailOptions: Mail.Options, callback: (error: any, info?: any) => void) => {
                callback(null, { response: 'OK' });
            }
        );

        const result = await nodeMailerService.send(emailSender);
        expect(result).toBe(true);
        expect(transporterSendMailMock).toHaveBeenCalled();
    });

    it('should reject sending email when transporter.sendMail returns an error', async () => {
        const emailSenderDto = new EmailSenderDto(
            'from@example.com',
            'From Name',
            ['to@example.com'],
            'en-us',
            'welcome',
            { 'key': 'value' }
        );
        const emailSender = EmailSender.create(emailSenderDto);

        const errorMessage = 'SMTP connection error';

        transporterSendMailMock.mockImplementation(
            (mailOptions: Mail.Options, callback: (error: any, info?: any) => void) => {
                callback({ message: errorMessage });
            }
        );

        await expect(nodeMailerService.send(emailSender)).rejects.toThrow(errorMessage);
    });
});
