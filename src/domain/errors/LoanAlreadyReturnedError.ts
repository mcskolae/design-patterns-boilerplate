import { LoanId } from "../value-objects/LoanId";
import { DomainError } from "./DomainError";

export class LoanAlreadyReturnedError extends DomainError {
  public constructor(public readonly loanId: LoanId) {
    super(`Loan ${loanId.toString()} is already returned.`);
  }
}
