import { BullModule } from "@nestjs/bull";
import { Global, Module } from "@nestjs/common";
import { QueueConfigService } from "./services/queue-config.service";
import { SEND_EMAIL_QUEUE } from "./constants/queue.constants";
import { ConfigurationModule } from "src/config/configuration.module";

@Global()
@Module({
    imports: [
        BullModule.forRootAsync({
            useClass: QueueConfigService,
        }),
        BullModule.registerQueue({
            name: SEND_EMAIL_QUEUE
        }),
        ConfigurationModule
    ],
    exports: [BullModule]
})
export class QueueModule { }