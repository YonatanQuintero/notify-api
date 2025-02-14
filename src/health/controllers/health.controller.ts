import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Post } from '@nestjs/common';
import { IsEmpty, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { InvalidIPAddressError } from 'src/app/errors/invalid-ip-address.error';
import { DomainError } from 'src/app/primitives/domain-error';
import { Authentication } from 'src/authentication/decorators/authentication.decorator';
import { AuthenticationType } from 'src/authentication/enums/authentication-type.enum';
import { EnvironmentEnum } from 'src/config/enums/environment.enum';
import { InvalidEnvironmentError } from 'src/config/errors/invalid-environment.error';
import { InvalidLanguageError } from 'src/config/errors/invalid-language.error';
import { isLength } from 'validator';

/*
Cases: 

1. Pass a invalid message to translate ex: validation.is-string-2. -> return the same message : validation.is-string-2
2. Pass a invalid message without the validation prefix. -> return the same message : is-string-2
3. Pass message empty -> return the default message: Value must be a non-empty string.
4. Multiple validations: works
5. Validations with constrains and properties: dont work: Why do not use customo validations to avoid general errors, for example for customField you can use the custom field must be an string: validation.custom-field-must-be-string?
6. Validations in spanish: works
7. Http exceptions errors: works
*/
export class ErrorDto {

    @IsString({
        message: 'validation.test.is-string',
    })
    @IsNotEmpty({
        message: 'validation.test.is-not-empty',
    })
    // @MinLength(3, {
    //     message: 'validation.test.min-length',
    // })
    readonly test: string;
}

@Controller('api/v1/health')
@Authentication(AuthenticationType.None)
export class HealthController {
    @Get()
    getHealth() {
        return {
            status: 'ok',
            uptime: process.uptime(),
            version: 'v1'
        };
    }

    @Get("/error")
    error() {
        throw new InvalidIPAddressError("xxxx");
    }

    @Post("/error")
    @HttpCode(HttpStatus.OK)
    errorWithBody(@Body() dto: ErrorDto) {
        console.log(dto.test);
        throw new BadRequestException("Custom error message");
    }
}