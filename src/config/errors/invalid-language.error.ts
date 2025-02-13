import { HttpStatus } from "@nestjs/common";
import { DomainError } from "../../app/primitives/domain-error";

export class InvalidLanguageError extends DomainError {
    constructor(lang: string, allowedLangs: string) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, 'error.invalid-language', { lang, allowedLangs });
    }
}