import { InvalidUrlError } from 'src/app/errors/invalid-url.error'
import { NonEmptyStringError } from 'src/app/errors/non-empty-string.error'
import { RedisConfig } from 'src/config/entities/redis-config.entity'
import { InvalidPortError } from 'src/config/errors/invalid-port.error'
import { InvalidRedisDBError } from 'src/config/errors/invalid-redis-db.error'

describe('RedisConfig', () => {
  it('should create a RedisConfig instance with valid inputs', () => {
    const url = 'redis://localhost:6379/0'
    const port = 6379
    const host = 'localhost'
    const dbIndex = 0

    const redisConfig = RedisConfig.create(url, port, host, dbIndex)

    expect(redisConfig).toBeInstanceOf(RedisConfig)
    expect(redisConfig.url.getValue()).toBe(url)
    expect(redisConfig.port.getValue()).toBe(port)
    expect(redisConfig.host.getValue()).toBe(host)
    expect(redisConfig.db.getValue()).toBe(dbIndex)
  })

  it('should throw an error when given an invalid URL', () => {
    const invalidUrl = 'invalid-url'
    const port = 6379
    const host = 'localhost'
    const dbIndex = 0

    expect(() => {
      RedisConfig.create(invalidUrl, port, host, dbIndex)
    }).toThrow(InvalidUrlError)
  })

  it('should throw an error when given an invalid port', () => {
    const url = 'http://localhost'
    const invalidPort = -1
    const host = 'localhost'
    const dbIndex = 0

    expect(() => {
      RedisConfig.create(url, invalidPort, host, dbIndex)
    }).toThrow(InvalidPortError)
  })

  it('should throw an error when host is empty', () => {
    const url = 'http://localhost'
    const port = 6379
    const emptyHost = ''
    const dbIndex = 0

    expect(() => {
      RedisConfig.create(url, port, emptyHost, dbIndex)
    }).toThrow(NonEmptyStringError)
  })

  it('should throw an error when db index is out of range', () => {
    const url = 'http://localhost'
    const port = 6379
    const host = 'localhost'
    const invalidDbIndex = 16 // RedisDBVO only accepts values between 0 and 15

    expect(() => {
      RedisConfig.create(url, port, host, invalidDbIndex)
    }).toThrow(InvalidRedisDBError)
  })
})
