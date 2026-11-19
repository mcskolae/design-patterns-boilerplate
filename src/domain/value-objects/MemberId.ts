import { InvalidIdentifierError } from "../errors/InvalidIdentifierError";

export class MemberId {
  private constructor(private readonly value: number) {
  }

  /** @throws InvalidIdentifierError */
  public static from(value: number): MemberId {
    if (!Number.isInteger(value) || value <= 0) {
      throw new InvalidIdentifierError("MemberId", value);
    }

    return new MemberId(value);
  }

  public toNumber(): number {
    return this.value;
  }

  public toString(): string {
    return String(this.value);
  }
}
