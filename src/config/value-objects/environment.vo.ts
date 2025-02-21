import { ValueObject } from '../../app/primitives/value-object'
import { EnvironmentEnum } from '../enums/environment.enum'
import { ValueRequiredError } from '../../app/errors/value-required.error'
import { InvalidEnvironmentError } from '../errors/invalid-environment.error'

export class EnvironmentVO extends ValueObject {
  private constructor (private readonly value: EnvironmentEnum) {
    super()
  }

  static create (env?: string): EnvironmentVO {
    if (env == null) {
      throw new ValueRequiredError('Environment')
    }

    const environment = env.trim() as EnvironmentEnum
    const values = Object.values(EnvironmentEnum)
    if (!values.includes(environment)) {
      throw new InvalidEnvironmentError(env, values.join(', '))
    }

    return new EnvironmentVO(environment)
  }

  getValue (): EnvironmentEnum {
    return this.value
  }
}
