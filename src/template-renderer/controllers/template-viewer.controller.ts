import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common'
import { ApiHeader, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { AbstractTemplateRendererService } from '../abstracts/template-renderer.service.abstract'
import { TemplateRenderer } from '../entities/template-renderer.entity'
import { TemplateNameEnum } from '../enum/template-name.enum'
import { LanguageEnum } from 'src/config/enums/language.enum'
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract'
import { CompanyConfig } from 'src/config/entities/company-config.entity'
import { ViewWelcomeTemplateDto } from '../dtos/view-welcome-template.dto'
import { Language } from 'src/app/decorators/language.decorator'
import { ViewRecoverPasswordSuccessTemplateDto } from '../dtos/view-recover-password-success-template.dto'
import { ViewTfaTemplateDto } from '../dtos/view-tfa-template.dto'
import { IPClient } from 'src/app/decorators/ip-client.decorator'
import { ViewBaseTemplateDto } from '../dtos/view-base-template.dto'
import { ViewUpdateEmailTemplateDto } from '../dtos/view-update-email-template.dto'
import { ViewUpdatePasswordTemplateDto } from '../dtos/view-update-password-template.dto'
import { createBase, createTFA } from '../factories/template-entity.factory'

@ApiTags('Templates')
@ApiHeader({
  name: 'x-language',
  description: 'Specify the language of the email (en or es), default is en'
})
@ApiHeader({
  name: 'x-api-key',
  description: 'Specify the API key'
})
@Controller('api/v1/templates/viewer')
export class TemplateViewerController {
  private readonly companyConfig: CompanyConfig

  constructor(
    private readonly templateRendererService: AbstractTemplateRendererService,
    private readonly configService: AbstractConfigService
  ) {
    this.companyConfig = this.configService.getCompanyConfig()
  }

  private async viewBaseTemplate(
    dto: ViewBaseTemplateDto,
    lang: LanguageEnum,
    name: TemplateNameEnum
  ): Promise<string> {
    const template = TemplateRenderer.create(
      name,
      lang,
      createBase(
        dto.username,
        this.companyConfig.name.getValue(),
        this.companyConfig.websiteUrl.getValue(),
        this.companyConfig.iconUrl.getValue()
      )
    )
    return await this.templateRendererService.render(template)
  }

  @Get('welcome')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Render the Welcome Email Template' })
  @ApiResponse({ status: 200, description: 'Welcome email rendered successfully', type: String })
  @ApiResponse({ status: 400, description: 'Bad Request: One or more required fields are missing or invalid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: API key is missing or invalid.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred on the server.' })
  async viewWelcomeTemplate(
    @Query() dto: ViewWelcomeTemplateDto,
    @Language() lang: LanguageEnum
  ): Promise<string> {
    return await this.viewBaseTemplate(dto, lang, TemplateNameEnum.WELCOME)
  }

  @Get('recover-password-success')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Render the Recover Password Success Email Template' })
  @ApiResponse({ status: 200, description: 'Password recovery success email rendered successfully', type: String })
  @ApiResponse({ status: 400, description: 'Bad Request: One or more required fields are missing or invalid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: API key is missing or invalid.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred on the server.' })
  async viewRecoverPasswordSuccessTemplate(
    @Query() dto: ViewRecoverPasswordSuccessTemplateDto,
    @Language() lang: LanguageEnum
  ): Promise<string> {
    return await this.viewBaseTemplate(dto, lang, TemplateNameEnum.RECOVER_PASSWORD_SUCCESS)
  }

  @Get('update-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Render the Update Email Template' })
  @ApiResponse({ status: 200, description: 'Update email rendered successfully', type: String })
  @ApiResponse({ status: 400, description: 'Bad Request: One or more required fields are missing or invalid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: API key is missing or invalid.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred on the server.' })
  async viewUpdateEmailTemplate(
    @Query() dto: ViewUpdateEmailTemplateDto,
    @Language() lang: LanguageEnum
  ): Promise<string> {
    return await this.viewBaseTemplate(dto, lang, TemplateNameEnum.UPDATE_EMAIL)
  }

  @Get('update-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Render the Update Password Template' })
  @ApiResponse({ status: 200, description: 'Update password email rendered successfully', type: String })
  @ApiResponse({ status: 400, description: 'Bad Request: One or more required fields are missing or invalid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: API key is missing or invalid.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred on the server.' })
  async viewUpdatePasswordTemplate(
    @Query() dto: ViewUpdatePasswordTemplateDto,
    @Language() lang: LanguageEnum
  ): Promise<string> {
    return await this.viewBaseTemplate(dto, lang, TemplateNameEnum.UPDATE_PASSWORD)
  }

  @Get('tfa')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Render the Two-Factor Authentication (TFA) Template' })
  @ApiResponse({ status: 200, description: 'TFA email rendered successfully', type: String })
  @ApiResponse({ status: 400, description: 'Bad Request: One or more required fields are missing or invalid.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: API key is missing or invalid.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error: An unexpected error occurred on the server.' })
  async viewTfaTemplate(
    @Query() dto: ViewTfaTemplateDto,
    @Language() lang: LanguageEnum,
    @IPClient() ipClient: string
  ): Promise<string> {
    const template = TemplateRenderer.create(
      TemplateNameEnum.TFA,
      lang,
      createTFA(
        dto.username,
        this.companyConfig.name.getValue(),
        this.companyConfig.websiteUrl.getValue(),
        this.companyConfig.iconUrl.getValue(),
        dto.code,
        dto.ttlFormatted,
        ipClient
      )
    )
    return await this.templateRendererService.render(template)
  }
}
