import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { AbstractAppConfig } from "../abstracts/app-config.abstract";
import { AppConfig } from "src/domain/entities/app-config.entity";

@Injectable()
export class EnvAppConfig extends AbstractAppConfig {
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