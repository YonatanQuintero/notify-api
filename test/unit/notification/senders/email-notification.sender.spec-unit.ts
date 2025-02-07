import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { SendEmailQueue } from 'src/email/queues/send-email.queue';
import { EmailSenderDto } from 'src/email/dtos/email-sender.dto';
import { SmtpConfig } from 'src/config/entities/smpt-config.entity';
import { CompanyConfig } from 'src/config/entities/company-config.entity';
import { AppConfig } from 'src/config/entities/app-config.entity';
import { EmailNotificationSender } from 'src/notification/senders/email-notification.sender';
import { NotificationDto } from 'src/notification/dtos/notification.dto';
import { NotificationType } from 'src/notification/enums/notification-type.enum';

describe('EmailNotificationSender', () => {
    let emailNotificationSender: EmailNotificationSender;
    let configServiceMock: Partial<AbstractConfigService>;
    let sendEmailQueueMock: Partial<SendEmailQueue>;

    // Create dummy value objects for the configuration mocks.
    const smtpConfigMock: SmtpConfig = {
        user: { getValue: () => 'smtp-user@example.com' },
    } as unknown as SmtpConfig;

    const companyConfigMock: CompanyConfig = {
        name: { getValue: () => 'Company Name' },
    } as unknown as CompanyConfig;

    const appConfigMock: AppConfig = {
        defaultLang: { getValue: () => 'en-us' },
    } as unknown as AppConfig;

    beforeEach(() => {
        configServiceMock = {
            getSmtpConfig: jest.fn().mockReturnValue(smtpConfigMock),
            getCompanyConfig: jest.fn().mockReturnValue(companyConfigMock),
            getAppConfig: jest.fn().mockReturnValue(appConfigMock),
        };

        sendEmailQueueMock = {
            add: jest.fn(),
        };

        emailNotificationSender = new EmailNotificationSender(
            configServiceMock as AbstractConfigService,
            sendEmailQueueMock as SendEmailQueue
        );
    });

    it('should send notification and return the job id as a string', async () => {
        // Arrange: Create a dummy NotificationDto.
        const notificationDto: NotificationDto = {
            type: NotificationType.EMAIL,
            recipients: ['to@example.com'],
            templateName: 'welcome',
            params: { 'key': 'value' },
            ccEmail: ['cc@example.com'],
            bccEmail: ['bcc@example.com'],
            lang: 'es-la', // Provided language; should override appConfig.defaultLang.
        };

        // Simulate a successful queue job result.
        const jobResult = { id: 12345 };
        (sendEmailQueueMock.add as jest.Mock).mockResolvedValue(jobResult);

        // Act: Call the send method.
        const result = await emailNotificationSender.send(notificationDto);

        // Assert: Verify that sendEmailQueue.add was called with a properly constructed EmailSenderDto.
        expect(sendEmailQueueMock.add).toHaveBeenCalledTimes(1);
        const calledWith = (sendEmailQueueMock.add as jest.Mock).mock.calls[0][0] as EmailSenderDto;
        expect(calledWith.fromEmail).toBe('smtp-user@example.com');
        expect(calledWith.fromName).toBe('Company Name');
        expect(calledWith.toEmail).toEqual(notificationDto.recipients);
        expect(calledWith.lang).toBe(notificationDto.lang);
        expect(calledWith.notificationName).toBe(notificationDto.templateName);
        expect(calledWith.params).toBe(notificationDto.params);
        expect(calledWith.ccEmail).toEqual(notificationDto.ccEmail);
        expect(calledWith.bccEmail).toEqual(notificationDto.bccEmail);

        // Also, ensure the method returns the job id as a string.
        expect(result).toBe(jobResult.id.toString());
    });

    it('should log an error and rethrow if sendEmailQueue.add fails', async () => {
        // Arrange: Create a basic NotificationDto.
        const notificationDto: NotificationDto = {
            type: NotificationType.EMAIL,
            recipients: ['to@example.com'],
            templateName: 'welcome',
            params: { 'key': 'value' },
        };

        const error = new Error('Queue add failed');
        (sendEmailQueueMock.add as jest.Mock).mockRejectedValue(error);

        // Spy on the instance logger's error method.
        const loggerErrorSpy = jest.spyOn(emailNotificationSender['logger'], 'error');

        // Act & Assert: Expect send to rethrow the error.
        await expect(emailNotificationSender.send(notificationDto)).rejects.toThrow(error);
        expect(loggerErrorSpy).toHaveBeenCalledWith(`Failed to send notification: ${error.message}`);
    });
});
