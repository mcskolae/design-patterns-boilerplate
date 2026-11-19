import { BorrowBook } from "../application/use-cases/BorrowBook";
import { RegisterMember } from "../application/use-cases/RegisterMember";
import { ReturnBook } from "../application/use-cases/ReturnBook";
import { SystemClock } from "./clock/SystemClock";
import { InMemoryBookCopyRepository } from "./persistence/in-memory/InMemoryBookCopyRepository";
import { InMemoryLoanRepository } from "./persistence/in-memory/InMemoryLoanRepository";
import { InMemoryMemberRepository } from "./persistence/in-memory/InMemoryMemberRepository";

export function createContainer() {
    const memberRepository = new InMemoryMemberRepository();
    const bookCopyRepository = new InMemoryBookCopyRepository();
    const loanRepository = new InMemoryLoanRepository();
    const clock = new SystemClock();

    return {
        registerMember: new RegisterMember(memberRepository),
        borrowBook: new BorrowBook(memberRepository, bookCopyRepository, loanRepository, clock),
        returnBook: new ReturnBook(bookCopyRepository, loanRepository, clock),
    };
}
