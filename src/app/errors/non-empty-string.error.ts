import { HttpStatus } from "@nestjs/common";
import { DomainError } from "../primitives/domain-error";

export class NonEmptyStringError extends DomainError {
  constructor() {
    super(HttpStatus.BAD_REQUEST, 'error.non-empty-string');
  }
}