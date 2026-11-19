import { Loan } from "../entities/Loan";
import { BookCopyId } from "../value-objects/BookCopyId";
import { LoanId } from "../value-objects/LoanId";
import { MemberId } from "../value-objects/MemberId";

export interface LoanRepositoryInterface {
  nextIdentity(): Promise<LoanId>;

  countActiveByMemberId(memberId: MemberId): Promise<number>;

  findActiveByCopyId(copyId: BookCopyId): Promise<Loan | null>;

  save(loan: Loan): Promise<void>;
}
