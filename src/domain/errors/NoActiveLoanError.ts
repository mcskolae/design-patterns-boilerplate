import DomainError from "./DomainError";

class NoActiveLoanError extends DomainError {
  public constructor() {
    super("No active loan for this book.");
  }
}

export default NoActiveLoanError;
