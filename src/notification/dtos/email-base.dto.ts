import { IsArray, IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class EmailBaseDto {

    @IsArray()
    @IsEmail({}, { each: true })
    @IsNotEmpty({ each: true })
    readonly toEmail: string[];

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsOptional()
    @IsArray()
    @IsEmail({}, { each: true })
    readonly ccEmail?: string[];

    @IsOptional()
    @IsArray()
    @IsEmail({}, { each: true })
    readonly bccEmail?: string[];
}
