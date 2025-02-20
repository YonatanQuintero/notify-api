import { InvalidRedisDBError } from 'src/config/errors/invalid-redis-db.error'
import { RedisDBVO } from 'src/config/value-objects/redis-db.vo'

describe('RedisDBVO', () => {
  it('should create a RedisDBVO instance with valid db index 0', () => {
    const vo = RedisDBVO.create(0)
    expect(vo.getValue()).toBe(0)
  })

  it('should create a RedisDBVO instance with valid db index 15', () => {
    const vo = RedisDBVO.create(15)
    expect(vo.getValue()).toBe(15)
  })

  it('should create a RedisDBVO instance with valid db index 5', () => {
    const vo = RedisDBVO.create(5)
    expect(vo.getValue()).toBe(5)
  })

  it('should throw InvalidRedisDBError for negative db index', () => {
    expect(() => {
      RedisDBVO.create(-1)
    }).toThrow(InvalidRedisDBError)
  })

  it('should throw InvalidRedisDBError for db index greater than 15', () => {
    expect(() => {
      RedisDBVO.create(16)
    }).toThrow(InvalidRedisDBError)
  })
})
