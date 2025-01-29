import { EmailVO } from "../value-objects/email.vo";
import { NonEmptyStringVO } from "src/common/value-objects/non-empty-string.vo";

export class EmailAddress {
    private constructor(
        public readonly email: EmailVO,
        public readonly name: NonEmptyStringVO) {
    }

    static create(email: string, name: string): EmailAddress {
        return new EmailAddress(EmailVO.create(email), NonEmptyStringVO.create(name));
    }
}