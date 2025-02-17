import { Test } from "@nestjs/testing";
import { ValidationPipe } from "@nestjs/common";
import { AbstractConfigService } from "src/config/abstracts/config.service.abstract";
import { LanguageInterceptor } from "src/app/interceptors/language.interceptor";
import { IPClientInterceptor } from "src/app/interceptors/ip-client.interceptor";
import { AppModule } from "src/app/app.module";
import { NodeMailerTransporterService } from "src/email/services/node-mailer-transporter.service";
import { NodeMailerTransporterStubService } from "./services/node-mailer-transporter-stub.service.helper";
import { SendEmailQueue } from "src/email/queues/send-email.queue";
import { ImmediatelySendEmailQueue } from "./queues/immediately-send-email.queue.helper";

export async function bootstrapAppTest(
    extraModules = [],
    transporterStub: NodeMailerTransporterStubService
) {

    const moduleFixture = await Test.createTestingModule({
        imports: [AppModule, ...extraModules]
    })
        // Override NodeMailerTransporter to use a stub (stream transport) for tests.
        .overrideProvider(NodeMailerTransporterService)
        .useValue(transporterStub)
        .overrideProvider(SendEmailQueue)
        .useClass(ImmediatelySendEmailQueue)
        .compile();

    const appTest = moduleFixture.createNestApplication();

    const configService = appTest.get(AbstractConfigService);
    appTest.useGlobalInterceptors(new LanguageInterceptor(configService));
    appTest.useGlobalInterceptors(new IPClientInterceptor());

    appTest.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        }
    }));

    await appTest.init();

    return appTest;
}