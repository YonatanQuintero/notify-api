import { HttpStatus, INestApplication } from '@nestjs/common'
import { bootstrapAppTest } from 'test/e2e/helpers/bootstrap-app-test.helper'
import * as request from 'supertest'
import { NodeMailerTransporterStubService } from 'test/e2e/helpers/services/node-mailer-transporter-stub.service.helper'
import { LanguageEnum } from 'src/config/enums/language.enum'
import { EmailBaseDto } from 'src/notification/dtos/email-base.dto'
import { TfaEmailDto } from 'src/notification/dtos/tfa-email.dto'
import { NotificationNameEnum } from 'src/notification/enums/notification-name.enum'

describe('EmailNotificationController E2E Tests', () => {
  const apiKey = 'a'.repeat(64)
  const baseUrl = '/api/v1/notifications/email'
  const baseDto: EmailBaseDto = {
    username: 'Yonax73',
    to: ['yonax73@gmail.com']
  }

  let app: INestApplication
  let transporterStub: NodeMailerTransporterStubService

  beforeAll(async () => {
    transporterStub = new NodeMailerTransporterStubService()
    app = await bootstrapAppTest([], transporterStub)
  })

  afterAll(async () => {
    await app.close()
  })

  // Clear sentEmails before each test to ensure a clean slate.
  beforeEach(() => {
    transporterStub.sentEmails = []
  })

  const commonNotifications = [
    NotificationNameEnum.WELCOME,
    NotificationNameEnum.RECOVER_PASSWORD_SUCCESS,
    NotificationNameEnum.UPDATE_EMAIL,
    NotificationNameEnum.UPDATE_PASSWORD
  ]
  const languages = Object.values(LanguageEnum)

  describe('Common Email Notifications', () => {
    commonNotifications.forEach(notification => {
      languages.forEach(lang => {
        it(`should send ${notification} email successfully in ${lang}`, async () => {
          const url = `${baseUrl}/${notification}`
          const dto: EmailBaseDto = {
            ...baseDto,
            cc: ['cc@example.com'],
            bcc: ['bcc@example.com']
          }

          // add extra to
          dto.to.push('extra@example.com')

          await request(app.getHttpServer())
            .post(url)
            .set('x-api-key', apiKey)
            .set('x-language', lang)
            .send(dto)
            .expect(HttpStatus.OK)
            .expect(res => {
              expect(typeof res.text).toBe('string')
            })

          // Immediately check that an email was captured by the stub.
          expect(transporterStub.sentEmails.length).toBeGreaterThan(0)
          const sentEmail = transporterStub.sentEmails[transporterStub.sentEmails.length - 1]
          expect(sentEmail.mailOptions.from).toMatchObject({
            address: expect.any(String),
            name: expect.any(String)
          })
          expect(sentEmail.mailOptions.to).toContain(dto.to[0])
          expect(sentEmail.mailOptions.subject).toBeDefined()
          expect(sentEmail.mailOptions.html).toBeDefined()
          expect(sentEmail.mailOptions.cc).toContain(dto.cc?.[0])
          expect(sentEmail.mailOptions.bcc).toContain(dto.bcc?.[0])
          // Verify that the email's HTML contains a language marker matching the header.
          expect(sentEmail.mailOptions.html).toContain(`lang="${lang}"`)
        })
      })
    })
  })

  describe('TFA Email Notification', () => {
    languages.forEach(lang => {
      it(`should send TFA email successfully in ${lang}`, async () => {
        const url = `${baseUrl}/tfa`
        const dto: TfaEmailDto = {
          ...baseDto,
          code: 123456,
          ttlFormatted: '1 minute'
        }

        await request(app.getHttpServer())
          .post(url)
          .set('x-api-key', apiKey)
          .set('x-language', lang)
          .send(dto)
          .expect(HttpStatus.OK)
          .expect(res => {
            expect(typeof res.text).toBe('string')
          })

        // Immediately check that an email was captured by the stub.
        expect(transporterStub.sentEmails.length).toBeGreaterThan(0)
        const sentEmail = transporterStub.sentEmails[transporterStub.sentEmails.length - 1]
        expect(sentEmail.mailOptions.from).toMatchObject({
          address: expect.any(String),
          name: expect.any(String)
        })
        expect(sentEmail.mailOptions.to).toContain(dto.to[0])
        expect(sentEmail.mailOptions.subject).toBeDefined()
        expect(sentEmail.mailOptions.html).toBeDefined()
        // Verify that the email's HTML contains a language marker matching the header.
        expect(sentEmail.mailOptions.html).toContain(`lang="${lang}"`)
      })
    })
  })

  describe('Error Handling', () => {
    it('should return 401 if x-api-key is missing', async () => {
      const url = `${baseUrl}/welcome`
      const dto: EmailBaseDto = {
        ...baseDto
      }

      await request(app.getHttpServer())
        .post(url)
        .send(dto)
        .expect(HttpStatus.UNAUTHORIZED)
    })

    it('should return 400 if to is missing', async () => {
      const url = `${baseUrl}/welcome`
      const dto = {
        username: 'Yonax73'
      }

      await request(app.getHttpServer())
        .post(url)
        .set('x-api-key', apiKey)
        .send(dto)
        .expect(HttpStatus.BAD_REQUEST)
    })

    it('should return 400 if to is a invalid email', async () => {
      const url = `${baseUrl}/welcome`
      const dto = baseDto
      dto.to.push('invalid-email')

      await request(app.getHttpServer())
        .post(url)
        .set('x-api-key', apiKey)
        .send(dto)
        .expect(HttpStatus.BAD_REQUEST)
    })

    it('should return 400 if username is missing', async () => {
      const url = `${baseUrl}/welcome`
      const dto = {
        to: ['yonax73@gmail.com']
      }

      await request(app.getHttpServer())
        .post(url)
        .set('x-api-key', apiKey)
        .send(dto)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })
})
