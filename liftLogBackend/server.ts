import express, {Express, Request, Response} from "express";
const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from me")
});

app.listen(PORT, () => {
    console.log(`Now listening on ${PORT}`);
    console.log(`localhost:${PORT}`);
});