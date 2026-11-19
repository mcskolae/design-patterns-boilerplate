import { InvalidIdentifierError } from "../errors/InvalidIdentifierError";

export abstract class NumericId {
  protected constructor(private readonly value: number) {
  }

  /** @throws InvalidIdentifierError */
  protected static ensureValid(identifierType: string, value: number): number {
    if (!Number.isInteger(value) || value <= 0) {
      throw new InvalidIdentifierError(identifierType, value);
    }

    return value;
  }

  public toNumber(): number {
    return this.value;
  }

  public toString(): string {
    return String(this.value);
  }
}
