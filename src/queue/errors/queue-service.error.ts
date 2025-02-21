import { DomainError } from 'src/app/primitives/domain-error'

export class QueueServiceError extends DomainError {
  constructor (message: string) {
    super('queue-service-error', `Error on queue service: ${message}`, { message })
  }
}
