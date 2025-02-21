import { IsArray, IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator'

export class EmailBaseDto {
  @IsArray({
    message: 'validation.to.is-array'
  })
  @IsEmail({}, {
    each: true,
    message: 'validation.to.is-email'
  })
  readonly to: string[]

  @IsString({
    message: 'validation.username.is-string'
  })
  @IsNotEmpty({
    message: 'validation.username.is-not-empty'
  })
  readonly username: string

  @IsOptional()
  @IsArray({
    message: 'validation.cc.is-array'
  })
  @IsEmail({}, {
    each: true,
    message: 'validation.cc.is-email'
  })
  readonly cc?: string[]

  @IsOptional()
  @IsArray({
    message: 'validation.bcc.is-array'
  })
  @IsEmail({}, {
    each: true,
    message: 'validation.bcc.is-email'
  })
  readonly bcc?: string[]
}
