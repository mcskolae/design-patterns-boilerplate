import { Loan } from "../../../domain/entities/Loan";
import { BookCopyNotFoundError } from "../../../domain/errors/BookCopyNotFoundError";
import { MemberNotFoundError } from "../../../domain/errors/MemberNotFoundError";
import { BookCopyRepositoryInterface } from "../../../domain/repositories/BookCopyRepositoryInterface";
import { LoanRepositoryInterface } from "../../../domain/repositories/LoanRepositoryInterface";
import { MemberRepositoryInterface } from "../../../domain/repositories/MemberRepositoryInterface";
import { ensureActiveLoanLimitNotReached } from "../../../domain/rules/LoanRules";
import { BookCopyId } from "../../../domain/value-objects/BookCopyId";
import { MemberId } from "../../../domain/value-objects/MemberId";
import { ClockInterface } from "../../ports/ClockInterface";
import { BorrowBookCommand } from "./BorrowBookCommand";
import { BorrowBookResult, toBorrowBookResult } from "./BorrowBookResult";

export class BorrowBook {
  public constructor(
    private readonly memberRepository: MemberRepositoryInterface,
    private readonly bookCopyRepository: BookCopyRepositoryInterface,
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly clock: ClockInterface,
  ) {
  }

  /**
   * @throws InvalidIdentifierError
   * @throws MemberNotFoundError
   * @throws BookCopyNotFoundError
   * @throws LoanLimitReachedError
   * @throws BookCopyNotAvailableError
   */
  public async execute(command: BorrowBookCommand): Promise<BorrowBookResult> {
    const memberId = MemberId.from(command.memberId);
    const copyId = BookCopyId.from(command.copyId);

    if (await this.memberRepository.findById(memberId) === null) {
      throw new MemberNotFoundError(memberId);
    }

    const copy = await this.bookCopyRepository.findById(copyId);
    if (copy === null) {
      throw new BookCopyNotFoundError(copyId);
    }

    ensureActiveLoanLimitNotReached(memberId, await this.loanRepository.countActiveByMemberId(memberId));

    copy.lend();

    const loan = Loan.start(await this.loanRepository.nextIdentity(), memberId, copyId, this.clock.now());

    await this.bookCopyRepository.save(copy);
    await this.loanRepository.save(loan);

    return toBorrowBookResult(loan);
  }
}
