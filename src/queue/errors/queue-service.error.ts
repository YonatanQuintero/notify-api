import { DomainError } from "src/common/primitives/domain-error";

export class QueueServiceError extends DomainError {
    constructor(message: string) {
        super("QUEUE_SERVICE_ERROR", message);
    }
}