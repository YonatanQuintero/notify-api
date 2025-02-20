import { InvalidPortError } from '../errors/invalid-port.error'
import { ValueObject } from '../../app/primitives/value-object'

export class PortVO extends ValueObject {
  private constructor (private readonly value: number) {
    super()
  }

  static create (port?: number): PortVO {
    if (port == null || isNaN(port)) {
      throw new InvalidPortError(NaN)
    }
    if (port <= 0 || port > 65535) {
      throw new InvalidPortError(port)
    }
    return new PortVO(port)
  }

  getValue (): number {
    return this.value
  }
}
