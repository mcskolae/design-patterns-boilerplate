class Loan {
  private constructor(
    private readonly id: number,
    private readonly userId: number,
    private readonly bookId: number,
    private readonly borrowedAt: Date,
    private readonly dueAt: Date,
    private readonly returnedAt: Date | null,
    private readonly lateDays: number | null,
  ) {
  }

  public static from(
    id: number,
    userId: number,
    bookId: number,
    borrowedAt: Date,
    dueAt: Date,
    returnedAt: Date | null,
    lateDays: number | null,
  ): Loan {
    return new Loan(id, userId, bookId, borrowedAt, dueAt, returnedAt, lateDays);
  }

  public isActive(): boolean {
    return this.returnedAt === null;
  }

  public getId(): number {
    return this.id;
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

  public getReturnedAt(): Date | null {
    return this.returnedAt;
  }

  public getLateDays(): number | null {
    return this.lateDays;
  }
}

export default Loan;
