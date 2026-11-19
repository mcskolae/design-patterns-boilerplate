import type { ActiveLoanDto, ReturnedLoanDto } from "../../application/dto/LoanDto";
import type { MemberDto } from "../../application/dto/MemberDto";

export interface MemberResponse {
  readonly id: number;
  readonly email: string;
  readonly last_name: string;
  readonly first_name: string;
}

export interface ActiveLoanResponse {
  readonly id: number;
  readonly member_id: number;
  readonly copy_id: number;
  readonly borrowed_at: string;
  readonly due_at: string;
  readonly status: "ACTIVE";
}

export interface ReturnedLoanResponse {
  readonly id: number;
  readonly member_id: number;
  readonly copy_id: number;
  readonly borrowed_at: string;
  readonly due_at: string;
  readonly status: "RETURNED";
  readonly returned_at: string;
  readonly late_days: number;
}

export function normalizeMember(member: MemberDto): MemberResponse {
  return {
    id: member.id,
    email: member.email,
    last_name: member.lastName,
    first_name: member.firstName,
  };
}

export function normalizeActiveLoan(loan: ActiveLoanDto): ActiveLoanResponse {
  return {
    id: loan.id,
    member_id: loan.memberId,
    copy_id: loan.copyId,
    borrowed_at: loan.borrowedAt,
    due_at: loan.dueAt,
    status: loan.status,
  };
}

export function normalizeReturnedLoan(loan: ReturnedLoanDto): ReturnedLoanResponse {
  return {
    id: loan.id,
    member_id: loan.memberId,
    copy_id: loan.copyId,
    borrowed_at: loan.borrowedAt,
    due_at: loan.dueAt,
    status: loan.status,
    returned_at: loan.returnedAt,
    late_days: loan.lateDays,
  };
}
