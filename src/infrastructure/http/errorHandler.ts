import type { NextFunction, Request, Response } from "express";
import BookCopyNotAvailableError from "../../domain/errors/BookCopyNotAvailableError";
import BookCopyNotFoundError from "../../domain/errors/BookCopyNotFoundError";
import DomainError from "../../domain/errors/DomainError";
import EmailAlreadyExistsError from "../../domain/errors/EmailAlreadyExistsError";
import InvalidEmailError from "../../domain/errors/InvalidEmailError";
import InvalidFirstNameError from "../../domain/errors/InvalidFirstNameError";
import InvalidIdentifierError from "../../domain/errors/InvalidIdentifierError";
import InvalidLastNameError from "../../domain/errors/InvalidLastNameError";
import LoanAlreadyReturnedError from "../../domain/errors/LoanAlreadyReturnedError";
import MemberNotFoundError from "../../domain/errors/MemberNotFoundError";
import NoActiveLoanError from "../../domain/errors/NoActiveLoanError";
import BadRequestError from "./BadRequestError";

function statusOf(error: DomainError): number {
  if (
    error instanceof InvalidEmailError
    || error instanceof InvalidFirstNameError
    || error instanceof InvalidLastNameError
    || error instanceof InvalidIdentifierError
  ) {
    return 400;
  }

  if (error instanceof MemberNotFoundError || error instanceof BookCopyNotFoundError) {
    return 404;
  }

  if (
    error instanceof EmailAlreadyExistsError
    || error instanceof BookCopyNotAvailableError
    || error instanceof NoActiveLoanError
    || error instanceof LoanAlreadyReturnedError
  ) {
    return 409;
  }

  return 422;
}

export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction): void {
  if (error instanceof BadRequestError) {
    response.status(400).json({ error: error.name, message: error.message });
    return;
  }

  if (error instanceof DomainError) {
    response.status(statusOf(error)).json({ error: error.name, message: error.message });
    return;
  }

  console.error(error);
  response.status(500).json({ error: "InternalServerError", message: "Internal server error." });
}
