import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { ApiKeyVO } from 'src/config/value-objects/api-key.vo';

@Injectable()
export class ApiKeyGuard implements CanActivate {

    private readonly logger = new Logger(ApiKeyGuard.name);
    private readonly appConfig = this.configService.getAppConfig();

    constructor(private readonly configService: AbstractConfigService) {
        this.appConfig = this.configService.getAppConfig();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const apiKey = ApiKeyVO.create(request.headers['x-api-key']);

            if (!apiKey.equals(this.appConfig.apiKey)) {
                this.logger.error('Invalid API key');
                throw new UnauthorizedException();
            }

            return true;

        } catch (error) {
            this.logger.error('Error in API key guard', error);
            throw new UnauthorizedException();
        }
    }
}