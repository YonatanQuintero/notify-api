import { InvalidIPAddressError } from "src/app/errors/invalid-ip-address.error";
import { ValueRequiredError } from "src/app/errors/value-required.error";
import { IPAddressVO } from "src/app/value-objects/ip-address.vo";

describe('IPAddressVO', () => {
    it('should create a valid IPv4 IPAddressVO', () => {
        const ip = '192.168.1.1';
        const vo = IPAddressVO.create(ip);
        expect(vo).toBeInstanceOf(IPAddressVO);
        expect(vo.getValue()).toBe(ip);
    });

    it('should create a valid IPv6 IPAddressVO', () => {
        const ip = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
        const vo = IPAddressVO.create(ip);
        expect(vo).toBeInstanceOf(IPAddressVO);
        expect(vo.getValue()).toBe(ip);
    });

    it('should create a valid IPv4 addressVO for 127.0.0.1', () => {
        const ip = '127.0.0.1';
        const vo = IPAddressVO.create(ip);
        expect(vo).toBeInstanceOf(IPAddressVO);
        expect(vo.getValue()).toBe(ip);
    });

    it('should create a valid IPv6 addressVO for ::1', () => {
        const ip = '::1';
        const vo = IPAddressVO.create(ip);
        expect(vo).toBeInstanceOf(IPAddressVO);
        expect(vo.getValue()).toBe(ip);
    });

    it('should trim the IP address before creating the instance', () => {
        const ip = ' 192.168.1.1 ';
        const vo = IPAddressVO.create(ip);
        expect(vo.getValue()).toBe('192.168.1.1');
    });

    it('should throw ValueRequiredError if ipAddress is undefined', () => {
        expect(() => {
            IPAddressVO.create(undefined);
        }).toThrow(ValueRequiredError);
    });

    it('should throw ValueRequiredError if ipAddress is an empty string', () => {
        expect(() => {
            IPAddressVO.create('');
        }).toThrow(ValueRequiredError);
    });

    it('should throw InvalidIPAddressError for an invalid IP address', () => {
        const invalidIp = 'invalid-ip';
        expect(() => {
            IPAddressVO.create(invalidIp);
        }).toThrow(InvalidIPAddressError);
    });
});
