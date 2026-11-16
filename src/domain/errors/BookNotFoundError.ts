import DomainError from "./DomainError";

class BookNotFoundError extends DomainError {
  public constructor() {
    super("Book not found.");
  }
}

export default BookNotFoundError;
