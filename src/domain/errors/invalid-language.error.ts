import { LanguageEnum } from "../enums/language.enum";
import { DomainError } from "../primitives/domain-error";

export class InvalidLanguageError extends DomainError {
    constructor(lang: string) {
        super(
            'INVALID_LANGUAGE',
            `Invalid language "${lang}". Allowed values: ${Object.values(LanguageEnum).join(', ')}.`
        );
    }
}