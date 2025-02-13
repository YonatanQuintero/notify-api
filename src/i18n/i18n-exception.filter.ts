import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';


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

        this.logger.error(JSON.stringify(exception));
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        console.log(exception);
        const exceptionResponse = exception.getResponse() as ClassValidatorError;
        console.log("exceptionResponse", exceptionResponse);
        //It possible comes from class validator error
        if (exceptionResponse && Array.isArray(exceptionResponse.message)) {
            const { message, statusCode } = exceptionResponse;
            const { language } = ctx.getRequest();
            const translatedMessages = await Promise.all(
                message.map(
                    async (m) => await this.i18n.t(m, { lang: language })
                )
            );

            return response.status(statusCode).json({
                statusCode,
                message: translatedMessages.join(', '),
            });
        }

        return response.status(status).json({
            statusCode: status,
            message: exception.message,
        });

    }
}