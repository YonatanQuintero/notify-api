import { ValueObject } from '../primitives/value-object';
import { EnvironmentEnum } from '../enums/environment.enum';

export class EnvironmentVO extends ValueObject {
  private constructor(private readonly value: EnvironmentEnum) {
    super();
  }

  static create(env?: string): EnvironmentVO {
    if (!env) {
      throw new Error('EnvironmentVO: Environment value is required.');
    }

    const environment = env.trim() as EnvironmentEnum;
    if (!Object.values(EnvironmentEnum).includes(environment)) {
      throw new Error(`EnvironmentVO: Invalid environment "${env}". Allowed values: ${Object.values(EnvironmentEnum).join(', ')}.`);
    }

    return new EnvironmentVO(environment);
  }

  getValue(): EnvironmentEnum {
    return this.value;
  }
}
