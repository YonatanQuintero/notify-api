import { ValueRequiredError } from 'src/app/errors/value-required.error'
import { LanguageEnum } from 'src/config/enums/language.enum'
import { InvalidLanguageError } from 'src/config/errors/invalid-language.error'
import { TemplateRenderer } from 'src/template-renderer/entities/template-renderer.entity'
import { TemplateBase } from 'src/template-renderer/entities/template-base.entity'
import { InvalidTemplateBaseError } from 'src/template-renderer/errors/invalid-template-base.error'
import { TemplateNameEnum } from 'src/template-renderer/enum/template-name.enum'
import { InvalidTemplateNameError } from 'src/template-renderer/errors/invalid-template-name.error'
import { createBase } from 'src/template-renderer/factories/template-entity.factory'

describe('TemplateRenderer', () => {
  let params: TemplateBase

  beforeEach(() => {
    params = createBase(
      'JohnDoe',
      'Company Inc.',
      'https://example.com',
      'https://example.com/logo.png'
    )
  })

  it('should create a TemplateRenderer with valid string name and language', () => {
    const renderer = TemplateRenderer.create(
      'welcome', // valid string in TemplateNameEnum
      'en', // valid string in LanguageEnum
      params
    )

    expect(renderer).toBeInstanceOf(TemplateRenderer)
    expect(renderer.name.getValue()).toBe(TemplateNameEnum.WELCOME)
    expect(renderer.language.getValue()).toBe(LanguageEnum.EN)
    expect(renderer.params).toEqual(params.toObject())
  })

  it('should create a TemplateRenderer with enum values for name and language', () => {
    const renderer = TemplateRenderer.create(
      TemplateNameEnum.RECOVER_PASSWORD_SUCCESS, // direct enum
      LanguageEnum.ES, // direct enum
      params
    )

    expect(renderer).toBeInstanceOf(TemplateRenderer)
    expect(renderer.name.getValue()).toBe(TemplateNameEnum.RECOVER_PASSWORD_SUCCESS)
    expect(renderer.language.getValue()).toBe(LanguageEnum.ES)
  })

  it('should throw ValueRequiredError if name is missing', () => {
    expect(() =>
      TemplateRenderer.create(undefined as any, LanguageEnum.EN, params)
    ).toThrow(ValueRequiredError)
  })

  it('should throw ValueRequiredError if language is missing', () => {
    expect(() =>
      TemplateRenderer.create(TemplateNameEnum.WELCOME, undefined as any, params)
    ).toThrow(ValueRequiredError)
  })

  it('should throw InvalidTemplateNameError if name is invalid', () => {
    expect(() =>
      TemplateRenderer.create('INVALID_NAME', LanguageEnum.EN, params)
    ).toThrow(InvalidTemplateNameError)
  })

  it('should throw an error if language is invalid', () => {
    expect(() =>
      TemplateRenderer.create(TemplateNameEnum.WELCOME, 'invalid-lang', params)
    ).toThrow(InvalidLanguageError)
  })

  it('should throw InvalidTemplateBase if params are undefined', () => {
    expect(() =>
      TemplateRenderer.create(TemplateNameEnum.WELCOME, LanguageEnum.EN, undefined as any)
    ).toThrow(InvalidTemplateBaseError)
  })
})
