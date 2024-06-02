import express, { Request, Response } from 'express';
import cors from 'cors';

// MODEL IMPORTS 
import User from './models/user';

const app = express();

app.use(express.json());
app.use(cors());

// ROUTES
app.get("/", async (req, res, next) => {
    const users = await User.getAllUsers();
    res.json({ users });
})

app.get("/create/account", async (req, res, next) => {
    res.json("test");
})

app.post('/create/account', async (req, res, next) => {
    console.log(req.body.formData);
    const createUser = await User.createAccount(req.body.formData);
    return res.status(201).json({ createUser });
})

export default app;