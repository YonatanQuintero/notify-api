import { Logger } from '@nestjs/common';
import * as ejs from 'ejs';
import * as path from 'path';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { TemplateRenderer } from 'src/template-renderer/entities/template-renderer.entity';
import { NotificationNameEnum } from 'src/notification/enums/notification-name.enum';
import { EJSTemplateRendererService } from 'src/template-renderer/services/ejs-template-renderer.service';
import { TemplateEntityFactory } from 'src/template-renderer/factories/template-entity.factory';

describe('EJSTemplateRendererService', () => {
    let service: EJSTemplateRendererService;

    beforeEach(() => {
        service = new EJSTemplateRendererService();
        jest.spyOn(Logger, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should render the template successfully', async () => {
        // Mock ejs.renderFile to resolve with a simple string
        const renderFileMock = jest
            .spyOn(ejs, 'renderFile')
            .mockResolvedValue('<html>Mocked Result</html>');

        const params = TemplateEntityFactory.createTFA(
            "JohnDoe",
            "Company Name",
            "https://example.com",
            "https://example.com/icon.png",
            123456,
            "15 minutes",
            "127.0.0.1"
        );

        const templateRenderer = TemplateRenderer.create(
            NotificationNameEnum.WELCOME,
            LanguageEnum.EN_US,
            params
        );

        const result = await service.render(templateRenderer);

        // Assertions
        expect(result).toBe('<html>Mocked Result</html>');
        expect(renderFileMock).toHaveBeenCalledWith(
            path.resolve(
                process.cwd(),
                'src/template-renderer/templates/ejs/partials/base.layout.ejs',
            ),
            {
                lang: 'en-us',
                templateName: 'welcome',
                username: 'JohnDoe',
                companyName: 'Company Name',
                companySite: 'https://example.com',
                companyIconUrl: 'https://example.com/icon.png',
                code: 123456,
                ttlFormatted: '15 minutes',
                ipClient: '127.0.0.1'
            },
        );
    });

    it('should log an error and rethrow when rendering fails', async () => {
        const error = new Error('EJS rendering error');
        const renderFileMock = jest
            .spyOn(ejs, 'renderFile')
            .mockRejectedValue(error);

        const loggerSpy = jest.spyOn(service["logger"], 'error');

        const params = TemplateEntityFactory.createBase(
            "JohnDoe",
            "Company Name",
            "https://example.com",
            "https://example.com/icon.png",
        );

        const templateRenderer = TemplateRenderer.create(
            NotificationNameEnum.WELCOME,
            LanguageEnum.EN_US,
            params
        );

        await expect(service.render(templateRenderer)).rejects.toThrow(error);
        expect(loggerSpy).toHaveBeenCalledWith(
            `Error rendering template: ${error.message}`,
        );
        expect(renderFileMock).toHaveBeenCalled();
    });
});
