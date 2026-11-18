import { ReturnedLoanDto } from "../../dto/LoanDto";

export interface ReturnBookCommand {
  readonly copyId: number;
}

export interface ReturnBookUseCase {
  /**
   * @throws InvalidIdentifierError
   * @throws BookCopyNotFoundError
   * @throws NoActiveLoanError
   * @throws LoanAlreadyReturnedError
   * @throws InvalidReturnDateError
   */
  execute(command: ReturnBookCommand): Promise<ReturnedLoanDto>;
}
