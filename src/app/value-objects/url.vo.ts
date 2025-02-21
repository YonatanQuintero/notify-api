import { InvalidUrlError } from '../errors/invalid-url.error'
import { ValueRequiredError } from '../errors/value-required.error'
import { ValueObject } from '../primitives/value-object'
import validator from 'validator'

export class UrlVO extends ValueObject {
  private constructor (private readonly value: string) {
    super()
  }

  static create (url?: string): UrlVO {
    if (url == null) {
      throw new ValueRequiredError('Url')
    }
    const trimmedUrl = url.trim()
    const options = {
      require_protocol: true,
      protocols: ['http', 'https', 'redis'], // Allow Redis URLs (redis://localhost:6379/0)
      require_tld: false // Allow localhost
    }
    if (!validator.isURL(trimmedUrl, options)) {
      throw new InvalidUrlError(url)
    }

    return new UrlVO(trimmedUrl)
  }

  getValue (): string {
    return this.value
  }
}
