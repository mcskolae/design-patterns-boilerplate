import { Router } from "express";
import { BorrowBookUseCase } from "../../application/ports/in/BorrowBookUseCase";
import { RegisterMemberUseCase } from "../../application/ports/in/RegisterMemberUseCase";
import { ReturnBookUseCase } from "../../application/ports/in/ReturnBookUseCase";
import { readNumber, readString } from "./requestBody";

export interface UseCases {
  readonly registerMember: RegisterMemberUseCase;
  readonly borrowBook: BorrowBookUseCase;
  readonly returnBook: ReturnBookUseCase;
}

export function createRoutes(useCases: UseCases): Router {
  const router = Router();

  router.post("/members", async (request, response) => {
    const member = await useCases.registerMember.execute({
      email: readString(request.body, "email"),
      lastName: readString(request.body, "lastName"),
      firstName: readString(request.body, "firstName"),
    });

    response.status(201).json(member);
  });

  router.post("/loans", async (request, response) => {
    const loan = await useCases.borrowBook.execute({
      memberId: readNumber(request.body, "memberId"),
      copyId: readNumber(request.body, "copyId"),
    });

    response.status(201).json(loan);
  });

  router.post("/returns", async (request, response) => {
    const loan = await useCases.returnBook.execute({
      copyId: readNumber(request.body, "copyId"),
    });

    response.status(200).json(loan);
  });

  return router;
}
