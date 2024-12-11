import { ValueObject } from '../primitives/value-object';
import { LanguageEnum } from '../enums/language.enum';

export class LanguageVO extends ValueObject {
  private constructor(private readonly value: LanguageEnum) {
    super();
  }

  static create(lang?: string): LanguageVO {
    if (!lang) {
      throw new Error('LanguageVO: Language is required.');
    }

    const language = lang.trim() as LanguageEnum;
    if (!Object.values(LanguageEnum).includes(language)) {
      throw new Error(`LanguageVO: Invalid language "${lang}". Allowed: ${Object.values(LanguageEnum).join(', ')}.`);
    }

    return new LanguageVO(language);
  }

  getValue(): LanguageEnum {
    return this.value;
  }
}
