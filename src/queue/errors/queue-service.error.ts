import { HttpStatus } from "@nestjs/common";
import { DomainError } from "src/app/primitives/domain-error";

export class QueueServiceError extends DomainError {
    constructor(message: string) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, "error.queue-service-error", { message });
    }
}