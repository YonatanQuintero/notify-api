import { IsArray, IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class EmailBaseDto {

    @IsArray({
        message: 'validation.recipients.is-array',
    })
    @IsEmail({}, {
        each: true,
        message: 'validation.recipients.is-email'
    })
    readonly recipients: string[];

    @IsString({
        message: 'validation.username.is-string'
    })
    @IsNotEmpty({
        message: 'validation.username.is-not-empty'
    })
    readonly username: string;

    @IsOptional()
    @IsArray({
        message: 'validation.carbon-copies.is-array'
    })
    @IsEmail({}, {
        each: true,
        message: 'validation.carbon-copies.is-email'
    })
    readonly carbonCopies?: string[];

    @IsOptional()
    @IsArray({
        message: 'validation.blind-carbon-copies.is-array'
    })
    @IsEmail({}, {
        each: true,
        message: 'validation.blind-carbon-copies.is-email'
    })
    readonly blindCarbonCopies?: string[];
}
