import { Loan } from "../../../domain/entities/Loan";
import { LoanReturn } from "../../../domain/value-objects/LoanReturn";

export interface ReturnBookResult {
  readonly id: number;
  readonly memberId: number;
  readonly copyId: number;
  readonly borrowedAt: string;
  readonly dueAt: string;
  readonly status: "RETURNED";
  readonly returnedAt: string;
  readonly lateDays: number;
}

export function toReturnBookResult(loan: Loan, loanReturn: LoanReturn): ReturnBookResult {
  return {
    id: loan.getId().toNumber(),
    memberId: loan.getMemberId().toNumber(),
    copyId: loan.getCopyId().toNumber(),
    borrowedAt: loan.getBorrowedAt().toISOString(),
    dueAt: loan.getDueAt().toISOString(),
    status: "RETURNED",
    returnedAt: loanReturn.getReturnedAt().toISOString(),
    lateDays: loanReturn.getLateDays(),
  };
}
