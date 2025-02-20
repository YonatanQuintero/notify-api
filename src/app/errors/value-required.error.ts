import { DomainError } from '../primitives/domain-error'

export class ValueRequiredError extends DomainError {
  constructor (property: string) {
    super(
      'value-required', `value for "${property}" is required`, { property }
    )
  }
}
