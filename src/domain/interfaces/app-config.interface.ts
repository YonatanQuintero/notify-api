import { AppConfig } from "../entities/app-config.entity";

export interface IAppConfig { 
    getAppConfig(): AppConfig; 
}