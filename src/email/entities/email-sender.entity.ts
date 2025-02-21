import { EmailIssuer } from './email-issuer.entity'
import { EmailRecipientList } from './email-recipient-list.entity'
import { EmailVO } from '../value-objects/email.vo'
import { EmailSenderDto } from '../dtos/email-sender.dto'
import { NonEmptyStringVO } from 'src/app/value-objects/non-empty-string.vo'

export class EmailSender {
  private constructor (
    public readonly from: EmailIssuer,
    public readonly to: EmailRecipientList,
    public readonly subject: NonEmptyStringVO,
    public readonly html: NonEmptyStringVO,
    public readonly cc?: EmailVO[],
    public readonly bcc?: EmailVO[]
  ) {
  }

  static create (
    fromEmail: string,
    fromName: string,
    toEmail: string[],
    subject: string,
    html: string,
    ccEmail?: string[],
    bccEmail?: string[]
  ): EmailSender {
    return new EmailSender(
      EmailIssuer.create(fromEmail, fromName),
      EmailRecipientList.create(toEmail),
      NonEmptyStringVO.create(subject),
      NonEmptyStringVO.create(html),
      ccEmail?.map((email) => EmailVO.create(email)),
      bccEmail?.map((email) => EmailVO.create(email))
    )
  }

  public toDto (): EmailSenderDto {
    return new EmailSenderDto(
      this.from.email.getValue(),
      this.from.issuer.getValue(),
      this.to.getValues(),
      this.subject.getValue(),
      this.html.getValue(),
      this.cc?.map((email) => email.getValue()),
      this.bcc?.map((email) => email.getValue())
    )
  }
}
