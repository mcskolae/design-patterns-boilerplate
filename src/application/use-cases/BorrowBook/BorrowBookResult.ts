import { Loan } from "../../../domain/entities/Loan";

export interface BorrowBookResult {
  readonly id: number;
  readonly memberId: number;
  readonly copyId: number;
  readonly borrowedAt: string;
  readonly dueAt: string;
  readonly status: "ACTIVE";
}

export function toBorrowBookResult(loan: Loan): BorrowBookResult {
  return {
    id: loan.getId().toNumber(),
    memberId: loan.getMemberId().toNumber(),
    copyId: loan.getCopyId().toNumber(),
    borrowedAt: loan.getBorrowedAt().toISOString(),
    dueAt: loan.getDueAt().toISOString(),
    status: "ACTIVE",
  };
}
