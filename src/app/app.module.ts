import { Module } from "@nestjs/common";
import { I18nAppModule } from "src/i18n/i18n.module";
import { TemplateRendererModule } from "src/template-renderer/template-renderer.module";
import { ConfigurationModule } from "src/config/configuration.module";
import { QueueModule } from "src/queue/queue.module";
import { NotificationModule } from "src/notification/notification.module";
import { AuthenticationModule } from "src/authentication/authentication.module";
@Module({
    imports: [
        I18nAppModule,
        TemplateRendererModule,
        ConfigurationModule,
        QueueModule,
        NotificationModule,
        AuthenticationModule
    ]
})
export class AppModule { }