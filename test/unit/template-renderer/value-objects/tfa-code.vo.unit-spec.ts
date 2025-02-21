import { InvalidTFACodeError } from 'src/template-renderer/errors/invalid-tfa-code.error'
import { TFACodeVO } from 'src/template-renderer/value-objects/tfa-code.vo'

describe('TFACodeVO', () => {
  it('should throw an error if code is undefined', () => {
    expect(() => TFACodeVO.create(undefined)).toThrow(InvalidTFACodeError)
  })

  it('should throw an error if code is null', () => {
    expect(() => TFACodeVO.create(null as any)).toThrow(InvalidTFACodeError)
  })

  it('should throw an error if code is NaN', () => {
    expect(() => TFACodeVO.create(NaN)).toThrow(InvalidTFACodeError)
  })

  it('should throw an error if code has less than 6 digits', () => {
    expect(() => TFACodeVO.create(12345)).toThrow(InvalidTFACodeError)
  })

  it('should throw an error if code has more than 6 digits', () => {
    expect(() => TFACodeVO.create(1234567)).toThrow(InvalidTFACodeError)
  })

  it('should create a TFACodeVO instance when provided a valid 6-digit number', () => {
    const validCode = 123456
    const vo = TFACodeVO.create(validCode)
    expect(vo).toBeInstanceOf(TFACodeVO)
    expect(vo.getValue()).toBe(validCode)
  })
})
