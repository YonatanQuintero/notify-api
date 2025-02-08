import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { LanguageInterceptor } from 'src/common/interceptors/language.interceptor';
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { LanguageVO } from 'src/config/value-objects/language.vo';

describe('LanguageInterceptor', () => {
    let interceptor: LanguageInterceptor;
    let configServiceMock: Partial<AbstractConfigService>;
    let appConfigMock: { defaultLang: { getValue: () => string } };

    beforeEach(() => {
        appConfigMock = {
            defaultLang: { getValue: () => 'en-us' },
        };

        configServiceMock = {
            getAppConfig: jest.fn().mockReturnValue(appConfigMock),
        };

        interceptor = new LanguageInterceptor(configServiceMock as AbstractConfigService);
    });

    // Helper function to create a mock ExecutionContext with a persistent request object.
    const createMockExecutionContext = (headers: Record<string, any>): ExecutionContext => {
        // Create a persistent request object.
        const request = { headers };
        return {
            switchToHttp: () => ({
                getRequest: () => request,
            }),
        } as unknown as ExecutionContext;
    };

    // Helper for a mock CallHandler returning an observable.
    const createMockCallHandler = (): CallHandler => ({
        handle: () => of('response'),
    });

    it('should set request.language to the valid header value when provided', (done) => {
        const validLanguage = 'es-la';
        // Mock LanguageVO.create to return an object whose getValue returns the valid language.
        const fakeLanguageVO = { getValue: () => validLanguage };
        jest.spyOn(LanguageVO, 'create').mockReturnValue(fakeLanguageVO as any);

        const headers = { 'x-language': validLanguage };
        const context = createMockExecutionContext(headers);
        const callHandler = createMockCallHandler();

        interceptor.intercept(context, callHandler).subscribe(() => {
            const request = context.switchToHttp().getRequest();
            expect(request.language).toBe(validLanguage);
            done();
        });
    });

    it('should set request.language to default language when header is invalid', (done) => {
        // Simulate LanguageVO.create throwing an error for an invalid language header.
        jest.spyOn(LanguageVO, 'create').mockImplementation(() => {
            throw new Error('Invalid language');
        });

        const headers = { 'x-language': 'invalid-lang' };
        const context = createMockExecutionContext(headers);
        const callHandler = createMockCallHandler();

        interceptor.intercept(context, callHandler).subscribe(() => {
            const request = context.switchToHttp().getRequest();
            expect(request.language).toBe(appConfigMock.defaultLang.getValue());
            done();
        });
    });
});
