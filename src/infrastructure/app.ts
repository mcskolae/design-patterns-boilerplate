import express, { type Express } from "express";
import type { BorrowBook } from "../application/use-cases/BorrowBook/BorrowBook";
import type { RegisterMember } from "../application/use-cases/RegisterMember/RegisterMember";
import type { ReturnBook } from "../application/use-cases/ReturnBook/ReturnBook";
import { errorHandler } from "./http/errorHandler";
import { createRoutes } from "./http/routes";

export function createApp(registerMember: RegisterMember, borrowBook: BorrowBook, returnBook: ReturnBook): Express {
    const app = express();

    app.disable("x-powered-by");
    app.use(express.json());

    app.get("/health", (_request, response) => {
        response.status(200).json({ status: "ok" });
    });

    app.use(createRoutes(registerMember, borrowBook, returnBook));
    app.use(errorHandler);

    return app;
}
