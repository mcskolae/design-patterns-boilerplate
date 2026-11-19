import { DomainError } from "./DomainError";

export class InvalidLastNameError extends DomainError {
  public constructor() {
    super("Invalid last name.");
  }
}
