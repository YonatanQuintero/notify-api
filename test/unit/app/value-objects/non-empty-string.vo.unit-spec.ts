import { NonEmptyStringError } from 'src/app/errors/non-empty-string.error'
import { NonEmptyStringVO } from '../../../../src/app/value-objects/non-empty-string.vo'

describe('NonEmptyStringVO', () => {
  it('should create a NonEmptyStringVO for a valid non-empty string', () => {
    const vo = NonEmptyStringVO.create('Hello World')
    expect(vo).toBeInstanceOf(NonEmptyStringVO)
    expect(vo.getValue()).toBe('Hello World')
  })

  it('should trim leading and trailing whitespace', () => {
    const vo = NonEmptyStringVO.create('   Trim me   ')
    expect(vo.getValue()).toBe('Trim me')
  })

  it('should throw an error if the value is empty', () => {
    expect(() => NonEmptyStringVO.create('')).toThrow(NonEmptyStringError)
  })

  it('should throw an error if the value is only whitespace', () => {
    expect(() => NonEmptyStringVO.create('   ')).toThrow(NonEmptyStringError)
  })

  it('should consider two NonEmptyStringVOs equal if they have the same value', () => {
    const vo1 = NonEmptyStringVO.create('Equal')
    const vo2 = NonEmptyStringVO.create('Equal')
    expect(vo1.equals(vo2)).toBe(true)
  })

  it('should consider two NonEmptyStringVOs not equal if they have different values', () => {
    const vo1 = NonEmptyStringVO.create('Hello')
    const vo2 = NonEmptyStringVO.create('World')
    expect(vo1.equals(vo2)).toBe(false)
  })
})
