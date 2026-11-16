import DomainError from "./DomainError";

class LoanLimitReachedError extends DomainError {
  public constructor() {
    super("Loan limit reached.");
  }
}

export default LoanLimitReachedError;
