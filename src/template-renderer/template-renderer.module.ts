import { Module } from '@nestjs/common';
import { AbstractTemplateRendererService } from './abstracts/template-renderer.service.abstract';
import { EJSTemplateRendererService } from './services/ejs-template-renderer.service';

@Module({
    providers: [{
        provide: AbstractTemplateRendererService,
        useClass: EJSTemplateRendererService
    }],
    exports: [
        AbstractTemplateRendererService
    ],
})
export class TemplateRendererModule { }
