import { EmailBaseDto } from './email-base.dto';
import { IsNumber, IsString, IsNotEmpty, MinLength, MaxLength, Min, Max } from 'class-validator';

export class TfaEmailDto extends EmailBaseDto {
    @IsNumber({
        maxDecimalPlaces: 0
    }, {
        message: 'validation.tfa-code.is-number',
    })
    @Min(100000, {
        message: 'validation.tfa-code.min',
    })
    @Max(999999, {
        message: 'validation.tfa-code.max',
    })
    readonly code: number;

    @IsString({
        message: 'validation.ttl-formatted.is-string',
    })
    @IsNotEmpty({
        message: 'validation.ttl-formatted.is-not-empty',
    })
    readonly ttlFormatted: string;
}
