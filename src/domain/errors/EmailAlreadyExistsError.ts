import DomainError from "./DomainError";

class EmailAlreadyExistsError extends DomainError {
  public constructor() {
    super("Email already exists.");
  }
}

export default EmailAlreadyExistsError;
