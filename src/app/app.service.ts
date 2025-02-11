import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { NotificationNameEnum } from 'src/notification/enums/notification-name.enum';
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { AbstractTemplateRendererService } from 'src/template-renderer/abstracts/template-renderer.service.abstract';
import { TemplateRenderer } from 'src/template-renderer/entities/template-renderer.entity';
import { CompanyConfig } from 'src/config/entities/company-config.entity';
import { TemplateEntityFactory } from 'src/template-renderer/factories/template-entity.factory';

@Injectable()
export class AppService {

  private readonly companyConfig: CompanyConfig;

  constructor(
    private readonly i18n: I18nService,
    private readonly templateRendererService: AbstractTemplateRendererService,
    private readonly configService: AbstractConfigService,
  ) {
    this.companyConfig = this.configService.getCompanyConfig();
  }

  getHello(): string {
    return this.i18n.t("test.hello-world", { lang: "es-la" });
  }

  async getTemplate(): Promise<string> {

    const params = TemplateEntityFactory.createBase(
      "John Doe",
      this.companyConfig.name.getValue(),
      this.companyConfig.websiteUrl.getValue(),
      this.companyConfig.iconUrl.getValue(),
    );

    const template = TemplateRenderer.create(
      NotificationNameEnum.WELCOME,
      LanguageEnum.EN_US,
      params
    );

    return this.templateRendererService.render(template);

  }

}