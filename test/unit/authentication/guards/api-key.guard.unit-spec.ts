import { UnauthorizedException } from '@nestjs/common'
import { ApiKeyGuard } from 'src/authentication/guards/api-key.guard'
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract'
import { ApiKeyVO } from 'src/config/value-objects/api-key.vo'

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard
  let configServiceMock: Partial<AbstractConfigService>
  let fakeAppConfig: any
  let fakeConfigApiKey: any

  beforeEach(() => {
    // Create a fake API key value object for the configuration.
    fakeConfigApiKey = { equals: jest.fn() }
    fakeAppConfig = { apiKey: fakeConfigApiKey }
    configServiceMock = {
      getAppConfig: jest.fn().mockReturnValue(fakeAppConfig)
    }

    guard = new ApiKeyGuard(configServiceMock as AbstractConfigService)
  })

  // Helper function to create a persistent mock ExecutionContext.
  const createMockExecutionContext = (headers: Record<string, any>): any => {
    const request = { headers }
    return {
      switchToHttp: () => ({ getRequest: () => request })
    } as any
  }

  it('should return true when the provided API key equals the configured API key', () => {
    const headerApiKey = 'valid-api-key'
    // Simulate ApiKeyVO.create returning an object whose equals() method returns true.
    const fakeApiKey = { equals: jest.fn().mockReturnValue(true) }
    jest.spyOn(ApiKeyVO, 'create').mockReturnValue(fakeApiKey as any)

    const context = createMockExecutionContext({ 'x-api-key': headerApiKey })
    const result = guard.canActivate(context)

    expect(ApiKeyVO.create).toHaveBeenCalledWith(headerApiKey)
    expect(fakeApiKey.equals).toHaveBeenCalledWith(fakeAppConfig.apiKey)
    expect(result).toBe(true)
  })

  it('should throw UnauthorizedException when the provided API key does NOT equal the configured API key', () => {
    const headerApiKey = 'invalid-api-key'
    // Simula que ApiKeyVO.create retorna un objeto cuyo método equals() devuelve false.
    const fakeApiKey = { equals: jest.fn().mockReturnValue(false) }
    jest.spyOn(ApiKeyVO, 'create').mockReturnValue(fakeApiKey as any)

    const context = createMockExecutionContext({ 'x-api-key': headerApiKey })
    expect(async () => await guard.canActivate(context)).toThrow(UnauthorizedException)
    expect(ApiKeyVO.create).toHaveBeenCalledWith(headerApiKey)
    expect(fakeApiKey.equals).toHaveBeenCalledWith(fakeAppConfig.apiKey)
  })

  it('should throw UnauthorizedException when ApiKeyVO.create throws an error (e.g., missing API key)', () => {
    const error = new Error('Missing API key')
    jest.spyOn(ApiKeyVO, 'create').mockImplementation(() => {
      throw error
    })

    const context = createMockExecutionContext({}) // No x-api-key header provided.
    expect(async () => await guard.canActivate(context)).toThrow(UnauthorizedException)
  })
})
