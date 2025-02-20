import { ApiKeyVO } from 'src/config/value-objects/api-key.vo'
import { EnvironmentVO } from 'src/config/value-objects/environment.vo'
import { LanguageVO } from 'src/config/value-objects/language.vo'
import { PortVO } from 'src/config/value-objects/port.vo'

export class AppConfig {
  private constructor (
    public readonly port: PortVO,
    public readonly apiKey: ApiKeyVO,
    public readonly environment: EnvironmentVO,
    public readonly defaultLang: LanguageVO
  ) {
  }

  static create (
    port: number,
    apiKey: string | undefined,
    environment: string | undefined,
    defaultLang: string | undefined
  ): AppConfig {
    return new AppConfig(
      PortVO.create(port),
      ApiKeyVO.create(apiKey),
      EnvironmentVO.create(environment),
      LanguageVO.create(defaultLang)
    )
  }
}
