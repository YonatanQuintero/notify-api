import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

export interface ClassValidatorError {
    message: string[],
    error: string,
    statusCode: number,
}

@Catch(HttpException)
export class I18nExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(I18nExceptionFilter.name);

    constructor(private readonly i18n: I18nService) { }

    async catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const exResponse = exception.getResponse();

        if (exResponse && Array.isArray(exResponse["message"])) {
            const { message, statusCode } = exResponse as ClassValidatorError;
            const { language } = ctx.getRequest();
            const translatedMessages = await Promise.all(message.map(
                async (m) => await this.i18n.t(m, { lang: language })
            ));

            const classValidatorData = {
                statusCode,
                message: translatedMessages.join('. '),
            }
            this.logger.error(JSON.stringify(classValidatorData));
            return response.status(statusCode).json(classValidatorData);
        }

        const data = {
            statusCode: status,
            message: exception.message,
        }
        this.logger.error(JSON.stringify(data));
        return response.status(status).json(data);

    }
}