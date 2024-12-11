
import { Module } from '@nestjs/common';
import { AbstractAppConfig } from '../abstracts/app-config.abstract';
import { EnvAppConfig } from './env-app.config';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:[
        ConfigModule.forRoot()
    ],
    providers: [
        {
            provide: AbstractAppConfig,
            useClass: EnvAppConfig,
        },
    ],
    exports: [AbstractAppConfig],
})
export class ConfigurationModule { }
