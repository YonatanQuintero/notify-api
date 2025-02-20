import { TemplateBase } from 'src/template-renderer/entities/template-base.entity'
import { TFATemplate } from 'src/template-renderer/entities/tfa-template.entity'
import { TemplateEntityFactory } from 'src/template-renderer/factories/template-entity.factory'

describe('TemplateEntityFactory', () => {
  describe('createBase', () => {
    it('should create a TemplateBase instance with proper value objects', () => {
      const username = 'testuser'
      const companyName = 'Test Company'
      const companySite = 'https://testcompany.com'
      const companyIconUrl = 'https://testcompany.com/icon.png'

      const result = TemplateEntityFactory.createBase(
        username,
        companyName,
        companySite,
        companyIconUrl
      )

      // Verify that the result is an instance of TemplateBase.
      expect(result).toBeInstanceOf(TemplateBase)

      const obj = result.toObject()
      expect(obj).toEqual({
        username,
        companyName,
        companySite,
        companyIconUrl
      })
    })
  })

  describe('createTFA', () => {
    it('should create a TFATemplate instance with proper value objects and return correct object representation', () => {
      const username = 'testuser'
      const companyName = 'Test Company'
      const companySite = 'https://testcompany.com'
      const companyIconUrl = 'https://testcompany.com/icon.png'
      const code = 123456
      const ttlFormatted = '5 minutes'
      const ipClient = '192.168.1.1'

      const result = TemplateEntityFactory.createTFA(
        username,
        companyName,
        companySite,
        companyIconUrl,
        code,
        ttlFormatted,
        ipClient
      )

      // Verify that the result is an instance of TFATemplate.
      expect(result).toBeInstanceOf(TFATemplate)

      // TFATemplate has a toObject() method that returns the underlying values.
      const obj = result.toObject()
      expect(obj).toEqual({
        username,
        companyName,
        companySite,
        companyIconUrl,
        code,
        ttlFormatted,
        ipClient
      })
    })
  })
})
