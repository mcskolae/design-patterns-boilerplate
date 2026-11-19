import { InvalidIdentifierError } from "../errors/InvalidIdentifierError";

export class LoanId {
  private constructor(private readonly value: number) {
  }

  /** @throws InvalidIdentifierError */
  public static from(value: number): LoanId {
    if (!Number.isInteger(value) || value <= 0) {
      throw new InvalidIdentifierError("LoanId", value);
    }

    return new LoanId(value);
  }

  public toNumber(): number {
    return this.value;
  }

  public toString(): string {
    return String(this.value);
  }
}
