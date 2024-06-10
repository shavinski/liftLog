import express, { Request, Response } from 'express';
import cors from 'cors';
import { NotFoundError } from './expressErrors';

// ROUTE IMPORTS 
import userRouter from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use(cors());

// ROUTES
app.use('/user', userRouter);


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
    console.log('Server is running on port 3000');
});

export default app;