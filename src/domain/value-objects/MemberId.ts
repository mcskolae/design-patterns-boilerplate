import InvalidIdentifierError from "../errors/InvalidIdentifierError";

class MemberId {
  private constructor(private readonly value: number) {
  }

  /** @throws InvalidIdentifierError si `value` n'est pas un entier strictement positif. */
  public static from(value: number): MemberId {
    if (!Number.isInteger(value) || value <= 0) {
      throw new InvalidIdentifierError("MemberId", value);
    }

    return new MemberId(value);
  }

  public equals(other: MemberId): boolean {
    return this.value === other.value;
  }

  public toNumber(): number {
    return this.value;
  }

  public toString(): string {
    return String(this.value);
  }
}

export default MemberId;
