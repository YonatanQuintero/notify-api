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
        const normalizedIpAddress = ipAddress.trim().toLowerCase();
        if (!net.isIPv4(normalizedIpAddress) && !net.isIPv6(normalizedIpAddress)) {
            throw new InvalidIPAddressError(ipAddress);
        }

        return new IPAddressVO(normalizedIpAddress);
    }

    getValue(): string {
        return this.value;
    }
}