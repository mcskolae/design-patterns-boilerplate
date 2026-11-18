import BorrowBook from "../application/use-cases/BorrowBook";
import RegisterMember from "../application/use-cases/RegisterMember";
import ReturnBook from "../application/use-cases/ReturnBook";
import BookCopy from "../domain/entities/BookCopy";
import BookCopyId from "../domain/value-objects/BookCopyId";
import SystemClock from "./clock/SystemClock";
import type { UseCases } from "./http/routes";
import InMemoryBookCopyRepository from "./persistence/in-memory/InMemoryBookCopyRepository";
import InMemoryLoanRepository from "./persistence/in-memory/InMemoryLoanRepository";
import InMemoryMemberRepository from "./persistence/in-memory/InMemoryMemberRepository";
import InMemoryUnitOfWork from "./persistence/in-memory/InMemoryUnitOfWork";

const DEMO_BOOK_COPY_IDS = [1, 2, 3, 4, 5];

export async function createContainer(): Promise<UseCases> {
    const memberRepository = new InMemoryMemberRepository();
    const bookCopyRepository = new InMemoryBookCopyRepository();
    const loanRepository = new InMemoryLoanRepository();
    const clock = new SystemClock();
    const unitOfWork = new InMemoryUnitOfWork();

    for (const id of DEMO_BOOK_COPY_IDS) {
        await bookCopyRepository.save(BookCopy.restore({ id: BookCopyId.from(id), available: true }));
    }

    return {
        registerMember: new RegisterMember(memberRepository, unitOfWork),
        borrowBook: new BorrowBook(memberRepository, bookCopyRepository, loanRepository, clock, unitOfWork),
        returnBook: new ReturnBook(bookCopyRepository, loanRepository, clock, unitOfWork),
    };
}
