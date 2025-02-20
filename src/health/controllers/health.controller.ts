import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Authentication } from 'src/authentication/decorators/authentication.decorator'
import { AuthenticationType } from 'src/authentication/enums/authentication-type.enum'

@ApiTags('Health')
@Controller('api/v1/health')
@Authentication(AuthenticationType.None)
export class HealthController {
  @Get()
  @ApiOperation({
    summary: 'Health Check Endpoint',
    description: 'Returns the current health status, uptime, and version of the application.'
  })
  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        uptime: { type: 'number', example: 12345 },
        version: { type: 'string', example: 'v1' }
      }
    }
  })
  getHealth () {
    return {
      status: 'ok',
      uptime: process.uptime(),
      version: 'v1'
    }
  }
}
