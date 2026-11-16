import Loan from "../../domain/entities/Loan";
import NoActiveLoanError from "../../domain/errors/NoActiveLoanError";
import LoanRepositoryInterface from "../../domain/repositories/LoanRepositoryInterface";
import ClockInterface from "../../domain/services/ClockInterface";

export interface ReturnBookInput {
  bookId: number;
}

class ReturnBook {
  public constructor(
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly clock: ClockInterface,
  ) {
  }

  /**
   * @throws NoActiveLoanError
   */
  public async execute(input: ReturnBookInput): Promise<Loan> {
    const activeLoan = await this.loanRepository.findActiveByBookId(input.bookId);
    if (activeLoan === null) {
      throw new NoActiveLoanError();
    }

    const returnedLoan = activeLoan.markAsReturned(this.clock.now());

    await this.loanRepository.update(returnedLoan);

    return returnedLoan;
  }
}

export default ReturnBook;
