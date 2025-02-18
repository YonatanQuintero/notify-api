import { AbstractTemplateRendererService } from 'src/template-renderer/abstracts/template-renderer.service.abstract';
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { SendEmailQueue } from 'src/email/queues/send-email.queue';
import { SubjectService } from 'src/email/services/subject.service';
import { NotificationNameEnum } from 'src/notification/enums/notification-name.enum';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { WelcomeEmailDto } from 'src/notification/dtos/welcome-email.dto';
import { TemplateRenderer } from 'src/template-renderer/entities/template-renderer.entity';
import { TemplateEntityFactory } from 'src/template-renderer/factories/template-entity.factory';
import { EmailNotificationService } from 'src/notification/services/email-notification.service';

describe('EmailNotificationService', () => {
    let service: EmailNotificationService;
    let templateRendererServiceMock: Partial<AbstractTemplateRendererService>;
    let configServiceMock: Partial<AbstractConfigService>;
    let sendEmailQueueMock: Partial<SendEmailQueue>;
    let subjectServiceMock: Partial<SubjectService>;

    // Fake SMTP and Company configuration objects with minimal value objects.
    const fakeSmtpConfig = {
        user: { getValue: () => 'smtp-user@example.com' },
    };

    const fakeCompanyConfig = {
        name: { getValue: () => 'Test Company' },
        websiteUrl: { getValue: () => 'https://testcompany.com' },
        iconUrl: { getValue: () => 'https://testcompany.com/icon.png' },
    };

    beforeEach(() => {
        templateRendererServiceMock = {
            render: jest.fn().mockResolvedValue('<p>fake-html</p>'),
        };

        configServiceMock = {
            getSmtpConfig: jest.fn().mockReturnValue(fakeSmtpConfig),
            getCompanyConfig: jest.fn().mockReturnValue(fakeCompanyConfig),
            getAppConfig: jest.fn().mockReturnValue({
                defaultLang: { getValue: () => 'en-us' },
            }),
        };

        sendEmailQueueMock = {
            add: jest.fn().mockResolvedValue({ id: 123 }),
        };

        subjectServiceMock = {
            getSubject: jest.fn().mockReturnValue('fake-subject'),
        };

        service = new EmailNotificationService(
            templateRendererServiceMock as AbstractTemplateRendererService,
            configServiceMock as AbstractConfigService,
            sendEmailQueueMock as SendEmailQueue,
            subjectServiceMock as SubjectService
        );
    });

    it('should send a welcome email successfully and return job id as string', async () => {
        const dto: WelcomeEmailDto = {
            username: 'testuser',
            to: ['recipient@example.com'],
        };

        // Prepare a fake template object with necessary value objects.
        const fakeTemplate = {
            name: { getValue: () => NotificationNameEnum.WELCOME },
            language: { getValue: () => LanguageEnum.EN },
        };

        // Spy on the static methods to control their outputs.
        jest.spyOn(TemplateRenderer, 'create').mockReturnValue(fakeTemplate as any);
        jest.spyOn(TemplateEntityFactory, 'createBase').mockReturnValue({ dummy: 'data' } as any);

        // Act: Call sendWelcomeEmail.
        const result = await service.sendWelcomeEmail(dto, LanguageEnum.EN);

        // Assert: Verify that template rendering, subject resolution, and queue submission occurred.
        expect(templateRendererServiceMock.render).toHaveBeenCalledWith(fakeTemplate);
        expect(subjectServiceMock.getSubject).toHaveBeenCalledWith(
            fakeTemplate.name.getValue(),
            fakeTemplate.language.getValue()
        );
        expect(sendEmailQueueMock.add).toHaveBeenCalled();

        // The method should return the job id as a string.
        expect(result).toBe('123');
    });
});
