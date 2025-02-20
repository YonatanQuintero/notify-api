import { DomainError } from 'src/app/primitives/domain-error'

export class InvalidEmailError extends DomainError {
  constructor (email: string) {
    super('invalid-email', `Invalid email address "${email}"`, { email })
  }
}
