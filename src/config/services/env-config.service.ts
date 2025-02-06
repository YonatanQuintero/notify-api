import { Injectable, Logger } from "@nestjs/common";
import { AbstractConfigService } from "../abstracts/config.service.abstract";
import { AppConfig } from "../entities/app-config.entity";
import { RedisConfig } from "../entities/redis-config.entity";
import { SmtpConfig } from "../entities/smpt-config.entity";
import { CompanyConfig } from "../entities/company-config.entity";

@Injectable()
export class EnvConfigService extends AbstractConfigService {

    private logger = new Logger(EnvConfigService.name);

    getAppConfig(): AppConfig {
        try {

            return AppConfig.create(
                Number(process.env.PORT),
                process.env.API_KEY,
                process.env.ENVIRONMENT,
                process.env.DEFAULT_LANG
            );
        } catch (error) {
            Logger.error(`Error creating AppConfig: ${error.message}`);
            throw error;
        }
    }

    getRedisConfig(): RedisConfig {
        try {
            return RedisConfig.create(
                process.env.REDIS_URL,
                Number(process.env.REDIS_PORT),
                process.env.REDIS_HOST,
                Number(process.env.REDIS_DB)
            );
        } catch (error) {
            this.logger.error(`Error creating RedisConfig: ${error.message}`);
            throw error;
        }
    }

    getSmtpConfig(): SmtpConfig {
        try {
            return SmtpConfig.create(
                process.env.SMTP_HOST,
                Number(process.env.SMTP_PORT),
                process.env.SMTP_USER,
                process.env.SMTP_PASS
            );
        } catch (error) {
            this.logger.error(`Error creating SmtpConfig: ${error.message}`);
            throw error;
        }
    }

    getCompanyConfig(): CompanyConfig {
        try {
            return CompanyConfig.create(
                process.env.COMPANY_NAME,
                process.env.COMPANY_ICON_URL,
                process.env.COMPANY_WEBSITE_URL,
                process.env.COMPANY_ADDRESS
            );
        } catch (error) {
            this.logger.error(`Error creating CompanyConfig: ${error.message}`);
            throw error;
        }
    }


}