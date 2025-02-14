import { DomainError } from '../../app/primitives/domain-error';

export class InvalidPortError extends DomainError {
    constructor(port: number) {
        super('invalid-port', `Invalid port number "${port}". Must be between 1 and 65535`, { port });
    }
}
