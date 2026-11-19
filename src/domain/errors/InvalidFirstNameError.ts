import { DomainError } from "./DomainError";

export class InvalidFirstNameError extends DomainError {
  public constructor() {
    super("Invalid first name.");
  }
}
