import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { LanguageVO } from 'src/config/value-objects/language.vo';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {

    private defaultLang: LanguageEnum;

    constructor(private readonly configService: AbstractConfigService) {
        const appConfig = this.configService.getAppConfig();
        this.defaultLang = appConfig.defaultLang.getValue();
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const languageHeader = request.headers['x-language'];
        try {
            const languageVO = LanguageVO.create(languageHeader);
            request.language = languageVO.getValue();
        } catch (error) {
            request.language = this.defaultLang;
        }
        return next.handle();
    }
}
