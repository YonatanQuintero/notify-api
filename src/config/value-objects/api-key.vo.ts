import { InvalidApiKeyError } from '../errors/invalid-api-key.error';
import { ValueObject } from '../../app/primitives/value-object';

export class ApiKeyVO extends ValueObject {

    private static MIN_LENGTH = 64;
    private constructor(private readonly value: string) {
        super();
    }

    static create(apiKey?: string): ApiKeyVO {
        if (!apiKey || apiKey.trim().length === 0 || apiKey.trim().length < ApiKeyVO.MIN_LENGTH) {
            throw new InvalidApiKeyError(ApiKeyVO.MIN_LENGTH);
        }
        return new ApiKeyVO(apiKey.trim());
    }

    getValue(): string {
        return this.value;
    }
}
