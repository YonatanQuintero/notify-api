import { NonEmptyStringVO } from 'src/app/value-objects/non-empty-string.vo'
import { UrlVO } from 'src/app/value-objects/url.vo'
import { IPAddressVO } from 'src/app/value-objects/ip-address.vo'
import { TFACodeVO } from 'src/template-renderer/value-objects/tfa-code.vo'
import { TFATemplate } from 'src/template-renderer/entities/tfa-template.entity'

describe('TFATemplate', () => {
  it('should return an object with correct values', () => {
    const username = NonEmptyStringVO.create('testuser')
    const companyName = NonEmptyStringVO.create('Test Company')
    const companySite = UrlVO.create('https://testcompany.com')
    const companyIconUrl = UrlVO.create('https://testcompany.com/icon.png')
    const code = TFACodeVO.create(123456)
    const ttlFormatted = NonEmptyStringVO.create('5 minutes')
    const ipClient = IPAddressVO.create('192.168.1.1')

    // Act: instantiate TFATemplate and call toObject()
    const tfaTemplate = new TFATemplate(
      username,
      companyName,
      companySite,
      companyIconUrl,
      code,
      ttlFormatted,
      ipClient
    )

    const result = tfaTemplate.toObject()

    // Assert: Verify the returned object contains the expected values.
    expect(result).toEqual({
      username: 'testuser',
      companyName: 'Test Company',
      companySite: 'https://testcompany.com',
      companyIconUrl: 'https://testcompany.com/icon.png',
      code: 123456,
      ttlFormatted: '5 minutes',
      ipClient: '192.168.1.1'
    })
  })
})
