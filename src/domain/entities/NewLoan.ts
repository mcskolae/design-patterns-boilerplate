import { LOAN_DURATION_DAYS } from "../rules/LoanRules";

class NewLoan {
  private constructor(
    private readonly userId: number,
    private readonly bookId: number,
    private readonly borrowedAt: Date,
    private readonly dueAt: Date,
  ) {
  }

  public static new(userId: number, bookId: number, borrowedAt: Date): NewLoan {
    const dueAt = new Date(borrowedAt);
    dueAt.setUTCDate(dueAt.getUTCDate() + LOAN_DURATION_DAYS);

    return new NewLoan(userId, bookId, borrowedAt, dueAt);
  }

  public getUserId(): number {
    return this.userId;
  }

  public getBookId(): number {
    return this.bookId;
  }

  public getBorrowedAt(): Date {
    return this.borrowedAt;
  }

  public getDueAt(): Date {
    return this.dueAt;
  }
}

export default NewLoan;
