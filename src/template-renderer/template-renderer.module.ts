import { Module } from '@nestjs/common';
import { AbstractTemplateRendererService } from './abstracts/template-renderer.service.abstract';
import { EJSTemplateRendererService } from './services/ejs-template-renderer.service';
import { TemplateViewerController } from './controllers/template-viewer.controller';

@Module({
    providers: [{
        provide: AbstractTemplateRendererService,
        useClass: EJSTemplateRendererService
    }],
    exports: [
        AbstractTemplateRendererService
    ],
    controllers: [
        TemplateViewerController
    ]
})
export class TemplateRendererModule { }
