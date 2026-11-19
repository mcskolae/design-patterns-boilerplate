import { BookCopyId } from "../value-objects/BookCopyId";
import { DomainError } from "./DomainError";

export class NoActiveLoanError extends DomainError {
  public constructor(public readonly copyId: BookCopyId) {
    super(`No active loan for book copy ${copyId.toString()}.`);
  }
}
