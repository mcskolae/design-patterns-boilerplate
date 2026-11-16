import DomainError from "./DomainError";

class BookNotAvailableError extends DomainError {
  public constructor() {
    super("Book not available.");
  }
}

export default BookNotAvailableError;
