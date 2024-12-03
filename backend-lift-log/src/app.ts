"use strict";

// Global dependencies
import express, { Request, Response } from 'express';
import cors from 'cors';
import "express-async-errors";

// ROUTE IMPORTS 
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import programRouter from './routes/programRoutes';

// Project Dependencies
import { PORT } from './config';
import { errorHandler } from './middleware/errors';


const app = express();

app.use(express.json());
app.use(cors());

// ROUTES
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/programs', programRouter)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post("/test", async (req: Request, res: Response) => {
    res.send("Testing this for coverage")
});

/** Handle 404 errors -- this matches everything */
// app.use(function (req, res, next) {
//     throw new NotFoundError();
// });

app.use(errorHandler)

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;