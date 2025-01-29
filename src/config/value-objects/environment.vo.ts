import { ValueObject } from '../../common/primitives/value-object';
import { EnvironmentEnum } from '../enums/environment.enum';
import { ValueRequiredError } from '../../common/errors/value-required.error';
import { InvalidEnvironmentError } from '../errors/invalid-environment.error';

export class EnvironmentVO extends ValueObject {
  private constructor(private readonly value: EnvironmentEnum) {
    super();
  }

  static create(env?: string): EnvironmentVO {
    if (!env) {
      throw new ValueRequiredError('Environment');
    }

    const environment = env.trim() as EnvironmentEnum;
    if (!Object.values(EnvironmentEnum).includes(environment)) {
      throw new InvalidEnvironmentError(env);
    }

    return new EnvironmentVO(environment);
  }

  getValue(): EnvironmentEnum {
    return this.value;
  }
}
