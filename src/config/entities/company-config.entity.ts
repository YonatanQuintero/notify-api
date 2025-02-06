import { NonEmptyStringVO } from "src/common/value-objects/non-empty-string.vo";
import { UrlVO } from "src/common/value-objects/url.vo";

export class CompanyConfig {
    private constructor(
        public readonly name: NonEmptyStringVO,
        public readonly iconUrl: UrlVO,
        public readonly websiteUrl: UrlVO,
        public readonly address: NonEmptyStringVO
    ) {
    }

    static create(
        name: string,
        iconUrl: string,
        websiteUrl: string,
        address: string
    ): CompanyConfig {
        return new CompanyConfig(
            NonEmptyStringVO.create(name),
            UrlVO.create(iconUrl),
            UrlVO.create(websiteUrl),
            NonEmptyStringVO.create(address)
        );
    }
}