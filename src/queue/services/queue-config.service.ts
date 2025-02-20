import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull'
import { Injectable } from '@nestjs/common/decorators'
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract'
import { RedisConfig } from 'src/config/entities/redis-config.entity'

@Injectable()
export class QueueConfigService implements SharedBullConfigurationFactory {
  private readonly redisConfig: RedisConfig

  constructor (
    private readonly configService: AbstractConfigService
  ) {
    this.redisConfig = this.configService.getRedisConfig()
  }

  createSharedConfiguration (): BullModuleOptions {
    return {
      redis: {
        host: this.redisConfig.host.getValue(),
        port: this.redisConfig.port.getValue(),
        db: this.redisConfig.db.getValue()
      }
    }
  }
}
