import * as request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { bootstrapAppTest } from 'test/e2e/helpers/bootstrap-app-test.helper'
import { LanguageEnum } from 'src/config/enums/language.enum'
import { TemplateNameEnum } from 'src/template-renderer/enum/template-name.enum'

describe('TemplateViewController E2E', () => {
  const apiKey = 'a'.repeat(64)
  const baseUrl = '/api/v1/templates/viewer'

  let app: INestApplication

  beforeAll(async () => {
    app = await bootstrapAppTest([])
  })

  afterAll(async () => {
    await app.close()
  })

  const commonTemplates = [
    TemplateNameEnum.WELCOME,
    TemplateNameEnum.RECOVER_PASSWORD_SUCCESS,
    TemplateNameEnum.UPDATE_EMAIL,
    TemplateNameEnum.UPDATE_PASSWORD
  ]
  const languages = Object.values(LanguageEnum)

  describe('Common Templates Viewer', () => {
    const username = 'yonax73'
    commonTemplates.forEach(template => {
      languages.forEach(lang => {
        it(`should return the ${template} template successfully in ${lang}`, async () => {
          const url = `${baseUrl}/${template}?username=${username}`
          const response = await request(app.getHttpServer())
            .get(url)
            .set('x-api-key', apiKey)
            .set('x-language', lang)
            .expect(HttpStatus.OK)

          const html = response.text

          expect(html).toContain(`lang="${lang}"`)
          expect(html).toContain(`template-name="${template}"`)
          expect(html).toContain(username)
        })
      })
    })
  })

  describe('TFA Template Viewer', () => {
    languages.forEach(lang => {
      it(`should return the TFA template successfully in ${lang}`, async () => {
        const username = 'yonax73'
        const code = 123456
        const ttlFormatted = '5 minutes'
        const url = `${baseUrl}/tfa?username=${username}&code=${code}&ttlFormatted=${ttlFormatted}`
        const response = await request(app.getHttpServer())
          .get(url)
          .set('x-api-key', apiKey)
          .set('x-language', lang)
          .expect(HttpStatus.OK)

        const html = response.text

        expect(html).toContain(`lang="${lang}"`)
        expect(html).toContain(`template-name="${TemplateNameEnum.TFA}"`)
        expect(html).toContain(username)
        expect(html).toContain(code.toString())
        expect(html).toContain(ttlFormatted)
      })
    })
  })

  describe('Error Handling', () => {
    it('should return 401 x-api-key is invalid', async () => {
      const url = `${baseUrl}/welcome`
      await request(app.getHttpServer())
        .get(url)
        .set('x-api-key', 'x'.repeat(64))
        .expect(HttpStatus.UNAUTHORIZED)
    })

    it('should return 401 if x-api-key is missing', async () => {
      const url = `${baseUrl}/welcome`
      await request(app.getHttpServer())
        .get(url)
        .expect(HttpStatus.UNAUTHORIZED)
    })

    it('should return 400 if username is missing', async () => {
      const url = `${baseUrl}/welcome`
      await request(app.getHttpServer())
        .get(url)
        .set('x-api-key', apiKey)
        .set('x-language', LanguageEnum.EN)
        .expect(HttpStatus.BAD_REQUEST)
    })

    it('should return 400 if code is missing', async () => {
      const url = `${baseUrl}/tfa?username=yonax73&ttlFormatted=5 minutes`
      await request(app.getHttpServer())
        .get(url)
        .set('x-api-key', apiKey)
        .set('x-language', LanguageEnum.EN)
        .expect(HttpStatus.BAD_REQUEST)
    })

    it('should return 400 if code is invalid', async () => {
      const url = `${baseUrl}/tfa?username=yonax73&code=invalid-code&ttlFormatted=5 minutes`
      await request(app.getHttpServer())
        .get(url)
        .set('x-api-key', apiKey)
        .set('x-language', LanguageEnum.EN)
        .expect(HttpStatus.BAD_REQUEST)
    })

    it('should return 400 if ttlFormatted is missing', async () => {
      const url = `${baseUrl}/tfa?username=yonax73&code=123456`
      await request(app.getHttpServer())
        .get(url)
        .set('x-api-key', apiKey)
        .set('x-language', LanguageEnum.EN)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })
})
