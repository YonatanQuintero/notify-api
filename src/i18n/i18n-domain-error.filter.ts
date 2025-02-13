import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { DomainError } from 'src/app/primitives/domain-error';

@Catch(DomainError)
export class I18nDomainErrorFilter implements ExceptionFilter {

    private readonly logger = new Logger(I18nDomainErrorFilter.name);

    constructor(private readonly i18n: I18nService) { }

    async catch(exception: DomainError, host: ArgumentsHost) {

        const { code, message, args, name } = exception;
        this.logger.error(JSON.stringify({ code, message, args, name }));
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const { language } = ctx.getRequest();

        const translatedMessage = await this.i18n.t(message, {
            lang: language,
            args: args,
        });

        return response.status(code).json({
            message: translatedMessage,
            statusCode: code,
        });

    }
}