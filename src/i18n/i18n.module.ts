import * as path from 'path';
import { Module } from "@nestjs/common";
import { I18nModule, AcceptLanguageResolver, I18nJsonLoader } from 'nestjs-i18n';
import { APP_FILTER } from '@nestjs/core';
import { I18nExceptionFilter } from './i18n-exception.filter';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { I18nDomainErrorFilter } from './i18n-domain-error.filter';

@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: LanguageEnum.EN,
            loader: I18nJsonLoader,
            loaderOptions: {
                path: path.join(__dirname, '/translations'),
                watch: true,
            },
            resolvers: [
                AcceptLanguageResolver,
            ]
        }),
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: I18nExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: I18nDomainErrorFilter
        }
    ],
})
export class I18nAppModule { }