import { DomainError } from '../../app/primitives/domain-error'

export class InvalidLanguageError extends DomainError {
  constructor (lang: string, allowedLangs: string) {
    super(
      'invalid-language',
            `Invalid language "${lang}". Allowed values are: ${allowedLangs}`,
            { lang, allowedLangs }
    )
  }
}
