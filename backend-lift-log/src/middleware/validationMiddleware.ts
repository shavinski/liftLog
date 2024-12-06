"use strict";

// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';

export function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => (
                    `${issue.message}`
                ));

                res.status(StatusCodes.BAD_REQUEST).json({ zod: "Zod error", error: 'Invalid data', messages: errorMessages });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
            }
            console.log(error)
            next(error)
        }
    };
}