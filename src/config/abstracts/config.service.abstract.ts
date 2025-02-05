import { Injectable } from "@nestjs/common";
import { AppConfig } from "../entities/app-config.entity";
import { RedisConfig } from "../entities/redis-config.entity";

@Injectable()
export abstract class AbstractConfigService {
    abstract getAppConfig(): AppConfig;
    abstract getRedisConfig(): RedisConfig;
}