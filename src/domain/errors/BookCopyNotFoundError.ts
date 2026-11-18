import BookCopyId from "../value-objects/BookCopyId";
import DomainError from "./DomainError";

class BookCopyNotFoundError extends DomainError {
  public constructor(public readonly copyId: BookCopyId) {
    super(`Book copy ${copyId.toString()} not found.`);
  }
}

export default BookCopyNotFoundError;
