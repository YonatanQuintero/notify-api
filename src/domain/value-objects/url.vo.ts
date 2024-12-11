import { ValueObject } from '../primitives/value-object';

export class UrlVO extends ValueObject {
  private constructor(private readonly value: string) {
    super();
  }

  static create(url?: string): UrlVO {
    if (!url) {
      throw new Error('UrlVO: URL is required.');
    }
    try {
      new URL(url);
    } catch {
      throw new Error(`UrlVO: Invalid URL "${url}".`);
    }
    return new UrlVO(url.trim());
  }

  getValue(): string {
    return this.value;
  }
}
