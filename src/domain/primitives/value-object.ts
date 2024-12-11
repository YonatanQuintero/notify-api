// domain/primitives/value-object.ts
export abstract class ValueObject {

    equals(other: ValueObject): boolean {
      if (other == null) {
        return false;
      }
  
      if (this.constructor !== other.constructor) {
        return false;
      }
  
      const thisProps = Object.getOwnPropertyNames(this);
      const otherProps = Object.getOwnPropertyNames(other);
  
      if (thisProps.length !== otherProps.length) {
        return false;
      }
  
      for (const prop of thisProps) {
        const thisValue = (this as any)[prop];
        const otherValue = (other as any)[prop];
  
        if (thisValue instanceof ValueObject && otherValue instanceof ValueObject) {
          if (!thisValue.equals(otherValue)) {
            return false;
          }
        } else if (thisValue !== otherValue) {
          return false;
        }
      }
  
      return true;
    }
  
    public toString(): string {
      return JSON.stringify(this);
    }
  }
  