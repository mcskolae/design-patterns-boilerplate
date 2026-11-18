import express, { type Express } from "express";
import { errorHandler } from "./http/errorHandler";
import { createRoutes, type UseCases } from "./http/routes";

export function createApp(useCases: UseCases): Express {
    const app = express();

    app.disable("x-powered-by");
    app.use(express.json());

    app.get("/health", (_request, response) => {
        response.status(200).json({ status: "ok" });
    });

    app.use(createRoutes(useCases));
    app.use(errorHandler);

    return app;
}
