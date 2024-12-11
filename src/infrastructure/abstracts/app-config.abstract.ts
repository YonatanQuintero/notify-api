import { Injectable } from "@nestjs/common";
import { AppConfig } from "src/domain/entities/app-config.entity";
import { IAppConfig } from "src/domain/interfaces/app-config.interface";

@Injectable()
export abstract class AbstractAppConfig implements IAppConfig {
    abstract getAppConfig(): AppConfig;
}