import * as path from 'path';
import { Module } from "@nestjs/common";
import { I18nModule, AcceptLanguageResolver, I18nJsonLoader } from 'nestjs-i18n';
import { APP_FILTER } from '@nestjs/core';
import { I18nExceptionFilter } from './i18n-exception.filter';

@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: 'en-us',
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
    providers: [{
        provide: APP_FILTER,
        useClass: I18nExceptionFilter,
    }],
})
export class I18nAppModule { }