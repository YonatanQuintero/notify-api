import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { NotificationDto } from '../dtos/notification.dto';
import { Language } from 'src/common/decorators/language.decorator';
import { IPClient } from 'src/common/decorators/ip-client.decorator';
import { NotificationMetaDto } from '../dtos/notification-meta.dto';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post("send")
    @HttpCode(HttpStatus.OK)
    async sendNotification(
        @Body() notificationDto: NotificationDto,
        @Language() language: string,
        @IPClient() ipClient: string
    ): Promise<string> {
        return await this.notificationService.sendNotification(
            notificationDto,
            new NotificationMetaDto(language, ipClient)
        );
    }
}