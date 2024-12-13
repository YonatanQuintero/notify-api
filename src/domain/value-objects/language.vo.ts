import { ValueObject } from '../primitives/value-object';
import { LanguageEnum } from '../enums/language.enum';
import { ValueRequiredError } from '../errors/value-required.error';
import { InvalidLanguageError } from '../errors/invalid-language.error';

export class LanguageVO extends ValueObject {
  private constructor(private readonly value: LanguageEnum) {
    super();
  }

  static create(lang?: string): LanguageVO {
    if (!lang) {
      throw new ValueRequiredError('Language');
    }

    const language = lang.trim() as LanguageEnum;
    if (!Object.values(LanguageEnum).includes(language)) {
      throw new InvalidLanguageError(lang);
    }

    return new LanguageVO(language);
  }

  getValue(): LanguageEnum {
    return this.value;
  }
}
