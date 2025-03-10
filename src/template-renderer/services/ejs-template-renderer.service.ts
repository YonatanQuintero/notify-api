import { Injectable, Logger } from '@nestjs/common'
import { AbstractTemplateRendererService } from '../abstracts/template-renderer.service.abstract'
import { TemplateRenderer } from '../entities/template-renderer.entity'
import * as path from 'path'
import * as ejs from 'ejs'

@Injectable()
export class EJSTemplateRendererService extends AbstractTemplateRendererService {
  readonly logger = new Logger(EJSTemplateRendererService.name)
  async render (templateRenderer: TemplateRenderer): Promise<string> {
    try {
      const resolvedPath = path.resolve(
        process.cwd(),
        'src/template-renderer/templates/ejs/partials/base.layout.ejs'
      )

      const renderedTemplate = await ejs.renderFile(resolvedPath, {
        lang: templateRenderer.language.getValue(),
        templateName: templateRenderer.name.getValue(),
        ...templateRenderer.params
      })
      return renderedTemplate
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error)
      this.logger.error(`Error rendering template: ${message}`)
      throw error
    }
  }
}
