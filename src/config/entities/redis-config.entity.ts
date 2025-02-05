import { UrlVO } from "src/common/value-objects/url.vo";
import { PortVO } from "../value-objects/port.vo";
import { NonEmptyStringVO } from "src/common/value-objects/non-empty-string.vo";
import { RedisDBVO } from "../value-objects/redis-db.vo";

export class RedisConfig {
    private constructor(
        public readonly url: UrlVO,
        public readonly port: PortVO,
        public readonly host: NonEmptyStringVO,
        public readonly db: RedisDBVO
    ) { }

    static create(
        url: string,
        port: number,
        host: string,
        dbIndex: number
    ): RedisConfig {
        return new RedisConfig(
            UrlVO.create(url),
            PortVO.create(port),
            NonEmptyStringVO.create(host),
            RedisDBVO.create(dbIndex)
        )
    }
}