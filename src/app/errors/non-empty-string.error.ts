import { DomainError } from "../primitives/domain-error";

export class NonEmptyStringError extends DomainError {
  constructor() {
    super('non-empty-string', 'Value cannot be empty');
  }
}