import { Controller, Get, HttpCode, HttpStatus, Post, Query, Req } from "@nestjs/common";
import { AbstractTemplateRendererService } from "../abstracts/template-renderer.service.abstract";
import { TemplateRenderer } from "../entities/template-renderer.entity";
import { TemplateNameEnum } from "../enum/template-name.enum";
import { LanguageEnum } from "src/config/enums/language.enum";
import { TemplateEntityFactory } from "../factories/template-entity.factory";
import { AbstractConfigService } from "src/config/abstracts/config.service.abstract";
import { CompanyConfig } from "src/config/entities/company-config.entity";
import { ViewWelcomeTemplateDto } from "../dtos/view-welcome-template.dto";
import { Language } from "src/app/decorators/language.decorator";
import { ViewRecoverPasswordSuccessTemplateDto } from "../dtos/view-recover-password-success-template.dto";
import { ViewTfaTemplateDto } from "../dtos/view-tfa-template.dto";
import { IPClient } from "src/app/decorators/ip-client.decorator";
import { ViewBaseTemplateDto } from "../dtos/view-base-template.dto";
import { ViewUpdateEmailTemplateDto } from "../dtos/view-update-email-template.dto";
import { ViewUpdatePasswordTemplateDto } from "../dtos/view-update-password-template.dto";

@Controller('api/v1/templates/viewer')
export class TemplateViewerController {

    private companyConfig: CompanyConfig;

    constructor(
        private readonly templateRendererService: AbstractTemplateRendererService,
        private readonly configService: AbstractConfigService
    ) {
        this.companyConfig = this.configService.getCompanyConfig();
    }

    private async viewBaseTemplate(
        dto: ViewBaseTemplateDto,
        lang: LanguageEnum,
        name: TemplateNameEnum,
    ): Promise<string> {
        const template = TemplateRenderer.create(
            name,
            lang,
            TemplateEntityFactory.createBase(
                dto.username,
                this.companyConfig.name.getValue(),
                this.companyConfig.websiteUrl.getValue(),
                this.companyConfig.iconUrl.getValue(),
            )
        );
        return await this.templateRendererService.render(template);
    }

    @Get("welcome")
    @HttpCode(HttpStatus.OK)
    async viewWelcomeTemplate(
        @Query() dto: ViewWelcomeTemplateDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return await this.viewBaseTemplate(dto, lang, TemplateNameEnum.WELCOME);
    }

    @Get("recover-password-success")
    @HttpCode(HttpStatus.OK)
    async viewRecoverPasswordSuccessTemplate(
        @Query() dto: ViewRecoverPasswordSuccessTemplateDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return await this.viewBaseTemplate(dto, lang, TemplateNameEnum.RECOVER_PASSWORD_SUCCESS);
    }

    @Get("update-email")
    @HttpCode(HttpStatus.OK)
    async viewUpdateEmailTemplate(
        @Query() dto: ViewUpdateEmailTemplateDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return await this.viewBaseTemplate(dto, lang, TemplateNameEnum.UPDATE_EMAIL);
    }

    @Get("update-password")
    @HttpCode(HttpStatus.OK)
    async viewUpdatePasswordTemplate(
        @Query() dto: ViewUpdatePasswordTemplateDto,
        @Language() lang: LanguageEnum,
    ): Promise<string> {
        return await this.viewBaseTemplate(dto, lang, TemplateNameEnum.UPDATE_PASSWORD);
    }

    @Get("tfa")
    @HttpCode(HttpStatus.OK)
    async viewTfaTemplate(
        @Query() dto: ViewTfaTemplateDto,
        @Language() lang: LanguageEnum,
        @IPClient() ipClient: string
    ): Promise<string> {
        const template = TemplateRenderer.create(
            TemplateNameEnum.TFA,
            lang,
            TemplateEntityFactory.createTFA(
                dto.username,
                this.companyConfig.name.getValue(),
                this.companyConfig.websiteUrl.getValue(),
                this.companyConfig.iconUrl.getValue(),
                dto.code,
                dto.ttlFormatted,
                ipClient
            )
        );
        return await this.templateRendererService.render(template);
    }

}