import { DomainError } from "./DomainError";

export class InvalidIdentifierError extends DomainError {
  public constructor(public readonly identifierType: string, public readonly value: number) {
    super(`Invalid ${identifierType}: ${value}.`);
  }
}
