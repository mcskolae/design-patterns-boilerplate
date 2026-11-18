import { LoanDto } from "../../dto/LoanDto";

export interface ReturnBookCommand {
  readonly copyId: number;
}

export interface ReturnBookUseCase {
  /**
   * @throws InvalidIdentifierError
   * @throws BookCopyNotFoundError
   * @throws NoActiveLoanError
   */
  execute(command: ReturnBookCommand): Promise<LoanDto>;
}
