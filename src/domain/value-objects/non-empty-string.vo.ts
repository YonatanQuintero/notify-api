import { ValueObject } from "../primitives/value-object";

export class NonEmptyStringVO extends ValueObject {
    private constructor(private readonly value: string) {
      super();
    }
  
    static create(value?: string): NonEmptyStringVO {
      if (!value || value.trim().length === 0) {
        throw new Error('NonEmptyStringVO: Value cannot be empty.');
      }
      return new NonEmptyStringVO(value.trim());
    }
  
    getValue(): string {
      return this.value;
    }
  }