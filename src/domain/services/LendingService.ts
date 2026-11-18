import BookCopy from "../entities/BookCopy";
import Loan from "../entities/Loan";
import Member from "../entities/Member";
import LoanLimitReachedError from "../errors/LoanLimitReachedError";
import { MAX_ACTIVE_LOANS } from "../rules/LoanRules";
import LoanId from "../value-objects/LoanId";

export interface LendRequest {
  readonly loanId: LoanId;
  readonly member: Member;
  readonly copy: BookCopy;
  readonly activeLoanCount: number;
  readonly now: Date;
}

class LendingService {
  /**
   * @throws LoanLimitReachedError
   * @throws BookCopyNotAvailableError
   */
  public static lend(request: LendRequest): Loan {
    if (request.activeLoanCount >= MAX_ACTIVE_LOANS) {
      throw new LoanLimitReachedError(request.member.getId(), MAX_ACTIVE_LOANS);
    }

    request.copy.lend();

    return Loan.start(request.loanId, request.member.getId(), request.copy.getId(), request.now);
  }
}

export default LendingService;
