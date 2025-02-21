import { Global, Module } from '@nestjs/common'
import { AbstractConfigService } from './abstracts/config.service.abstract'
import { ConfigModule } from '@nestjs/config'
import { EnvConfigService } from './services/env-config.service'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  providers: [
    {
      provide: AbstractConfigService,
      useClass: EnvConfigService
    }
  ],
  exports: [AbstractConfigService]
})
export class ConfigurationModule { }
