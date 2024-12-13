import { InvalidUrlError } from '../errors/invalid-url.error';
import { ValueRequiredError } from '../errors/value-required.error';
import { ValueObject } from '../primitives/value-object';

export class UrlVO extends ValueObject {
  private constructor(private readonly value: string) {
    super();
  }

  static create(url?: string): UrlVO {
    if (!url) {
      throw new ValueRequiredError('Url');
    }
    try {
      new URL(url);
    } catch {
      throw new InvalidUrlError(url);
    }
    return new UrlVO(url.trim());
  }

  getValue(): string {
    return this.value;
  }
}
