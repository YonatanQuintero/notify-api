import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiHeader, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WelcomeEmailDto } from '../dtos/welcome-email.dto';
import { TfaEmailDto } from '../dtos/tfa-email.dto';
import { UpdateEmailDto } from '../dtos/update-email.dto';
import { UpdatePasswordDto } from '../dtos/update-password-email.dto';
import { Language } from 'src/app/decorators/language.decorator';
import { EmailNotificationService } from '../services/email-notification.service';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { RecoverPasswordSuccessEmailDto } from '../dtos/recover-password-success-email.dto';
import { IPClient } from 'src/app/decorators/ip-client.decorator';

@ApiTags('Email Notifications')
@ApiHeader({
    name: 'x-language',
    description: 'Specify the language of the email (en or es), default is en',
})
@ApiHeader({
    name: 'x-api-key',
    description: 'Specify the API key',
})
@Controller('api/v1/notifications/email')
export class EmailNotificationController {
    constructor(
        private readonly emailService: EmailNotificationService,
    ) { }

    @Post('welcome')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Send Welcome Email' })
    @ApiResponse({ status: 200, description: 'Welcome email sent successfully', type: String })
    @ApiResponse({ status: 400, description: 'Bad Request: One or more required fields are missing or invalid.' })
    @ApiResponse({ status: 401, description: 'Unauthorized: API key is missing or invalid.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred on the server.' })
    async sendWelcomeEmail(
        @Body() dto: WelcomeEmailDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return this.emailService.sendWelcomeEmail(dto, lang);
    }

    @Post('recover-password-success')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Send Recover Password Success Email' })
    @ApiResponse({ status: 200, description: 'Recover password success email sent successfully', type: String })
    @ApiResponse({ status: 400, description: 'Bad Request: One or more required fields are missing or invalid.' })
    @ApiResponse({ status: 401, description: 'Unauthorized: API key is missing or invalid.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred on the server.' })
    async sendRecoverPasswordSuccessEmail(
        @Body() dto: RecoverPasswordSuccessEmailDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return this.emailService.sendRecoverPasswordSuccessEmail(dto, lang);
    }

    @Post('tfa')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Send Two-Factor Authentication (TFA) Email' })
    @ApiResponse({ status: 200, description: 'TFA email sent successfully', type: String })
    @ApiResponse({ status: 400, description: 'Bad Request: One or more required fields are missing or invalid.' })
    @ApiResponse({ status: 401, description: 'Unauthorized: API key is missing or invalid.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred on the server.' })
    async sendTfaEmail(
        @Body() dto: TfaEmailDto,
        @Language() lang: LanguageEnum,
        @IPClient() ipClient: string,
    ): Promise<string> {
        return this.emailService.sendTfaEmail(dto, lang, ipClient);
    }

    @Post('update-email')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Send Update Email Notification' })
    @ApiResponse({ status: 200, description: 'Update email notification sent successfully', type: String })
    @ApiResponse({ status: 400, description: 'Bad Request: One or more required fields are missing or invalid.' })
    @ApiResponse({ status: 401, description: 'Unauthorized: API key is missing or invalid.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred on the server.' })
    async sendUpdateEmail(
        @Body() dto: UpdateEmailDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return this.emailService.sendUpdateEmail(dto, lang);
    }

    @Post('update-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Send Update Password Email' })
    @ApiResponse({ status: 200, description: 'Update password email sent successfully', type: String })
    @ApiResponse({ status: 400, description: 'Bad Request: One or more required fields are missing or invalid.' })
    @ApiResponse({ status: 401, description: 'Unauthorized: API key is missing or invalid.' })
    @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred on the server.' })
    async sendUpdatePassword(
        @Body() dto: UpdatePasswordDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return this.emailService.sendUpdatePassword(dto, lang);
    }
}
