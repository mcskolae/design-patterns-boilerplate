import BookCopyNotFoundError from "../../domain/errors/BookCopyNotFoundError";
import MemberNotFoundError from "../../domain/errors/MemberNotFoundError";
import BookCopyRepositoryInterface from "../../domain/repositories/BookCopyRepositoryInterface";
import LoanRepositoryInterface from "../../domain/repositories/LoanRepositoryInterface";
import MemberRepositoryInterface from "../../domain/repositories/MemberRepositoryInterface";
import LendingService from "../../domain/services/LendingService";
import BookCopyId from "../../domain/value-objects/BookCopyId";
import MemberId from "../../domain/value-objects/MemberId";
import { LoanDto, toLoanDto } from "../dto/LoanDto";
import { BorrowBookCommand, BorrowBookUseCase } from "../ports/in/BorrowBookUseCase";
import ClockInterface from "../ports/out/ClockInterface";
import UnitOfWorkInterface from "../ports/out/UnitOfWorkInterface";

class BorrowBook implements BorrowBookUseCase {
  public constructor(
    private readonly memberRepository: MemberRepositoryInterface,
    private readonly bookCopyRepository: BookCopyRepositoryInterface,
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly clock: ClockInterface,
    private readonly unitOfWork: UnitOfWorkInterface,
  ) {
  }

  public async execute(command: BorrowBookCommand): Promise<LoanDto> {
    const memberId = MemberId.from(command.memberId);
    const copyId = BookCopyId.from(command.copyId);

    return this.unitOfWork.run(async () => {
      const member = await this.memberRepository.findById(memberId);
      if (member === null) {
        throw new MemberNotFoundError(memberId);
      }

      const copy = await this.bookCopyRepository.findById(copyId);
      if (copy === null) {
        throw new BookCopyNotFoundError(copyId);
      }

      const loan = LendingService.lend({
        loanId: await this.loanRepository.nextIdentity(),
        member,
        copy,
        activeLoanCount: await this.loanRepository.countActiveByMemberId(memberId),
        now: this.clock.now(),
      });

      await this.bookCopyRepository.save(copy);
      await this.loanRepository.save(loan);

      return toLoanDto(loan);
    });
  }
}

export default BorrowBook;
