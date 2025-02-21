import { InvalidPortError } from 'src/config/errors/invalid-port.error'
import { PortVO } from '../../../../src/config/value-objects/port.vo'

describe('PortVO', () => {
  it('should create a PortVO for a valid port number', () => {
    const vo = PortVO.create(3000)
    expect(vo).toBeInstanceOf(PortVO)
    expect(vo.getValue()).toBe(3000)
  })

  it('should allow port 1 (lowest valid port)', () => {
    const vo = PortVO.create(1)
    expect(vo.getValue()).toBe(1)
  })

  it('should allow port 65535 (highest valid port)', () => {
    const vo = PortVO.create(65535)
    expect(vo.getValue()).toBe(65535)
  })

  it('should throw an error if the port is zero', () => {
    expect(() => PortVO.create(0)).toThrow(InvalidPortError)
  })

  it('should throw an error if the port is negative', () => {
    expect(() => PortVO.create(-1)).toThrow(InvalidPortError)
  })

  it('should throw an error if the port is greater than 65535', () => {
    expect(() => PortVO.create(70000)).toThrow(InvalidPortError)
  })

  it('should throw an error if the port is not a number', () => {
    expect(() => PortVO.create(NaN)).toThrow(InvalidPortError)
  })

  it('should consider two PortVOs equal if they have the same port number', () => {
    const vo1 = PortVO.create(8080)
    const vo2 = PortVO.create(8080)
    expect(vo1.equals(vo2)).toBe(true)
  })

  it('should consider two PortVOs not equal if they have different port numbers', () => {
    const vo1 = PortVO.create(3000)
    const vo2 = PortVO.create(3001)
    expect(vo1.equals(vo2)).toBe(false)
  })
})
