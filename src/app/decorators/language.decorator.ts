import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { LanguageEnum } from 'src/config/enums/language.enum'

export const Language = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): LanguageEnum => {
    const request = ctx.switchToHttp().getRequest()
    return request.language
  }
)
