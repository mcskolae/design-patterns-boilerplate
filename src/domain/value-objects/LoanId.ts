import { NumericId } from "./NumericId";

export class LoanId extends NumericId {
  private readonly kind = "LoanId";

  /** @throws InvalidIdentifierError */
  public static from(value: number): LoanId {
    return new LoanId(NumericId.ensureValid("LoanId", value));
  }
}
