import { EmailNotificationBaseDto } from './email-notification-base.dto';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class TfaEmailDto extends EmailNotificationBaseDto {
    @IsNumber()
    readonly code: number;

    @IsString()
    @IsNotEmpty()
    readonly ttlFormated: string;
}
