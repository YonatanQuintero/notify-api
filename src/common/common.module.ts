import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LanguageInterceptor } from "./interceptors/language.interceptor";
import { IPClientInterceptor } from "./interceptors/ip-client.interceptor";
@Module({
    imports: [],
    controllers: [],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: LanguageInterceptor
    }, {
        provide: APP_INTERCEPTOR,
        useClass: IPClientInterceptor,
    }],
    exports: [],
})
export class CommonModule { }