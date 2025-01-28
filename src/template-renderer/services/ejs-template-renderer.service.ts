import { Injectable, Logger } from "@nestjs/common";
import { AbstractTemplateRendererService } from "../abstracts/template-renderer.service.abstract";
import { TemplateRenderer } from "../entities/template-renderer.entity";
import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';

@Injectable()
export class EJSTemplateRendererService extends AbstractTemplateRendererService {


    render(templateRenderer: TemplateRenderer): string {
        try {

            const bodyPartialPath = path.join(
                __dirname,
                'templates',
                'ejs',
                templateRenderer.type.getValue(),
                templateRenderer.language.getValue(),
                'template.ejs'
            );

            const layoutData = {
                params: Object.fromEntries(templateRenderer.params),
                bodyPartialPath,
            }

            const layoutFilePath = path.join(
                __dirname,
                'templates',
                'ejs',
                'partials',
                'base.layout.ejs'
            );

            const layoutFileContent = fs.readFileSync(layoutFilePath, 'utf8');

            return ejs.render(layoutFileContent, layoutData,{
                filename: layoutFilePath
            });


        } catch (error) {
            Logger.error(`Error rendering template: ${error.message}`);
            throw error;
        }
    }
}