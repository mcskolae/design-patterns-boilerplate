import { MemberId } from "../value-objects/MemberId";
import { DomainError } from "./DomainError";

export class LoanLimitReachedError extends DomainError {
  public constructor(public readonly memberId: MemberId, public readonly limit: number) {
    super(`Member ${memberId.toString()} already has ${limit} active loans.`);
  }
}
