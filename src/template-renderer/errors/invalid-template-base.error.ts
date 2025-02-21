import { DomainError } from '../../app/primitives/domain-error'

export class InvalidTemplateBaseError extends DomainError {
  constructor () {
    super('invalid-template-base', 'Must be a instance of TemplateBase.')
  }
}
