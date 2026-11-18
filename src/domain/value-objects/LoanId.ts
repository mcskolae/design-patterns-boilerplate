import InvalidIdentifierError from "../errors/InvalidIdentifierError";

class LoanId {
  private constructor(private readonly value: number) {
  }

  /** @throws InvalidIdentifierError si `value` n'est pas un entier strictement positif. */
  public static from(value: number): LoanId {
    if (!Number.isInteger(value) || value <= 0) {
      throw new InvalidIdentifierError("LoanId", value);
    }

    return new LoanId(value);
  }

  public equals(other: LoanId): boolean {
    return this.value === other.value;
  }

  public toNumber(): number {
    return this.value;
  }

  public toString(): string {
    return String(this.value);
  }
}

export default LoanId;
