import Loan from "../../domain/entities/Loan";
import LoanReturn from "../../domain/value-objects/LoanReturn";

interface LoanDtoBase {
  readonly id: number;
  readonly memberId: number;
  readonly copyId: number;
  readonly borrowedAt: string;
  readonly dueAt: string;
}

export interface ActiveLoanDto extends LoanDtoBase {
  readonly status: "ACTIVE";
}

export interface ReturnedLoanDto extends LoanDtoBase {
  readonly status: "RETURNED";
  readonly returnedAt: string;
  readonly lateDays: number;
}

function toLoanDtoBase(loan: Loan): LoanDtoBase {
  return {
    id: loan.getId().toNumber(),
    memberId: loan.getMemberId().toNumber(),
    copyId: loan.getCopyId().toNumber(),
    borrowedAt: loan.getBorrowedAt().toISOString(),
    dueAt: loan.getDueAt().toISOString(),
  };
}

export function toActiveLoanDto(loan: Loan): ActiveLoanDto {
  return { ...toLoanDtoBase(loan), status: "ACTIVE" };
}

export function toReturnedLoanDto(loan: Loan, loanReturn: LoanReturn): ReturnedLoanDto {
  return {
    ...toLoanDtoBase(loan),
    status: "RETURNED",
    returnedAt: loanReturn.getReturnedAt().toISOString(),
    lateDays: loanReturn.getLateDays(),
  };
}
