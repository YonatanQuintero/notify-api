export class EmailSenderDto {
  constructor (
    readonly fromEmail: string,
    readonly fromName: string,
    readonly toEmail: string[],
    readonly subject: string,
    readonly html: string,
    readonly ccEmail?: string[],
    readonly bccEmail?: string[]
  ) { }
}
