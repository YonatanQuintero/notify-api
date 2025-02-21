import { EmailRecipientList } from 'src/email/entities/email-recipient-list.entity'
import { InvalidEmailRecipientListError } from 'src/email/errors/invalid-email-recipient-list.error'
import { InvalidEmailError } from 'src/email/errors/invalid-email.error'

describe('EmailRecipientList', () => {
  it('should create an EmailRecipientList with valid emails', () => {
    const emails = ['test1@example.com', 'test2@example.com']
    const recipientList = EmailRecipientList.create(emails)
    expect(recipientList).toBeInstanceOf(EmailRecipientList)
    expect(recipientList.emails.length).toBe(emails.length)
    expect(recipientList.getValues()).toEqual(emails)
  })

  it('should throw InvalidEmailRecipientListError when provided an empty array', () => {
    expect(() => {
      EmailRecipientList.create([])
    }).toThrow(InvalidEmailRecipientListError)
  })

  it('should throw InvalidEmailRecipientListError when rawEmails is undefined', () => {
    expect(() => {
      EmailRecipientList.create(undefined)
    }).toThrow(InvalidEmailRecipientListError)
  })

  it('should throw an error if any email in the list is invalid', () => {
    const emails = ['test1@example.com', 'invalid-email']
    expect(() => {
      EmailRecipientList.create(emails)
    }).toThrow(InvalidEmailError)
  })
})
