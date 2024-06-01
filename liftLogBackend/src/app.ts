import express, { Request, Response } from 'express';

// MODEL IMPORTS 
import User from './models/user';

const app = express();

app.use(express.json());

// ROUTES
app.get("/", async (req, res, next) => {
    const users = await User.getAllUsers();
    res.json({ users });
})

app.get("/create/account", async (req, res, next) => {
    const users = await User.getAllUsers();
    res.json({ users });
})

app.post('/create/account', async (req, res, next) => {
    const createUser = await User.createAccount(req.body);
    return res.status(201).json({ createUser });
})

export default app;