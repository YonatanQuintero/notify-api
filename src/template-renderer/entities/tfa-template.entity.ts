import { NonEmptyStringVO } from "src/app/value-objects/non-empty-string.vo";
import { TemplateBase } from "./template-base.entity";
import { TFACodeVO } from "../value-objects/tfa-code.vo";
import { IPAddressVO } from "src/app/value-objects/ip-address.vo";
import { UrlVO } from "src/app/value-objects/url.vo";

export class TFATemplate extends TemplateBase {

    public constructor(
        protected readonly username: NonEmptyStringVO,
        protected readonly companyName: NonEmptyStringVO,
        protected readonly companySite: UrlVO,
        protected readonly companyIconUrl: UrlVO,
        protected readonly code: TFACodeVO,
        protected readonly ttlFormatted: NonEmptyStringVO,
        protected readonly ipClient: IPAddressVO,
    ) {
        super(username, companyName, companySite, companyIconUrl);
    }


    toObject(): Record<string, any> {
        return {
            username: this.username.getValue(),
            companyName: this.companyName.getValue(),
            companySite: this.companySite.getValue(),
            companyIconUrl: this.companyIconUrl.getValue(),
            code: this.code.getValue(),
            ttlFormatted: this.ttlFormatted.getValue(),
            ipClient: this.ipClient.getValue(),
        };
    }
}
