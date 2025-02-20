import { Injectable } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import { LanguageEnum } from 'src/config/enums/language.enum'
import { TemplateNameEnum } from 'src/template-renderer/enum/template-name.enum'

@Injectable()
export class SubjectService {
  constructor (
    private readonly i18n: I18nService
  ) { }

  getSubject (name: TemplateNameEnum, lang: LanguageEnum): string {
    return this.i18n.t(`subject.${name}`, { lang })
  }
}
