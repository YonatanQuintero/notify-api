import { DomainError } from "src/common/primitives/domain-error";
import { TemplateNameEnum } from "../../template-renderer/enums/template-name.enum";

export class InvalidTemplateNameError extends DomainError {
    constructor(name: string) {
        super('INVALID_TEMPLATE_NAME',
            `Invalid template name "${name}". Supported names: ${Object.values(TemplateNameEnum).join(', ')}.`
        );
    }
}