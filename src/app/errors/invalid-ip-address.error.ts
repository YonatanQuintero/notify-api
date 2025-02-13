import { HttpStatus } from "@nestjs/common";
import { DomainError } from "../primitives/domain-error";

export class InvalidIPAddressError extends DomainError {
    constructor(ipAddress: string) {
        super(HttpStatus.BAD_REQUEST, `error.invalid-ip-address`, { ipAddress });
    }
}