import express, { Request, Response } from 'express';
import cors from 'cors';
import { NotFoundError } from './expressErrors';
import { PORT } from './config';

// ROUTE IMPORTS 
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import programRouter from './routes/programRoutes';

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
app.use(function (req, res, next) {
    throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use((err: Error, req: Request, res: Response) => {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    const status = (err as any).status || 500; // Cast err to any to access status property
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        error: { message, status },
    });
});

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;