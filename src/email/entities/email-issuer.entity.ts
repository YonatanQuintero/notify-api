import { NonEmptyStringVO } from "src/common/value-objects/non-empty-string.vo";
import { EmailVO } from "../value-objects/email.vo";

export class EmailIssuer {
    private constructor(
        public readonly email: EmailVO,
        public readonly issuer: NonEmptyStringVO,
    ) { }

    static create(email: string, issuer: string): EmailIssuer {
        return new EmailIssuer(
            EmailVO.create(email),
            NonEmptyStringVO.create(issuer)
        );
    }
}