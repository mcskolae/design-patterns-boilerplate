import DomainError from "./DomainError";

class InvalidEmailError extends DomainError {
  public constructor() {
    super("Invalid email.");
  }
}

export default InvalidEmailError;
