import { DomainError } from '../../common/primitives/domain-error';

export class InvalidTemplateBaseError extends DomainError {
    constructor() {
        super('INVALID_TEMPLATE_BASE', `Must be a instance of TemplateBase.`);
    }
}