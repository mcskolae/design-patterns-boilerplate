import Email from "../value-objects/Email";
import DomainError from "./DomainError";

class EmailAlreadyExistsError extends DomainError {
  public constructor(public readonly email: Email) {
    super(`Email ${email.toString()} already exists.`);
  }
}

export default EmailAlreadyExistsError;
