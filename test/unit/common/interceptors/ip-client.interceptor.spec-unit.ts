import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import * as requestIp from 'request-ip';
import { IPClientInterceptor } from 'src/common/interceptors/ip-client.interceptor';

describe('IPClientInterceptor', () => {
    let interceptor: IPClientInterceptor;

    beforeEach(() => {
        interceptor = new IPClientInterceptor();
    });

    // Helper to create a persistent request object.
    const createMockExecutionContext = (req: any): ExecutionContext => {
        return {
            switchToHttp: () => ({
                getRequest: () => req,
            }),
        } as unknown as ExecutionContext;
    };

    // Helper to create a simple CallHandler returning an observable.
    const createMockCallHandler = (): CallHandler => ({
        handle: () => of('response'),
    });

    it('should set request.ipClient with the client IP from requestIp.getClientIp', (done) => {
        // Arrange: Create a persistent request object (typed as any).
        const fakeRequest: any = {
            headers: {},
            connection: { remoteAddress: '192.168.1.100' }
        };
        const expectedIp = '192.168.1.100';

        // Spy on requestIp.getClientIp to always return our expected IP.
        const getClientIpSpy = jest.spyOn(requestIp, 'getClientIp').mockReturnValue(expectedIp);

        const context = createMockExecutionContext(fakeRequest);
        const callHandler = createMockCallHandler();

        // Act: Run the interceptor.
        interceptor.intercept(context, callHandler).subscribe(() => {
            // Assert: The same request object should have ipClient set.
            expect(fakeRequest.ipClient).toBe(expectedIp);
            getClientIpSpy.mockRestore();
            done();
        });
    });
});
