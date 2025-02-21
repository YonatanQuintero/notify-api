import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { I18nService } from 'nestjs-i18n'

interface ResponseData { message: string, statusCode: number }

@Catch(HttpException)
export class I18nExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(I18nExceptionFilter.name)

  constructor (private readonly i18n: I18nService) { }

  async catch (exception: HttpException, host: ArgumentsHost): Promise<any> {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const data = await this.buildResponseData(exception, ctx)
    this.logger.error(JSON.stringify(data))
    return response.status(data.statusCode).json(data)
  }

  private async buildResponseData (exception: HttpException, ctx: HttpArgumentsHost): Promise<ResponseData> {
    const response = exception.getResponse() as ResponseData
    let statusCode: number = exception.getStatus()
    let message: string = exception.message
    if (typeof response === 'object' && Array.isArray(response.message)) {
      const lang = ctx.getRequest().language
      const messages = response.message
      statusCode = response.statusCode
      message = (await Promise.all(messages.map(
        key => this.i18n.t(key, { lang })
      ))).join('. ')
    }
    return { message, statusCode }
  }
}
