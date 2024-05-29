import express, { Request, Response } from 'express';

// MODEL IMPORTS 
import User from './models/user';

const app = express();

app.use(express.json());

// ROUTES
app.get("/", async (req, res, next) => {
    // res.send("Test")
    const users = await User.getAllUsers();
    res.json({ users });
})

export default app;