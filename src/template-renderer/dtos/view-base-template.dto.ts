import { IsNotEmpty, IsString } from "class-validator";

export class ViewBaseTemplateDto {

    @IsString({
        message: 'validation.username.is-string'
    })
    @IsNotEmpty({
        message: 'validation.username.is-not-empty'
    })
    readonly username: string;
}