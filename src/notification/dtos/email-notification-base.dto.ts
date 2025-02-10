import { IsArray, IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class EmailNotificationBaseDto {
    
    @IsArray()
    @IsEmail({}, { each: true })
    @IsNotEmpty({ each: true })
    readonly recipients: string[];

    @IsOptional()
    @IsArray()
    @IsEmail({}, { each: true })
    readonly ccEmail?: string[];

    @IsOptional()
    @IsArray()
    @IsEmail({}, { each: true })
    readonly bccEmail?: string[];

    @IsString()
    @IsNotEmpty()
    readonly username: string;
}
