import DomainError from "./DomainError";

class InvalidLastNameError extends DomainError {
  public constructor() {
    super("Invalid last name.");
  }
}

export default InvalidLastNameError;
