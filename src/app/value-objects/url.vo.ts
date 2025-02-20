import { InvalidUrlError } from '../errors/invalid-url.error'
import { ValueRequiredError } from '../errors/value-required.error'
import { ValueObject } from '../primitives/value-object'

export class UrlVO extends ValueObject {
  private constructor (private readonly value: string) {
    super()
  }

  static create (url?: string): UrlVO {
    if (url == null) {
      throw new ValueRequiredError('Url')
    }
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch {
      throw new InvalidUrlError(url)
    }
    return new UrlVO(parsedUrl.href.toLowerCase())
  }

  getValue (): string {
    return this.value
  }
}
