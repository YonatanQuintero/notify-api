export abstract class DomainError extends Error {

    constructor(readonly code: string, readonly message: string, readonly args?: Record<string, any>) {
        super(message);
        this.name = this.constructor.name;
    }
}  