import { DomainError } from "../primitives/domain-error";

export class NonEmptyStringError extends DomainError {
    constructor() {
      super('NON_EMPTY_STRING', 'Value cannot be empty.');
    }
  }