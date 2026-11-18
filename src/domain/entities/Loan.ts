import InvalidReturnDateError from "../errors/InvalidReturnDateError";
import LoanAlreadyReturnedError from "../errors/LoanAlreadyReturnedError";
import { LOAN_DURATION_DAYS } from "../rules/LoanRules";
import BookCopyId from "../value-objects/BookCopyId";
import LoanId from "../value-objects/LoanId";
import MemberId from "../value-objects/MemberId";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export interface LoanProps {
  readonly id: LoanId;
  readonly memberId: MemberId;
  readonly copyId: BookCopyId;
  readonly borrowedAt: Date;
  readonly dueAt: Date;
  readonly returnedAt: Date | null;
  readonly lateDays: number | null;
}

function utcDayNumber(date: Date): number {
  return Math.floor(date.getTime() / MILLISECONDS_PER_DAY);
}

function copyDate(date: Date): Date {
  return new Date(date.getTime());
}

class Loan {
  private returnedAt: Date | null;
  private lateDays: number | null;

  private constructor(
    private readonly id: LoanId,
    private readonly memberId: MemberId,
    private readonly copyId: BookCopyId,
    private readonly borrowedAt: Date,
    private readonly dueAt: Date,
    returnedAt: Date | null,
    lateDays: number | null,
  ) {
    this.returnedAt = returnedAt;
    this.lateDays = lateDays;
  }

  public static start(id: LoanId, memberId: MemberId, copyId: BookCopyId, borrowedAt: Date): Loan {
    const dueAt = copyDate(borrowedAt);
    dueAt.setUTCDate(dueAt.getUTCDate() + LOAN_DURATION_DAYS);

    return new Loan(id, memberId, copyId, copyDate(borrowedAt), dueAt, null, null);
  }

  public static restore(props: LoanProps): Loan {
    return new Loan(
      props.id,
      props.memberId,
      props.copyId,
      copyDate(props.borrowedAt),
      copyDate(props.dueAt),
      props.returnedAt === null ? null : copyDate(props.returnedAt),
      props.lateDays,
    );
  }

  /**
   * @throws LoanAlreadyReturnedError si l'emprunt est déjà clôturé.
   * @throws InvalidReturnDateError si `returnedAt` précède la date d'emprunt.
   */
  public markAsReturned(returnedAt: Date): void {
    if (!this.isActive()) {
      throw new LoanAlreadyReturnedError(this.id);
    }

    if (returnedAt.getTime() < this.borrowedAt.getTime()) {
      throw new InvalidReturnDateError(this.id);
    }

    this.returnedAt = copyDate(returnedAt);
    this.lateDays = Math.max(0, utcDayNumber(returnedAt) - utcDayNumber(this.dueAt));
  }

  public isActive(): boolean {
    return this.returnedAt === null;
  }

  public getId(): LoanId {
    return this.id;
  }

  public getMemberId(): MemberId {
    return this.memberId;
  }

  public getCopyId(): BookCopyId {
    return this.copyId;
  }

  public getBorrowedAt(): Date {
    return copyDate(this.borrowedAt);
  }

  public getDueAt(): Date {
    return copyDate(this.dueAt);
  }

  public getReturnedAt(): Date | null {
    return this.returnedAt === null ? null : copyDate(this.returnedAt);
  }

  public getLateDays(): number | null {
    return this.lateDays;
  }
}

export default Loan;
