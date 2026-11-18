import { ActiveLoanDto } from "../../dto/LoanDto";

export interface BorrowBookCommand {
  readonly memberId: number;
  readonly copyId: number;
}

export interface BorrowBookUseCase {
  /**
   * @throws InvalidIdentifierError
   * @throws MemberNotFoundError
   * @throws BookCopyNotFoundError
   * @throws LoanLimitReachedError
   * @throws BookCopyNotAvailableError
   */
  execute(command: BorrowBookCommand): Promise<ActiveLoanDto>;
}
