import { NonEmptyStringVO } from "src/common/value-objects/non-empty-string.vo";
import { PortVO } from "../value-objects/port.vo";

export class SmtpConfig {
    private constructor(
        public readonly host: NonEmptyStringVO,
        public readonly port: PortVO,
        public readonly user: NonEmptyStringVO,
        public readonly pass: NonEmptyStringVO
    ) {
    }

    static create(
        host: string,
        port: number,
        user: string,
        pass: string): SmtpConfig {
        return new SmtpConfig(
            NonEmptyStringVO.create(host),
            PortVO.create(port),
            NonEmptyStringVO.create(user),
            NonEmptyStringVO.create(pass)
        );
    }
}