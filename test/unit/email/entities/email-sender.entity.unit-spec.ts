import { NonEmptyStringVO } from 'src/app/value-objects/non-empty-string.vo'
import { EmailSenderDto } from 'src/email/dtos/email-sender.dto'
import { EmailIssuer } from 'src/email/entities/email-issuer.entity'
import { EmailRecipientList } from 'src/email/entities/email-recipient-list.entity'
import { EmailSender } from 'src/email/entities/email-sender.entity'
import { EmailVO } from 'src/email/value-objects/email.vo'

describe('EmailSender', () => {
  it('should create an EmailSender instance with all fields', () => {
    const fromEmail = 'from@example.com'
    const fromName = 'Sender Name'
    const toEmails = ['to1@example.com', 'to2@example.com']
    const subject = 'Test Subject'
    const html = '<p>Test HTML</p>'
    const ccEmails = ['cc@example.com']
    const bccEmails = ['bcc@example.com']

    const emailSender = EmailSender.create(
      fromEmail,
      fromName,
      toEmails,
      subject,
      html,
      ccEmails,
      bccEmails
    )

    // Verify that the value objects are correctly created.
    expect(emailSender.from).toBeInstanceOf(EmailIssuer)
    expect(emailSender.to).toBeInstanceOf(EmailRecipientList)
    expect(emailSender.subject).toBeInstanceOf(NonEmptyStringVO)
    expect(emailSender.html).toBeInstanceOf(NonEmptyStringVO)
    if (emailSender.cc != null) {
      emailSender.cc.forEach((emailVO) => {
        expect(emailVO).toBeInstanceOf(EmailVO)
      })
    }
    if (emailSender.bcc != null) {
      emailSender.bcc.forEach((emailVO) => {
        expect(emailVO).toBeInstanceOf(EmailVO)
      })
    }
  })

  it('should correctly convert EmailSender to EmailSenderDto', () => {
    const fromEmail = 'from@example.com'
    const fromName = 'Sender Name'
    const toEmails = ['to1@example.com', 'to2@example.com']
    const subject = 'Test Subject'
    const html = '<p>Test HTML</p>'
    const ccEmails = ['cc@example.com']
    const bccEmails = ['bcc@example.com']

    const emailSender = EmailSender.create(
      fromEmail,
      fromName,
      toEmails,
      subject,
      html,
      ccEmails,
      bccEmails
    )

    const dto: EmailSenderDto = emailSender.toDto()

    expect(dto.fromEmail).toBe(fromEmail)
    expect(dto.fromName).toBe(fromName)
    expect(dto.toEmail).toEqual(toEmails)
    expect(dto.subject).toBe(subject)
    expect(dto.html).toBe(html)
    expect(dto.ccEmail).toEqual(ccEmails)
    expect(dto.bccEmail).toEqual(bccEmails)
  })

  it('should correctly handle absence of cc and bcc emails', () => {
    const fromEmail = 'from@example.com'
    const fromName = 'Sender Name'
    const toEmails = ['to@example.com']
    const subject = 'Subject'
    const html = '<p>HTML content</p>'

    const emailSender = EmailSender.create(fromEmail, fromName, toEmails, subject, html)
    const dto: EmailSenderDto = emailSender.toDto()

    expect(dto.fromEmail).toBe(fromEmail)
    expect(dto.fromName).toBe(fromName)
    expect(dto.toEmail).toEqual(toEmails)
    expect(dto.subject).toBe(subject)
    expect(dto.html).toBe(html)
    expect(dto.ccEmail).toBeUndefined()
    expect(dto.bccEmail).toBeUndefined()
  })
})
