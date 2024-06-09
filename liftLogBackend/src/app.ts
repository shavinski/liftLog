import express, { Request, Response } from 'express';
import cors from 'cors';

// MODEL IMPORTS 
import User from './models/user';
import userRouter from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use(cors());

// ROUTES
app.use('/user', userRouter);



app.get("/", async (req, res, next) => {
    const users = await User.getAllUsers();
    res.json({ users });
})

// app.get("/create/account", async (req, res, next) => {
//     res.json("test");
// })

// app.post('/create/account', async (req, res, next) => {
//     const createUser = await User.createAccount(req.body);
//     return res.status(201).json({ createUser });
// });

// app.post('/create/account/part-1-account-information', async (req, res, next) => {
//     // const createUser = await User.createAccount(req.body);
//     try {
//         const validateForm = User.validatePartOneForm(req.body);
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json(error)
//     };

//     return res.status(201).json("All good!");
// });


export default app;