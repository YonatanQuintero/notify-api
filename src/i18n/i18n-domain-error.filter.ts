import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { DomainError } from 'src/app/primitives/domain-error';

@Catch(DomainError)
export class I18nDomainErrorFilter implements ExceptionFilter {

    private readonly logger = new Logger(I18nDomainErrorFilter.name);

    constructor(private readonly i18n: I18nService) { }

    async catch(exception: DomainError, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const { language } = ctx.getRequest();
        const key = `error.${exception.code}`;
        const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

        const message = await this.i18n.t(key, {
            lang: language,
            args: exception.args,
        });

        this.logger.error(JSON.stringify({ message, statusCode, }));

        return response.status(statusCode).json({
            message,
            statusCode
        });

    }
}