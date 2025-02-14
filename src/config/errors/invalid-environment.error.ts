import { DomainError } from "../../app/primitives/domain-error";

export class InvalidEnvironmentError extends DomainError {
    constructor(env: string, allowedEnvs: string) {
        super(
            'invalid-environment',
            `Invalid environment "${env}". Allowed values are: ${allowedEnvs}`,
            { env, allowedEnvs });
    }
}