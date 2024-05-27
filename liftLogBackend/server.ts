import express, { Express, Request, Response } from "express";

const app = express();

const hostname = "localhost"
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello from me now on TS, change this")
});

app.get("/hi", (req, res) => {
    res.send("Test? maybe?")
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry, the page you are looking for does not exist.");
});

app.listen(PORT, () => {
    console.log(`\n\nServer running at http://${hostname}:${PORT}`);
});