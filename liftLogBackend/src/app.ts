import express, { Request, Response } from 'express';
import pool from './db';

const app = express();
const PORT = 3000;

app.use(express.json());

// ROUTES
app.get("/", async (req, res, next) => {
    res.send('Test');
})

export default app;