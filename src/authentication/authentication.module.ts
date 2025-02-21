import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthenticationGuard } from './guards/authentication.guard'
import { ApiKeyGuard } from './guards/api-key.guard'

@Module({
  providers: [
    ApiKeyGuard,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard
    }
  ]
})
export class AuthenticationModule { }
