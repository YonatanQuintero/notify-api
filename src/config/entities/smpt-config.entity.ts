import { NonEmptyStringVO } from 'src/app/value-objects/non-empty-string.vo'
import { PortVO } from '../value-objects/port.vo'

export class SmtpConfig {
  private constructor (
    public readonly host: NonEmptyStringVO,
    public readonly port: PortVO,
    public readonly user: NonEmptyStringVO,
    public readonly pass: NonEmptyStringVO
  ) {
  }

  static create (
    host: string | undefined,
    port: number,
    user: string | undefined,
    pass: string | undefined
  ): SmtpConfig {
    return new SmtpConfig(
      NonEmptyStringVO.create(host),
      PortVO.create(port),
      NonEmptyStringVO.create(user),
      NonEmptyStringVO.create(pass)
    )
  }
}
