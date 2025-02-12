import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { WelcomeEmailDto } from '../dtos/welcome-email.dto';
import { TfaEmailDto } from '../dtos/tfa-email.dto';
import { UpdateEmailDto } from '../dtos/update-email.dto';
import { UpdatePasswordDto } from '../dtos/update-password-email.dto';
import { Language } from 'src/common/decorators/language.decorator';
import { EmailNotificationService } from '../services/email-notification.service';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { RecoverPasswordSuccessEmailDto } from '../dtos/recover-password-success-email.dto';
import { IPClient } from 'src/common/decorators/ip-client.decorator';

@Controller('notifications/email')
export class EmailNotificationController {
    constructor(
        private readonly emailService: EmailNotificationService,
    ) { }

    @Post('welcome')
    @HttpCode(HttpStatus.OK)
    async sendWelcomeEmail(
        @Body() dto: WelcomeEmailDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return this.emailService.sendWelcomeEmail(dto, lang);
    }

    @Post('recover-password-success')
    @HttpCode(HttpStatus.OK)
    async sendRecoverPasswordSuccessEmail(
        @Body() dto: RecoverPasswordSuccessEmailDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return this.emailService.sendRecoverPasswordSuccessEmail(dto, lang);
    }

    @Post('tfa')
    @HttpCode(HttpStatus.OK)
    async sendTfaEmail(
        @Body() dto: TfaEmailDto,
        @Language() lang: LanguageEnum,
        @IPClient() ipClient: string,
    ): Promise<string> {
        return this.emailService.sendTfaEmail(dto, lang, ipClient);
    }

    @Post('update-email')
    @HttpCode(HttpStatus.OK)
    async sendUpdateEmail(
        @Body() dto: UpdateEmailDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return this.emailService.sendUpdateEmail(dto, lang);
    }

    @Post('update-password')
    @HttpCode(HttpStatus.OK)
    async sendUpdatePassword(
        @Body() dto: UpdatePasswordDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return this.emailService.sendUpdatePassword(dto, lang);
    }
}