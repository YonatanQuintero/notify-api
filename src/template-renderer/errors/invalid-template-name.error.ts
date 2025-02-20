import { DomainError } from '../../app/primitives/domain-error'

export class InvalidTemplateNameError extends DomainError {
  constructor (name: string, allowedNames: string) {
    super(
      'invalid-template-name',
            `Invalid Template Name "${name}". Allowed values are: ${allowedNames} `,
            { name }
    )
  }
}
