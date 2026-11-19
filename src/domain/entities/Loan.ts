import { LoanAlreadyReturnedError } from "../errors/LoanAlreadyReturnedError";
import { computeDueDate } from "../rules/LoanRules";
import { BookCopyId } from "../value-objects/BookCopyId";
import { LoanId } from "../value-objects/LoanId";
import { LoanReturn } from "../value-objects/LoanReturn";
import { MemberId } from "../value-objects/MemberId";

export interface LoanProps {
  readonly id: LoanId;
  readonly memberId: MemberId;
  readonly copyId: BookCopyId;
  readonly borrowedAt: Date;
  readonly dueAt: Date;
  readonly loanReturn: LoanReturn | null;
}

function copyDate(date: Date): Date {
  return new Date(date.getTime());
}

export class Loan {
  private loanReturn: LoanReturn | null;

  private constructor(
    private readonly id: LoanId,
    private readonly memberId: MemberId,
    private readonly copyId: BookCopyId,
    private readonly borrowedAt: Date,
    private readonly dueAt: Date,
    loanReturn: LoanReturn | null,
  ) {
    this.loanReturn = loanReturn;
  }

  public static start(id: LoanId, memberId: MemberId, copyId: BookCopyId, borrowedAt: Date): Loan {
    return new Loan(id, memberId, copyId, copyDate(borrowedAt), computeDueDate(borrowedAt), null);
  }

  public static restore(props: LoanProps): Loan {
    return new Loan(
      props.id,
      props.memberId,
      props.copyId,
      copyDate(props.borrowedAt),
      copyDate(props.dueAt),
      props.loanReturn,
    );
  }

  /** @throws LoanAlreadyReturnedError */
  public markAsReturned(returnedAt: Date): LoanReturn {
    if (this.loanReturn !== null) {
      throw new LoanAlreadyReturnedError(this.id);
    }

    this.loanReturn = LoanReturn.record(returnedAt, this.dueAt);

    return this.loanReturn;
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

  public getReturn(): LoanReturn | null {
    return this.loanReturn;
  }
}
