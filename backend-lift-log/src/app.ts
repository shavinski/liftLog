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
import { errorHandler } from './middleware/errorHandler';


const app = express();

app.use(express.json());
app.use(cors());


// ROUTES
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/programs', programRouter)

// ERROR HANDLER MIDDLEWARE, WILL RUN THROUGHOUT WHOLE APPLICATION
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Lift Log API');
});

app.post("/test", async (req: Request, res: Response) => {
    res.send("Testing this for coverage")
});

export default app;