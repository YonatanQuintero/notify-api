import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { NotificationDto } from '../dtos/notification.dto';

@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post("send")
    @HttpCode(HttpStatus.OK)
    async sendNotification(
        @Body() notificationDto: NotificationDto,
    ): Promise<string> {
        return await this.notificationService.sendNotification(notificationDto);
    }
}