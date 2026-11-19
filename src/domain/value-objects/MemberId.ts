import { NumericId } from "./NumericId";

export class MemberId extends NumericId {
  private readonly kind = "MemberId";

  /** @throws InvalidIdentifierError */
  public static from(value: number): MemberId {
    return new MemberId(NumericId.ensureValid("MemberId", value));
  }
}
