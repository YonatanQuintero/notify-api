import { ValueObject } from "src/common/primitives/value-object";
import { InvalidRedisDBError } from "../errors/invalid-redis-db.error";

export class RedisDBVO extends ValueObject {
    private constructor(private readonly value: number) {
        super();
    }

    static create(dbIndex: number): RedisDBVO {
        if (dbIndex < 0 || dbIndex > 15) {
            throw new InvalidRedisDBError(dbIndex);
        }
        return new RedisDBVO(dbIndex);
    }

    getValue(): number {
        return this.value;
    }
}