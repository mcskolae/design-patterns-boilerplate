import BookCopyNotFoundError from "../../domain/errors/BookCopyNotFoundError";
import NoActiveLoanError from "../../domain/errors/NoActiveLoanError";
import BookCopyRepositoryInterface from "../../domain/repositories/BookCopyRepositoryInterface";
import LoanRepositoryInterface from "../../domain/repositories/LoanRepositoryInterface";
import BookCopyId from "../../domain/value-objects/BookCopyId";
import { ReturnedLoanDto, toReturnedLoanDto } from "../dto/LoanDto";
import { ReturnBookCommand, ReturnBookUseCase } from "../ports/in/ReturnBookUseCase";
import ClockInterface from "../ports/out/ClockInterface";
import UnitOfWorkInterface from "../ports/out/UnitOfWorkInterface";

class ReturnBook implements ReturnBookUseCase {
  public constructor(
    private readonly bookCopyRepository: BookCopyRepositoryInterface,
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly clock: ClockInterface,
    private readonly unitOfWork: UnitOfWorkInterface,
  ) {
  }

  public async execute(command: ReturnBookCommand): Promise<ReturnedLoanDto> {
    const copyId = BookCopyId.from(command.copyId);

    return this.unitOfWork.run(async () => {
      const copy = await this.bookCopyRepository.findById(copyId);
      if (copy === null) {
        throw new BookCopyNotFoundError(copyId);
      }

      const loan = await this.loanRepository.findActiveByCopyId(copyId);
      if (loan === null) {
        throw new NoActiveLoanError(copyId);
      }

      const loanReturn = loan.markAsReturned(this.clock.now());
      copy.giveBack();

      await this.loanRepository.save(loan);
      await this.bookCopyRepository.save(copy);

      return toReturnedLoanDto(loan, loanReturn);
    });
  }
}

export default ReturnBook;
