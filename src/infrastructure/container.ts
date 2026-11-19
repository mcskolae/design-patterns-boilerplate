import { BookCopy } from "../domain/entities/BookCopy";
import { BookCopyId } from "../domain/value-objects/BookCopyId";
import { BorrowBook } from "../application/use-cases/BorrowBook/BorrowBook";
import { RegisterMember } from "../application/use-cases/RegisterMember/RegisterMember";
import { ReturnBook } from "../application/use-cases/ReturnBook/ReturnBook";
import { SystemClock } from "./clock/SystemClock";
import { InMemoryBookCopyRepository } from "./persistence/in-memory/InMemoryBookCopyRepository";
import { InMemoryLoanRepository } from "./persistence/in-memory/InMemoryLoanRepository";
import { InMemoryMemberRepository } from "./persistence/in-memory/InMemoryMemberRepository";

const INITIAL_BOOK_COPY_COUNT = 5;

function initialBookCopies(): BookCopy[] {
    return Array.from({ length: INITIAL_BOOK_COPY_COUNT }, (_, index) =>
        BookCopy.restore({ id: BookCopyId.from(index + 1), available: true }),
    );
}

export function createContainer() {
    const memberRepository = new InMemoryMemberRepository();
    const bookCopyRepository = new InMemoryBookCopyRepository(initialBookCopies());
    const loanRepository = new InMemoryLoanRepository();
    const clock = new SystemClock();

    return {
        registerMember: new RegisterMember(memberRepository),
        borrowBook: new BorrowBook(memberRepository, bookCopyRepository, loanRepository, clock),
        returnBook: new ReturnBook(bookCopyRepository, loanRepository, clock),
    };
}
