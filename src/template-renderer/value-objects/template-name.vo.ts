import { TemplateNameEnum } from "../enums/template-name.enum";
import { InvalidTemplateNameError } from "../errors/invalid-template-name.error";
import { ValueRequiredError } from "../../common/errors/value-required.error";
import { ValueObject } from "../../common/primitives/value-object";

export class TemplateNameVO extends ValueObject {

    private constructor(private readonly value: TemplateNameEnum) {
        super();
    }

    static create(name?: string | TemplateNameEnum): TemplateNameVO {
        if (!name) {
            throw new ValueRequiredError('Template Name');
        }

        if (typeof name === 'string') {
            const trimmed = name.trim() as TemplateNameEnum;
            if (!Object.values(TemplateNameEnum).includes(trimmed)) {
                throw new InvalidTemplateNameError(name);
            }
            return new TemplateNameVO(trimmed);
        }

        return new TemplateNameVO(name);
    }

    getValue(): TemplateNameEnum {
        return this.value;
    }
}