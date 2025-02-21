import { Module } from '@nestjs/common'
import { EmailModule } from 'src/email/email.module'
import { EmailNotificationController } from './controllers/email-notification.controller'
import { EmailNotificationService } from './services/email-notification.service'
import { TemplateRendererModule } from 'src/template-renderer/template-renderer.module'

@Module({
  imports: [
    EmailModule,
    TemplateRendererModule
  ],
  controllers: [
    EmailNotificationController
  ],
  providers: [
    EmailNotificationService
  ]
})
export class NotificationModule { }
