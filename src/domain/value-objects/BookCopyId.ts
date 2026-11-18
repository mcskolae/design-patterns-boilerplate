import InvalidIdentifierError from "../errors/InvalidIdentifierError";

class BookCopyId {
  private constructor(private readonly value: number) {
  }

  /** @throws InvalidIdentifierError si `value` n'est pas un entier strictement positif. */
  public static from(value: number): BookCopyId {
    if (!Number.isInteger(value) || value <= 0) {
      throw new InvalidIdentifierError("BookCopyId", value);
    }

    return new BookCopyId(value);
  }

  public equals(other: BookCopyId): boolean {
    return this.value === other.value;
  }

  public toNumber(): number {
    return this.value;
  }

  public toString(): string {
    return String(this.value);
  }
}

export default BookCopyId;
