import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { RedisConfig } from 'src/config/entities/redis-config.entity';
import { QueueConfigService } from 'src/queue/services/queue-config.service';

describe('QueueConfigService', () => {
    let configServiceMock: Partial<AbstractConfigService>;
    let queueConfigService: QueueConfigService;

    beforeEach(() => {
        // Create a mock RedisConfig with the necessary value objects.
        const redisConfigMock = {
            host: { getValue: () => 'localhost' },
            port: { getValue: () => 6379 },
            db: { getValue: () => 0 },
        } as unknown as RedisConfig;

        configServiceMock = {
            getRedisConfig: jest.fn().mockReturnValue(redisConfigMock),
        };

        queueConfigService = new QueueConfigService(configServiceMock as AbstractConfigService);
    });

    it('should create a shared Bull configuration with correct Redis settings', () => {
        const bullOptions = queueConfigService.createSharedConfiguration();

        expect(bullOptions).toEqual({
            redis: {
                host: 'localhost',
                port: 6379,
                db: 0,
            },
        });
        expect(configServiceMock.getRedisConfig).toHaveBeenCalled();
    });
});
