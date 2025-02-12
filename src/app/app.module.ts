import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LanguageInterceptor } from "./interceptors/language.interceptor";
import { IPClientInterceptor } from "./interceptors/ip-client.interceptor";
import { I18nAppModule } from "src/i18n/i18n.module";
import { TemplateRendererModule } from "src/template-renderer/template-renderer.module";
import { ConfigurationModule } from "src/config/configuration.module";
import { QueueModule } from "src/queue/queue.module";
import { NotificationModule } from "src/notification/notification.module";
@Module({
    imports: [
        I18nAppModule,
        TemplateRendererModule,
        ConfigurationModule,
        QueueModule,
        NotificationModule
    ],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: LanguageInterceptor
    }, {
        provide: APP_INTERCEPTOR,
        useClass: IPClientInterceptor,
    }]
})
export class AppModule { }