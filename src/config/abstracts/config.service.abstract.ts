import { Injectable } from "@nestjs/common";
import { AppConfig } from "../entities/app-config.entity";
import { RedisConfig } from "../entities/redis-config.entity";
import { SmtpConfig } from "../entities/smpt-config.entity";
import { CompanyConfig } from "../entities/company-config.entity";

@Injectable()
export abstract class AbstractConfigService {
    abstract getAppConfig(): AppConfig;
    abstract getRedisConfig(): RedisConfig;
    abstract getSmtpConfig(): SmtpConfig;
    abstract getCompanyConfig(): CompanyConfig;
}