import { PortVO } from '../value-objects/port.vo';
import { ApiKeyVO } from '../value-objects/api-key.vo';
import { EnvironmentVO } from '../value-objects/environment.vo';
import { LanguageVO } from '../value-objects/language.vo';
import { NonEmptyStringVO } from '../value-objects/non-empty-string.vo';
import { UrlVO } from '../value-objects/url.vo';
import { ValueObject } from '../primitives/value-object';

export class AppConfig extends ValueObject {
  constructor(
    public readonly port: PortVO,
    public readonly apiKey: ApiKeyVO,
    public readonly environment: EnvironmentVO,
    public readonly defaultLang: LanguageVO,
    public readonly smptHost: NonEmptyStringVO,
    public readonly smptPort: PortVO,
    public readonly smptUser: NonEmptyStringVO,
    public readonly smptPass: NonEmptyStringVO,
    public readonly companyName: NonEmptyStringVO,
    public readonly companyIconUrl: UrlVO,
    public readonly companyWebsiteUrl: UrlVO,
    public readonly companyAddress: NonEmptyStringVO
  ) {
    super();
  }

  static create(
    port: number,
    apiKey: string,
    environment: string,
    defaultLang: string,
    smptHost: string,
    smptPort: number,
    smptUser: string,
    smptPass: string,
    companyName: string,
    companyIconUrl: string,
    companyWebsiteUrl: string,
    companyAddress: string,
  ): AppConfig {
    return new AppConfig(
      PortVO.create(port),
      ApiKeyVO.create(apiKey),
      EnvironmentVO.create(environment),
      LanguageVO.create(defaultLang),
      NonEmptyStringVO.create(smptHost),
      PortVO.create(smptPort),
      NonEmptyStringVO.create(smptUser),
      NonEmptyStringVO.create(smptPass),
      NonEmptyStringVO.create(companyName),
      UrlVO.create(companyIconUrl),
      UrlVO.create(companyWebsiteUrl),
      NonEmptyStringVO.create(companyAddress),
    );
  }
}