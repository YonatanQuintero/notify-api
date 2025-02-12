export abstract class DomainError extends Error {
    constructor(public readonly code: string, message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}  