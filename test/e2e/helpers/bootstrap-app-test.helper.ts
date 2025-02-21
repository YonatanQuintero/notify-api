import { Test } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract'
import { LanguageInterceptor } from 'src/app/interceptors/language.interceptor'
import { IPClientInterceptor } from 'src/app/interceptors/ip-client.interceptor'
import { AppModule } from 'src/app/app.module'
import { NodeMailerTransporterService } from 'src/email/services/node-mailer-transporter.service'
import { NodeMailerTransporterStubService } from './services/node-mailer-transporter-stub.service.helper'
import { SendEmailQueue } from 'src/email/queues/send-email.queue'
import { ImmediatelySendEmailQueue } from './queues/immediately-send-email.queue.helper'

export async function bootstrapAppTest (
  extraModules = [],
  transporterStub?: NodeMailerTransporterStubService
): Promise<INestApplication> {
  const envBackup: NodeJS.ProcessEnv = { ...process.env }
  process.env = {
    PORT: '3000',
    API_KEY: 'a'.repeat(64), // Minimum valid API key length
    ENVIRONMENT: 'test',
    DEFAULT_LANG: 'en',
    SMTP_HOST: 'smtp.example.com',
    SMTP_PORT: '587',
    SMTP_USER: 'smtp@example.com',
    SMTP_PASS: 'smtp-pass',
    COMPANY_NAME: 'Example Company',
    COMPANY_ICON_URL: 'https://robohash.org/yonax-73',
    COMPANY_WEBSITE_URL: 'https://example.com',
    COMPANY_ADDRESS: '123 Example Street',
    REDIS_URL: 'redis://localhost:6379/0',
    REDIS_PORT: '6379',
    REDIS_HOST: 'localhost',
    REDIS_DB: '0'
  }

  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule, ...extraModules]
  })
    // Override NodeMailerTransporter to use a stub (stream transport) for tests.
    .overrideProvider(NodeMailerTransporterService)
    .useValue(transporterStub)
    .overrideProvider(SendEmailQueue)
    .useClass(ImmediatelySendEmailQueue)
    .compile()

  const appTest = moduleFixture.createNestApplication()

  const configService = appTest.get(AbstractConfigService)
  appTest.useGlobalInterceptors(new LanguageInterceptor(configService))
  appTest.useGlobalInterceptors(new IPClientInterceptor())

  appTest.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  await appTest.init()

  // Restore environment variables after tests.
  process.env = envBackup

  return appTest
}
