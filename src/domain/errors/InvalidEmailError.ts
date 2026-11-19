import { DomainError } from "./DomainError";

export class InvalidEmailError extends DomainError {
  public constructor() {
    super("Invalid email.");
  }
}
