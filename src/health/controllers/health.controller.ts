import { Controller, Get } from '@nestjs/common';
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
}
