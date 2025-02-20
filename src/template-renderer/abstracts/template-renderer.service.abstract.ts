import { Injectable } from '@nestjs/common'
import { TemplateRenderer } from '../entities/template-renderer.entity'

@Injectable()
export abstract class AbstractTemplateRendererService {
  abstract render (templateRenderer: TemplateRenderer): Promise<string>
}
