import DomainError from "./DomainError";

class UserNotFoundError extends DomainError {
  public constructor() {
    super("User not found.");
  }
}

export default UserNotFoundError;
