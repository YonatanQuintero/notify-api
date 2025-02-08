import { DomainError } from "../primitives/domain-error";

export class InvalidIPAddressError extends DomainError {
    constructor(ipAddress: string) {
        super('INVALID_IP_ADDRESS', `Invalid IP Address "${ipAddress}".`);
    }
}