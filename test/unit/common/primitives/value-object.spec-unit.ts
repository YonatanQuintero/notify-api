import { ValueObject } from "src/common/primitives/value-object";

// A simple concrete subclass for testing
class TestValueObject extends ValueObject {
  constructor(private readonly value: any) {
    super();
  }

  protected getValue(): any {
    return this.value;
  }
}

// Another subclass to test type differences
class OtherValueObject extends ValueObject {
  constructor(private readonly value: any) {
    super();
  }

  protected getValue(): any {
    return this.value;
  }
}

// A subclass extending TestValueObject with an extra property to simulate differing property counts
class ExtendedTestValueObject extends TestValueObject {
  constructor(value: any, private readonly extra: any) {
    super(value);
  }
}

describe('ValueObject', () => {
  it('should return true when comparing the same instance', () => {
    const obj = new TestValueObject('abc');
    expect(obj.equals(obj)).toBe(true);
  });

  it('should return true for two distinct instances with the same value', () => {
    const obj1 = new TestValueObject('abc');
    const obj2 = new TestValueObject('abc');
    expect(obj1.equals(obj2)).toBe(true);
  });

  it('should return false for two instances with different values', () => {
    const obj1 = new TestValueObject('abc');
    const obj2 = new TestValueObject('def');
    expect(obj1.equals(obj2)).toBe(false);
  });

  it('should return false when compared with null', () => {
    const obj = new TestValueObject('abc');
    expect(obj.equals(null as any)).toBe(false);
  });

  it('should return false when comparing objects of different subclasses even with same internal value', () => {
    const obj1 = new TestValueObject('abc');
    const obj2 = new OtherValueObject('abc');
    expect(obj1.equals(obj2)).toBe(false);
  });

  it('should return false when property counts differ', () => {
    const obj1 = new TestValueObject('abc');
    const obj2 = new ExtendedTestValueObject('abc', 'extra');
    expect(obj1.equals(obj2)).toBe(false);
  });

  it('toString should return a valid JSON string representation of the value object', () => {
    const obj = new TestValueObject('abc');
    const str = obj.toString();
    const parsed = JSON.parse(str);
    // The JSON string should include the property "value" with the correct value.
    expect(parsed.value).toBe('abc');
  });
});
