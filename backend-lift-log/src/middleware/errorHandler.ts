"use strict";

import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { ZodError } from "zod";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Handled custom errors
    if (err instanceof CustomError) {
        const { statusCode, errors, logging } = err;
        if (logging) {
            console.error(JSON.stringify({
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack,
            }, null, 2));
        }

        return res.status(statusCode).send({ ...errors });
    }

    // Handles Zod errors, we will return early to avoid getting console logs for Zod errors
    else if (err instanceof ZodError) {
        return;
    }

    // Unhandled errors
    console.error("UH OH", JSON.stringify(err, null, 2));
    return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};