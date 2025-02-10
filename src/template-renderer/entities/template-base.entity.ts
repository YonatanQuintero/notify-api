import { NonEmptyStringVO } from "src/common/value-objects/non-empty-string.vo";
import { UrlVO } from "src/common/value-objects/url.vo";

export class TemplateBase {
    public constructor(
        protected readonly username: NonEmptyStringVO,
        protected readonly companyName: NonEmptyStringVO,
        protected readonly companySite: UrlVO,
        protected readonly companyIconUrl: UrlVO
    ) { }

    toObject(): Record<string, string> {
        return {
            username: this.username.getValue(),
            companyName: this.companyName.getValue(),
            companySite: this.companySite.getValue(),
            companyIconUrl: this.companyIconUrl.getValue()
        };
    }
}