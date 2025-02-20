import { PortVO } from '../../../../src/config/value-objects/port.vo'
import { ApiKeyVO } from '../../../../src/config/value-objects/api-key.vo'
import { EnvironmentEnum } from '../../../../src/config/enums/environment.enum'
import { LanguageEnum } from '../../../../src/config/enums/language.enum'
import { InvalidPortError } from 'src/config/errors/invalid-port.error'
import { InvalidApiKeyError } from 'src/config/errors/invalid-api-key.error'
import { InvalidEnvironmentError } from 'src/config/errors/invalid-environment.error'
import { InvalidLanguageError } from 'src/config/errors/invalid-language.error'
import { AppConfig } from 'src/config/entities/app-config.entity'

describe('AppConfig', () => {
  const validData = {
    port: 3000,
    apiKey: 'a'.repeat(64), // Minimum valid API key length
    environment: EnvironmentEnum.PRODUCTION,
    defaultLang: LanguageEnum.EN
  }

  it('should create an AppConfig instance with valid data', () => {
    const appConfig = AppConfig.create(
      validData.port,
      validData.apiKey,
      validData.environment,
      validData.defaultLang
    )

    expect(appConfig).toBeInstanceOf(AppConfig)
    expect(appConfig.port).toBeInstanceOf(PortVO)
    expect(appConfig.apiKey).toBeInstanceOf(ApiKeyVO)
    expect(appConfig.environment.getValue()).toBe(EnvironmentEnum.PRODUCTION)
    expect(appConfig.defaultLang.getValue()).toBe(LanguageEnum.EN)
  })

  it('should throw an error if any required value is invalid (invalid port)', () => {
    expect(() =>
      AppConfig.create(
        0, // Invalid port
        validData.apiKey,
        validData.environment,
        validData.defaultLang
      )
    ).toThrow(InvalidPortError)
  })

  it('should throw an error if the API key is invalid (too short)', () => {
    expect(() =>
      AppConfig.create(
        validData.port,
        'short-api-key', // Invalid API key
        validData.environment,
        validData.defaultLang
      )
    ).toThrow(InvalidApiKeyError)
  })

  it('should throw an error if the environment is invalid', () => {
    expect(() =>
      AppConfig.create(
        validData.port,
        validData.apiKey,
        'invalid-environment', // Invalid environment
        validData.defaultLang
      )
    ).toThrow(InvalidEnvironmentError)
  })

  it('should throw an error if the default language is invalid', () => {
    expect(() =>
      AppConfig.create(
        validData.port,
        validData.apiKey,
        validData.environment,
        'invalid-language' // Invalid language
      )
    ).toThrow(InvalidLanguageError)
  })
})
