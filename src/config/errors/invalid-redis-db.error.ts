import { DomainError } from 'src/app/primitives/domain-error'

export class InvalidRedisDBError extends DomainError {
  constructor (dbIndex: number) {
    super(
      'invalid-redis-db',
            `Invalid Redis DB index "${dbIndex}". Must be between 0 and 15`,
            { dbIndex }
    )
  }
}
