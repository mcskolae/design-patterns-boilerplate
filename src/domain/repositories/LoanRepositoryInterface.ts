import Loan from "../entities/Loan";
import NewLoan from "../entities/NewLoan";

interface LoanRepositoryInterface {
  countActiveByUserId(userId: number): Promise<number>;

  findActiveByBookId(bookId: number): Promise<Loan | null>;

  /** @throws BookNotAvailableError */
  create(loan: NewLoan): Promise<Loan>;

  update(loan: Loan): Promise<void>;
}

export default LoanRepositoryInterface;
