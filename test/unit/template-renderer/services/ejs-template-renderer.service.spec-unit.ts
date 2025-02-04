import { Logger } from '@nestjs/common';
import * as ejs from 'ejs';
import * as path from 'path';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { TemplateRenderer } from 'src/template-renderer/entities/template-renderer.entity';
import { TemplateNameEnum } from 'src/template-renderer/enums/template-name.enum';
import { EJSTemplateRendererService } from 'src/template-renderer/services/ejs-template-renderer.service';

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

        const templateRenderer = TemplateRenderer.create(
            TemplateNameEnum.WELCOME,
            LanguageEnum.EN_US,
            new Map([['username', 'JohnDoe'], ['code', '123456']])
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
                code: '123456',
            },
        );
    });

    it('should log an error and rethrow when rendering fails', async () => {
        const error = new Error('EJS rendering error');
        const renderFileMock = jest
            .spyOn(ejs, 'renderFile')
            .mockRejectedValue(error);

        const loggerSpy = jest.spyOn(Logger, 'error');

        const templateRenderer = TemplateRenderer.create(
            TemplateNameEnum.WELCOME,
            LanguageEnum.EN_US,
            new Map([['key', 'value']])
        );

        await expect(service.render(templateRenderer)).rejects.toThrow(error);
        expect(loggerSpy).toHaveBeenCalledWith(
            `Error rendering template: ${error.message}`,
        );
        expect(renderFileMock).toHaveBeenCalled();
    });
});
