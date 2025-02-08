import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { LanguageVO } from 'src/config/value-objects/language.vo';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
    private appConfig = this.configService.getAppConfig();

    constructor(private readonly configService: AbstractConfigService) {
        this.appConfig = this.configService.getAppConfig();
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const languageHeader = request.headers['x-language'];
        const { defaultLang } = this.appConfig;
        try {
            const languageVO = LanguageVO.create(languageHeader);
            request.language = languageVO.getValue();
        } catch (error) {
            request.language = defaultLang.getValue();
        }
        return next.handle();
    }
}
