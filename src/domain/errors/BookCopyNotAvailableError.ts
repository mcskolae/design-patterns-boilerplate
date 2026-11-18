import BookCopyId from "../value-objects/BookCopyId";
import DomainError from "./DomainError";

class BookCopyNotAvailableError extends DomainError {
  public constructor(public readonly copyId: BookCopyId) {
    super(`Book copy ${copyId.toString()} is not available.`);
  }
}

export default BookCopyNotAvailableError;
