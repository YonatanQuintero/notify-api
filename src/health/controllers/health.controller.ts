import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Post } from '@nestjs/common';
import { InvalidIPAddressError } from 'src/app/errors/invalid-ip-address.error';
import { Authentication } from 'src/authentication/decorators/authentication.decorator';
import { AuthenticationType } from 'src/authentication/enums/authentication-type.enum';


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
         throw new InvalidIPAddressError("xxx.yyy.zzz");
        // throw new BadRequestException("Invalid IP address");
    }

}