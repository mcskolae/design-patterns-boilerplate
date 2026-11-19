import { Router, type Request, type Response } from "express";
import type { BorrowBook } from "../../application/use-cases/BorrowBook";
import type { RegisterMember } from "../../application/use-cases/RegisterMember";
import type { ReturnBook } from "../../application/use-cases/ReturnBook";
import { BadRequestError } from "./errorHandler";
import { normalizeActiveLoan, normalizeMember, normalizeReturnedLoan } from "./normalizers";

function asObject(body: unknown): Record<string, unknown> {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new BadRequestError("Request body must be a JSON object.");
  }

  return body as Record<string, unknown>;
}

function readString(body: unknown, field: string): string {
  const value = asObject(body)[field];

  if (typeof value !== "string") {
    throw new BadRequestError(`Field "${field}" must be a string.`);
  }

  return value;
}

function readNumber(body: unknown, field: string): number {
  const value = asObject(body)[field];

  if (typeof value !== "number") {
    throw new BadRequestError(`Field "${field}" must be a number.`);
  }

  return value;
}

export function createRoutes(registerMember: RegisterMember, borrowBook: BorrowBook, returnBook: ReturnBook): Router {
  const router = Router();

  router.post("/members", async (request: Request, response: Response) => {
    const member = await registerMember.execute({
      email: readString(request.body, "email"),
      lastName: readString(request.body, "last_name"),
      firstName: readString(request.body, "first_name"),
    });

    response.status(201).json(normalizeMember(member));
  });

  router.post("/loans", async (request: Request, response: Response) => {
    const loan = await borrowBook.execute({
      memberId: readNumber(request.body, "member_id"),
      copyId: readNumber(request.body, "copy_id"),
    });

    response.status(201).json(normalizeActiveLoan(loan));
  });

  router.post("/returns", async (request: Request, response: Response) => {
    const loan = await returnBook.execute({
      copyId: readNumber(request.body, "copy_id"),
    });

    response.status(200).json(normalizeReturnedLoan(loan));
  });

  return router;
}