import { BadRequestException, Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { InvalidIPAddressError } from 'src/app/errors/invalid-ip-address.error';
import { DomainError } from 'src/app/primitives/domain-error';
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
        try {
            throw new InvalidIPAddressError("xxxx");
        } catch (error) {
            if (error instanceof DomainError) {
                throw new BadRequestException(error.code, error.message);
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }
}
