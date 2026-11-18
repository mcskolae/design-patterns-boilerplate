import LoanId from "../value-objects/LoanId";
import DomainError from "./DomainError";

class InvalidReturnDateError extends DomainError {
  public constructor(public readonly loanId: LoanId) {
    super(`Return date of loan ${loanId.toString()} is before its borrow date.`);
  }
}

export default InvalidReturnDateError;
