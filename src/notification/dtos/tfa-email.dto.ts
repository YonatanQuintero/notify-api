import { EmailBaseDto } from './email-base.dto';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class TfaEmailDto extends EmailBaseDto {
    @IsNumber()
    readonly code: number;

    @IsString()
    @IsNotEmpty()
    readonly ttlFormatted: string;
}
