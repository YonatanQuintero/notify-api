import { InvalidEmailRecipientListError } from '../errors/invalid-email-recipient-list.error'
import { EmailVO } from '../value-objects/email.vo'

export class EmailRecipientList {
  private constructor (
    public readonly emails: EmailVO[]
  ) { }

  static create (rawEmails: string[]): EmailRecipientList {
    if (!rawEmails || rawEmails.length === 0) {
      throw new InvalidEmailRecipientListError()
    }
    return new EmailRecipientList(
      rawEmails.map(email => EmailVO.create(email))
    )
  }

  getValues (): string[] {
    return this.emails.map(email => email.getValue())
  }
}
