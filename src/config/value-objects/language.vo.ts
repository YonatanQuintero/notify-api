import { ValueObject } from '../../app/primitives/value-object';
import { LanguageEnum } from '../enums/language.enum';
import { ValueRequiredError } from '../../app/errors/value-required.error';
import { InvalidLanguageError } from '../errors/invalid-language.error';

export class LanguageVO extends ValueObject {
  private constructor(private readonly value: LanguageEnum) {
    super();
  }

  static create(lang?: string | LanguageEnum): LanguageVO {
    if (!lang) {
      throw new ValueRequiredError('Language');
    }

    if (typeof lang === 'string') {

      const trimmed = lang.trim().toLowerCase() as LanguageEnum;
      const values = Object.values(LanguageEnum);
      if (!values.includes(trimmed)) {
        throw new InvalidLanguageError(lang, values.join(', '));
      }
      return new LanguageVO(trimmed);
    }

    return new LanguageVO(lang);
  }

  getValue(): LanguageEnum {
    return this.value;
  }
}
