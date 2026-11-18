import LoanId from "../value-objects/LoanId";
import DomainError from "./DomainError";

class LoanAlreadyReturnedError extends DomainError {
  public constructor(public readonly loanId: LoanId) {
    super(`Loan ${loanId.toString()} is already returned.`);
  }
}

export default LoanAlreadyReturnedError;
