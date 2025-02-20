import { NonEmptyStringError } from 'src/app/errors/non-empty-string.error'
import { InvalidUrlError } from 'src/app/errors/invalid-url.error'
import { CompanyConfig } from 'src/config/entities/company-config.entity'
import { UrlVO } from 'src/app/value-objects/url.vo'
import { NonEmptyStringVO } from 'src/app/value-objects/non-empty-string.vo'

describe('CompanyConfig', () => {
  const validData = {
    name: 'Example Company',
    iconUrl: 'https://example.com/icon.png',
    websiteUrl: 'https://example.com',
    address: '123 Example Street'
  }

  it('should create an CompanyConfig instance with valid data', () => {
    const companyConfig = CompanyConfig.create(
      validData.name,
      validData.iconUrl,
      validData.websiteUrl,
      validData.address
    )

    expect(companyConfig).toBeInstanceOf(CompanyConfig)
    expect(companyConfig.name).toBeInstanceOf(NonEmptyStringVO)
    expect(companyConfig.iconUrl).toBeInstanceOf(UrlVO)
    expect(companyConfig.websiteUrl.getValue()).toBe(validData.websiteUrl)
    expect(companyConfig.address.getValue()).toBe(validData.address)
  })

  it('should throw an error if the company name is empty', () => {
    expect(() =>
      CompanyConfig.create(
        '', // Empty company name
        validData.iconUrl,
        validData.websiteUrl,
        validData.address
      )
    ).toThrow(NonEmptyStringError)
  })

  it('should throw an error if the company icon URL is invalid', () => {
    expect(() =>
      CompanyConfig.create(
        validData.name,
        'invalid-url', // Invalid URL
        validData.websiteUrl,
        validData.address
      )
    ).toThrow(InvalidUrlError)
  })

  it('should throw an error if the company website URL is invalid', () => {
    expect(() =>
      CompanyConfig.create(
        validData.name,
        validData.iconUrl,
        'invalid-url', // Invalid URL
        validData.address
      )
    ).toThrow(InvalidUrlError)
  })

  it('should throw an error if the company address is empty', () => {
    expect(() =>
      CompanyConfig.create(
        validData.name,
        validData.iconUrl,
        validData.websiteUrl,
        '' // Empty company address
      )
    ).toThrow(NonEmptyStringError)
  })
})
