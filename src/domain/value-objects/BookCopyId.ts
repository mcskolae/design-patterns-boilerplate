import { NumericId } from "./NumericId";

export class BookCopyId extends NumericId {
  private readonly kind = "BookCopyId";

  /** @throws InvalidIdentifierError */
  public static from(value: number): BookCopyId {
    return new BookCopyId(NumericId.ensureValid("BookCopyId", value));
  }
}
