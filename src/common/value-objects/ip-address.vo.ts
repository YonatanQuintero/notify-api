import * as net from 'net';
import { ValueRequiredError } from "../errors/value-required.error";
import { ValueObject } from '../primitives/value-object';
import { InvalidIPAddressError } from '../errors/invalid-ip-address.error';

export class IPAddressVO extends ValueObject {
    private constructor(private readonly value: string) {
        super();
    }

    static create(ipAddress?: string): IPAddressVO {
        if (!ipAddress) {
            throw new ValueRequiredError('IP Address');
        }
        const trimmedIpAddress = ipAddress.trim();
        if (!net.isIPv4(trimmedIpAddress) && !net.isIPv6(trimmedIpAddress)) {
            throw new InvalidIPAddressError(ipAddress);
        }

        return new IPAddressVO(trimmedIpAddress);
    }

    getValue(): string {
        return this.value;
    }
}