import { DomainError } from '../../app/primitives/domain-error';

export class InvalidPortError extends DomainError {
    constructor(port: number) {
        super('INVALID_PORT', `Invalid port number ${port}. Must be between 1 and 65535.`);
    }
}
