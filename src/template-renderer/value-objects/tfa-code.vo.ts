import { ValueObject } from "src/common/primitives/value-object";
import { InvalidTFACodeError } from "../errors/invalid-tfa-code.error";

export class TFACodeVO extends ValueObject {
    private constructor(private readonly value: number) {
        super();
    }

    static create(code?: number): TFACodeVO {
        if (code == null || isNaN(code)) {
            throw new InvalidTFACodeError(NaN);
        }

        const codeStr = code.toString();
        if (!(codeStr.length === 6 && /^\d+$/.test(codeStr))) {
            throw new InvalidTFACodeError(code);
        }

        return new TFACodeVO(code);
    }

    getValue(): number {
        return this.value;
    }
}
