import Loan from "../entities/Loan";
import NewLoan from "../entities/NewLoan";

interface LoanRepositoryInterface {
  countActiveByUserId(userId: number): Promise<number>;

  findActiveByBookId(bookId: number): Promise<Loan | null>;

  /** @throws BookNotAvailableError */
  create(loan: NewLoan): Promise<Loan>;
}

export default LoanRepositoryInterface;
