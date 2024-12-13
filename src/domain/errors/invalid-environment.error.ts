import { EnvironmentEnum } from "../enums/environment.enum";
import { DomainError } from "../primitives/domain-error";

export class InvalidEnvironmentError extends DomainError {
    constructor(env: string) {
        super(
            'INVALID_ENVIRONMENT',
            `Invalid environment "${env}". Allowed values: ${Object.values(EnvironmentEnum).join(', ')}.`
        );
    }
}