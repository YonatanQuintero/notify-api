import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LanguageInterceptor } from "./interceptors/language.interceptor";
@Module({
    imports: [],
    controllers: [],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: LanguageInterceptor,
    }],
    exports: [],
})
export class CommonModule { }