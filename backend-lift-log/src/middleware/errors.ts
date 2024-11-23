import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).send({ errors: [{ message: "Something went wrong" }] })
}
/** Generic error handler; anything unhandled goes here. */
// app.use((err: Error, req: Request, res: Response) => {
//     if (process.env.NODE_ENV !== 'test') console.error(err.stack);
//     const status = (err as any).status || 500; // Cast err to any to access status property
//     const message = err.message || 'Internal Server Error';

//     res.status(status).json({
//         error: { message, status },
//     });
// });