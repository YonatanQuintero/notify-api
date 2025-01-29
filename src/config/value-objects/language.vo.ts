import { ValueObject } from '../../common/primitives/value-object';
import { LanguageEnum } from '../enums/language.enum';
import { ValueRequiredError } from '../../common/errors/value-required.error';
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

      const trimmed = lang.trim() as LanguageEnum;
      if (!Object.values(LanguageEnum).includes(trimmed)) {
        throw new InvalidLanguageError(lang);
      }
      return new LanguageVO(trimmed);
    }

    return new LanguageVO(lang);
  }

  getValue(): LanguageEnum {
    return this.value;
  }
}
