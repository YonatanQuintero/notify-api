import { DomainError } from "../primitives/domain-error";

export class InvalidIPAddressError extends DomainError {
    constructor(ipAddress: string) {
        super('invalid-ip-address', `Invalid IP Address "${ipAddress}"`, { ipAddress });
    }
}