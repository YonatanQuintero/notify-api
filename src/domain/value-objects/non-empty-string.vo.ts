import { NonEmptyStringError } from "../errors/non-empty-string.error";
import { ValueObject } from "../primitives/value-object";

export class NonEmptyStringVO extends ValueObject {
  private constructor(private readonly value: string) {
    super();
  }

  static create(value?: string): NonEmptyStringVO {
    if (!value || value.trim().length === 0) {
      throw new NonEmptyStringError();
    }
    return new NonEmptyStringVO(value.trim());
  }

  getValue(): string {
    return this.value;
  }
}