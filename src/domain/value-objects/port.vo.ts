import { ValueObject } from '../primitives/value-object';

export class PortVO extends ValueObject {
  private constructor(private readonly value: number) {
    super();
  }

  static create(port?: number): PortVO {
    if (port == null || isNaN(port)) {
      throw new Error('PortVO: Port must be a number.');
    }
    if (port <= 0 || port > 65535) {
      throw new Error(`PortVO: Invalid port number ${port}. Must be between 1 and 65535.`);
    }
    return new PortVO(port);
  }

  getValue(): number {
    return this.value;
  }
}
