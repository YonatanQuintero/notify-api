import { NonEmptyStringVO } from 'src/app/value-objects/non-empty-string.vo'
import { TemplateBase } from '../entities/template-base.entity'
import { TFATemplate } from '../entities/tfa-template.entity'
import { TFACodeVO } from '../value-objects/tfa-code.vo'
import { IPAddressVO } from 'src/app/value-objects/ip-address.vo'
import { UrlVO } from 'src/app/value-objects/url.vo'

export const createBase = (
  username: string,
  companyName: string,
  companySite: string,
  companyIconUrl: string
): TemplateBase =>
  new TemplateBase(
    NonEmptyStringVO.create(username),
    NonEmptyStringVO.create(companyName),
    UrlVO.create(companySite),
    UrlVO.create(companyIconUrl)
  )

export const createTFA = (
  username: string,
  companyName: string,
  companySite: string,
  companyIconUrl: string,
  code: number,
  ttlFormatted: string,
  ipClient: string
): TFATemplate =>
  new TFATemplate(
    NonEmptyStringVO.create(username),
    NonEmptyStringVO.create(companyName),
    UrlVO.create(companySite),
    UrlVO.create(companyIconUrl),
    TFACodeVO.create(code),
    NonEmptyStringVO.create(ttlFormatted),
    IPAddressVO.create(ipClient)
  )