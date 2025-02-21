import { NonEmptyStringVO } from 'src/app/value-objects/non-empty-string.vo'
import { UrlVO } from 'src/app/value-objects/url.vo'

export class CompanyConfig {
  private constructor (
    public readonly name: NonEmptyStringVO,
    public readonly iconUrl: UrlVO,
    public readonly websiteUrl: UrlVO,
    public readonly address: NonEmptyStringVO
  ) {
  }

  static create (
    name: string | undefined,
    iconUrl: string | undefined,
    websiteUrl: string | undefined,
    address: string | undefined
  ): CompanyConfig {
    return new CompanyConfig(
      NonEmptyStringVO.create(name),
      UrlVO.create(iconUrl),
      UrlVO.create(websiteUrl),
      NonEmptyStringVO.create(address)
    )
  }
}
