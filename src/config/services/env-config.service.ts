import { Injectable, Logger } from "@nestjs/common";
import { AbstractConfigService } from "../abstracts/config.service.abstract";
import { AppConfig } from "../entities/app-config.entity";

@Injectable()
export class EnvConfigService extends AbstractConfigService {
    getAppConfig(): AppConfig {
        try {

            return AppConfig.create(
                Number(process.env.PORT),
                process.env.API_KEY,
                process.env.ENVIRONMENT,
                process.env.DEFAULT_LANG,
                process.env.SMTP_HOST,
                Number(process.env.SMTP_PORT),
                process.env.SMTP_USER,
                process.env.SMTP_PASS,
                process.env.COMPANY_NAME,
                process.env.COMPANY_ICON_URL,
                process.env.COMPANY_WEBSITE_URL,
                process.env.COMPANY_ADDRESS
            );
        } catch (error) {
            Logger.error(`Error creating AppConfig: ${error.message}`);
            throw error;
        }
    }


}