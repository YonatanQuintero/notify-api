export abstract class DomainError extends Error {

    constructor(readonly code: number, readonly message: string, readonly args?: Record<string, any>) {
        super(message);
        this.name = this.constructor.name;
    }
}  