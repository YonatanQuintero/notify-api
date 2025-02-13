import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Post } from '@nestjs/common';
import { IsString } from 'class-validator';
import { InvalidIPAddressError } from 'src/app/errors/invalid-ip-address.error';
import { DomainError } from 'src/app/primitives/domain-error';
import { Authentication } from 'src/authentication/decorators/authentication.decorator';
import { AuthenticationType } from 'src/authentication/enums/authentication-type.enum';
import { EnvironmentEnum } from 'src/config/enums/environment.enum';
import { InvalidEnvironmentError } from 'src/config/errors/invalid-environment.error';
import { InvalidLanguageError } from 'src/config/errors/invalid-language.error';


export class ErrorDto {

    @IsString()
    readonly value: string;
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
        // try {
        //     throw new InvalidIPAddressError("xxxx");
        // } catch (error) {
        //     if (error instanceof DomainError) {
        //         console.log('error', error);
        //         throw new BadRequestException(error);
        //     } else {
        //         throw error
        //     }
        // }
        // try {
        //     throw new InvalidIPAddressError("xxxx");
        // } catch (error) {
        //     throw error;
        // }

        // throw new BadRequestException();
        // throw new InvalidEnvironmentError("abcd", Object.values(EnvironmentEnum).join(', '));
        // throw new InvalidLanguageError("en");
        throw new InvalidIPAddressError("xxxx");
    }

    @Post("/error")
    @HttpCode(HttpStatus.OK)
    errorWithBody(@Body() dto: ErrorDto) {
        try {
            console.log(dto.value);
        } catch (error) {
            if (error instanceof DomainError) {
                throw new BadRequestException(error.message);
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }
}

