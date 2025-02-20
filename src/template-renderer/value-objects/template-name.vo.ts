import { ValueRequiredError } from '../../app/errors/value-required.error'
import { ValueObject } from '../../app/primitives/value-object'
import { TemplateNameEnum } from '../enum/template-name.enum'
import { InvalidTemplateNameError } from '../errors/invalid-template-name.error'

export class TemplateNameVO extends ValueObject {
  private constructor (private readonly value: TemplateNameEnum) {
    super()
  }

  static create (name?: string | TemplateNameEnum): TemplateNameVO {
    if (!name) {
      throw new ValueRequiredError('Template Name')
    }

    if (typeof name === 'string') {
      const normalized = name.trim().toLowerCase() as TemplateNameEnum
      const values = Object.values(TemplateNameEnum)
      if (!values.includes(normalized)) {
        throw new InvalidTemplateNameError(name, values.join(', '))
      }
      return new TemplateNameVO(normalized)
    }

    return new TemplateNameVO(name)
  }

  getValue (): TemplateNameEnum {
    return this.value
  }
}
