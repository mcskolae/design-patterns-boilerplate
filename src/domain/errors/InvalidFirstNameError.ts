import DomainError from "./DomainError";

class InvalidFirstNameError extends DomainError {
  public constructor() {
    super("Invalid first name.");
  }
}

export default InvalidFirstNameError;
