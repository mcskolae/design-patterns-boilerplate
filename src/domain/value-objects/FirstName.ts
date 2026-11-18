import InvalidFirstNameError from "../errors/InvalidFirstNameError";

class FirstName {
  private constructor(private readonly value: string) {
  }

  /** @throws InvalidFirstNameError si la valeur est vide après suppression des espaces de bord. */
  public static from(raw: string): FirstName {
    const normalized = raw.trim();

    if (normalized.length === 0) {
      throw new InvalidFirstNameError();
    }

    return new FirstName(normalized);
  }

  public equals(other: FirstName): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}

export default FirstName;
