import { I18nService } from 'nestjs-i18n'
import { LanguageEnum } from 'src/config/enums/language.enum'
import { SubjectService } from 'src/email/services/subject.service'
import { TemplateNameEnum } from 'src/template-renderer/enum/template-name.enum'

describe('SubjectService', () => {
  let subjectService: SubjectService
  let i18nServiceMock: Partial<I18nService>

  beforeEach(() => {
    // Create a mock for the i18n.t() method.
    i18nServiceMock = {
      t: jest.fn().mockImplementation((key: string, options: { lang: string }) => {
        // For testing purposes, simply return a string combining the key and language.
        return `${key}-${options.lang}`
      })
    }

    subjectService = new SubjectService(i18nServiceMock as I18nService)
  })

  it('should return the subject using i18n.t with correct key and language', () => {
    const notificationName = TemplateNameEnum.WELCOME
    const language = LanguageEnum.EN

    const result = subjectService.getSubject(notificationName, language)

    // Expect the i18n.t() to have been called with the key 'subject.WELCOME' and options { lang: 'en' }
    expect(i18nServiceMock.t).toHaveBeenCalledWith(`subject.${notificationName}`, { lang: language })
    expect(result).toBe(`subject.${notificationName}-${language}`)
  })
})
