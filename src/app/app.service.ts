import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { LanguageEnum } from 'src/config/enums/language.enum';
import { TemplateNameEnum } from 'src/template-renderer/enums/template-name.enum';
import { AbstractConfigService } from 'src/config/abstracts/config.service.abstract';
import { AbstractTemplateRendererService } from 'src/template-renderer/abstracts/template-renderer.service.abstract';
import { TemplateRenderer } from 'src/template-renderer/entities/template-renderer.entity';

@Injectable()
export class AppService {

  constructor(
    private readonly i18n: I18nService,
    private readonly templateRendererService: AbstractTemplateRendererService,
    private readonly configService: AbstractConfigService
  ) { }

  getHello(): string {
    return this.i18n.t("test.hello-world", { lang: "es-LA" });
  }

  async getTemplate(): Promise<string> {
    const appConfig = this.configService.getAppConfig();
    return this.templateRendererService.render(
      TemplateRenderer.create(
        TemplateNameEnum.WELCOME,
        LanguageEnum.EN_US,
        new Map([
          ["username", "John Doe"],
          ["companyName", appConfig.companyName.getValue()],
          ["site", appConfig.companyWebsiteUrl.getValue()],
          ["logo", appConfig.companyIconUrl.getValue()],
        ])
      )
    );
  }
}