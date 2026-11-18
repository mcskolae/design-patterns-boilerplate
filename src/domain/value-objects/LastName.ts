import InvalidLastNameError from "../errors/InvalidLastNameError";

class LastName {
  private constructor(private readonly value: string) {
  }

  /** @throws InvalidLastNameError si la valeur est vide après suppression des espaces de bord. */
  public static from(raw: string): LastName {
    const normalized = raw.trim();

    if (normalized.length === 0) {
      throw new InvalidLastNameError();
    }

    return new LastName(normalized);
  }

  public equals(other: LastName): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}

export default LastName;
