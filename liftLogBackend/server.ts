import express, {Express, Request, Response} from "express";
const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from me now on TS, change this")
});

app.get("/hi", (req, res) => {
    res.send("Test? maybe?")
});

app.listen(PORT, () => {
    console.log(`Now listening on ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});