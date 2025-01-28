import { Injectable } from "@nestjs/common";
import { AppConfig } from "../entities/app-config.entity";

@Injectable()
export abstract class AbstractConfigService {
    abstract getAppConfig(): AppConfig;
}