import BookCopy from "../entities/BookCopy";
import Loan from "../entities/Loan";
import Member from "../entities/Member";
import LoanLimitReachedError from "../errors/LoanLimitReachedError";
import { hasReachedActiveLoanLimit, MAX_ACTIVE_LOANS } from "../rules/LoanRules";
import LoanId from "../value-objects/LoanId";

export interface LendRequest {
  readonly loanId: LoanId;
  readonly member: Member;
  readonly copy: BookCopy;
  readonly activeLoanCountOfMember: number;
  readonly borrowedAt: Date;
}

class LendingService {
  /**
   * @throws LoanLimitReachedError
   * @throws BookCopyNotAvailableError
   */
  public static lend(request: LendRequest): Loan {
    if (hasReachedActiveLoanLimit(request.activeLoanCountOfMember)) {
      throw new LoanLimitReachedError(request.member.getId(), MAX_ACTIVE_LOANS);
    }

    request.copy.lend();

    return Loan.start(request.loanId, request.member.getId(), request.copy.getId(), request.borrowedAt);
  }
}

export default LendingService;
