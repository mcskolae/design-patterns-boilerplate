import { InvalidIdentifierError } from "../errors/InvalidIdentifierError";

export class BookCopyId {
  private constructor(private readonly value: number) {
  }

  /** @throws InvalidIdentifierError */
  public static from(value: number): BookCopyId {
    if (!Number.isInteger(value) || value <= 0) {
      throw new InvalidIdentifierError("BookCopyId", value);
    }

    return new BookCopyId(value);
  }

  public toNumber(): number {
    return this.value;
  }

  public toString(): string {
    return String(this.value);
  }
}
