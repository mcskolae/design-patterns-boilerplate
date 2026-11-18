import Loan from "../../domain/entities/Loan";

export interface LoanDto {
  readonly id: number;
  readonly memberId: number;
  readonly copyId: number;
  readonly borrowedAt: string;
  readonly dueAt: string;
  readonly returnedAt: string | null;
  readonly lateDays: number | null;
}

export function toLoanDto(loan: Loan): LoanDto {
  const returnedAt = loan.getReturnedAt();

  return {
    id: loan.getId().toNumber(),
    memberId: loan.getMemberId().toNumber(),
    copyId: loan.getCopyId().toNumber(),
    borrowedAt: loan.getBorrowedAt().toISOString(),
    dueAt: loan.getDueAt().toISOString(),
    returnedAt: returnedAt === null ? null : returnedAt.toISOString(),
    lateDays: loan.getLateDays(),
  };
}
