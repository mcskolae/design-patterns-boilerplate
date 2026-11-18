import Loan from "../../../domain/entities/Loan";
import LoanRepositoryInterface from "../../../domain/repositories/LoanRepositoryInterface";
import BookCopyId from "../../../domain/value-objects/BookCopyId";
import LoanId from "../../../domain/value-objects/LoanId";
import LoanReturn from "../../../domain/value-objects/LoanReturn";
import MemberId from "../../../domain/value-objects/MemberId";

interface LoanRecord {
  readonly id: number;
  readonly memberId: number;
  readonly copyId: number;
  readonly borrowedAt: string;
  readonly dueAt: string;
  readonly returnedAt: string | null;
  readonly lateDays: number | null;
}

class InMemoryLoanRepository implements LoanRepositoryInterface {
  private readonly records = new Map<number, LoanRecord>();
  private lastId = 0;

  public async nextIdentity(): Promise<LoanId> {
    this.lastId += 1;

    return LoanId.from(this.lastId);
  }

  public async countActiveByMemberId(memberId: MemberId): Promise<number> {
    let count = 0;

    for (const record of this.records.values()) {
      if (record.memberId === memberId.toNumber() && record.returnedAt === null) {
        count += 1;
      }
    }

    return count;
  }

  public async findActiveByCopyId(copyId: BookCopyId): Promise<Loan | null> {
    for (const record of this.records.values()) {
      if (record.copyId === copyId.toNumber() && record.returnedAt === null) {
        return InMemoryLoanRepository.toDomain(record);
      }
    }

    return null;
  }

  public async save(loan: Loan): Promise<void> {
    const record = InMemoryLoanRepository.toRecord(loan);
    this.records.set(record.id, record);
  }

  private static toDomain(record: LoanRecord): Loan {
    return Loan.restore({
      id: LoanId.from(record.id),
      memberId: MemberId.from(record.memberId),
      copyId: BookCopyId.from(record.copyId),
      borrowedAt: new Date(record.borrowedAt),
      dueAt: new Date(record.dueAt),
      loanReturn: record.returnedAt === null || record.lateDays === null
        ? null
        : LoanReturn.restore(new Date(record.returnedAt), record.lateDays),
    });
  }

  private static toRecord(loan: Loan): LoanRecord {
    const loanReturn = loan.getReturn();

    return {
      id: loan.getId().toNumber(),
      memberId: loan.getMemberId().toNumber(),
      copyId: loan.getCopyId().toNumber(),
      borrowedAt: loan.getBorrowedAt().toISOString(),
      dueAt: loan.getDueAt().toISOString(),
      returnedAt: loanReturn === null ? null : loanReturn.getReturnedAt().toISOString(),
      lateDays: loanReturn === null ? null : loanReturn.getLateDays(),
    };
  }
}

export default InMemoryLoanRepository;
