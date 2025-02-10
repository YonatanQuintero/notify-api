
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { WelcomeEmailDto } from '../dtos/welcome-email.dto';

import { TfaEmailDto } from '../dtos/tfa-email.dto';
import { UpdateEmailDto } from '../dtos/update-email.dto';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { Language } from 'src/common/decorators/language.decorator';
import { NotificationService } from '../services/notification.service';

@Controller('notifications/email')
export class EmailNotificationsController {
    constructor(private readonly notificationService: NotificationService) { }

   /* @Post('welcome')
    @HttpCode(HttpStatus.OK)
    async sendWelcomeEmail(
        @Body() dto: WelcomeEmailDto,
        @Language() language: string,
    ): Promise<any> {

        const notificationDto = new NotificationDto();

        return this.notificationService.sendNotification(dto, language);
    }

    @Post('recover-password-success')
    @HttpCode(HttpStatus.OK)
    async sendRecoverPasswordSuccessEmail(
        @Body() recoverPasswordSuccessEmailDto: RecoverPasswordSuccessEmailDto,
        @Language() language: string,
    ): Promise<any> {
        return this.notificationService.sendRecoverPasswordSuccessEmail(recoverPasswordSuccessEmailDto, language);
    }

    @Post('tfa')
    @HttpCode(HttpStatus.OK)
    async sendTfaEmail(
        @Body() tfaEmailDto: TfaEmailDto,
        @Language() language: string,
    ): Promise<any> {
        return this.notificationService.sendTfaEmail(tfaEmailDto, language);
    }

    @Post('update-email')
    @HttpCode(HttpStatus.OK)
    async sendUpdateEmail(
        @Body() updateEmailDto: UpdateEmailDto,
        @Language() language: string,
    ): Promise<any> {
        return this.notificationService.sendUpdateEmail(updateEmailDto, language);
    }

    @Post('update-password')
    @HttpCode(HttpStatus.OK)
    async sendUpdatePassword(
        @Body() updatePasswordDto: UpdatePasswordDto,
        @Language() language: string,
    ): Promise<any> {
        return this.notificationService.sendUpdatePassword(updatePasswordDto, language);
    }*/
}
