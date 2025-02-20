import { ValueObject } from 'src/app/primitives/value-object'
import { TemplateBase } from '../entities/template-base.entity'
import { InvalidTemplateBaseError } from '../errors/invalid-template-base.error'

export class TemplateBaseVO extends ValueObject {
  private constructor (private readonly value: TemplateBase) {
    super()
  }

  public static create (template: unknown): TemplateBaseVO {
    if (!(template instanceof TemplateBase)) {
      throw new InvalidTemplateBaseError()
    }
    return new TemplateBaseVO(template)
  }

  public getValue (): TemplateBase {
    return this.value
  }
}
