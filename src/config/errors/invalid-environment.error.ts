import { HttpStatus } from "@nestjs/common";
import { DomainError } from "../../app/primitives/domain-error";

export class InvalidEnvironmentError extends DomainError {
    constructor(env: string, allowedEnvs: string) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, 'error.invalid-environment', { env, allowedEnvs });
    }
}