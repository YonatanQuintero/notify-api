import { HttpStatus } from "@nestjs/common";
import { DomainError } from "src/app/primitives/domain-error";

export class InvalidRedisDBError extends DomainError {
    constructor(dbIndex: number) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, 'error.invalid-redis-db', { dbIndex });
    }
}