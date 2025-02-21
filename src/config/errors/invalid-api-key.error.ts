import { DomainError } from '../../app/primitives/domain-error'

export class InvalidApiKeyError extends DomainError {
  constructor (minLength: number) {
    super(
      'invalid-api-key',
            `API key cannot be empty or less than "${minLength}" characters long`,
            { minLength }
    )
  }
}
