import Loan from "../../domain/entities/Loan";
import NewLoan from "../../domain/entities/NewLoan";
import BookNotAvailableError from "../../domain/errors/BookNotAvailableError";
import BookNotFoundError from "../../domain/errors/BookNotFoundError";
import LoanLimitReachedError from "../../domain/errors/LoanLimitReachedError";
import UserNotFoundError from "../../domain/errors/UserNotFoundError";
import BookRepositoryInterface from "../../domain/repositories/BookRepositoryInterface";
import LoanRepositoryInterface from "../../domain/repositories/LoanRepositoryInterface";
import UserRepositoryInterface from "../../domain/repositories/UserRepositoryInterface";
import { MAX_ACTIVE_LOANS } from "../../domain/rules/LoanRules";
import ClockInterface from "../../domain/services/ClockInterface";

export interface BorrowBookInput {
  userId: number;
  bookId: number;
}

class BorrowBook {
  public constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly bookRepository: BookRepositoryInterface,
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly clock: ClockInterface,
  ) {
  }

  /**
   * @throws UserNotFoundError
   * @throws BookNotFoundError
   * @throws LoanLimitReachedError
   * @throws BookNotAvailableError
   */
  public async execute(input: BorrowBookInput): Promise<Loan> {
    const user = await this.userRepository.findById(input.userId);
    if (user === null) {
      throw new UserNotFoundError();
    }

    const book = await this.bookRepository.findById(input.bookId);
    if (book === null) {
      throw new BookNotFoundError();
    }

    const activeLoans = await this.loanRepository.countActiveByUserId(user.getId());
    if (activeLoans >= MAX_ACTIVE_LOANS) {
      throw new LoanLimitReachedError();
    }

    const activeLoan = await this.loanRepository.findActiveByBookId(book.getId());
    if (activeLoan !== null) {
      throw new BookNotAvailableError();
    }

    const newLoan = NewLoan.new(user.getId(), book.getId(), this.clock.now());

    return this.loanRepository.create(newLoan);
  }
}

export default BorrowBook;
