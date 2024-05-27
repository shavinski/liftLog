"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const hostname = "localhost";
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Hello from me now on TS, change this");
});
app.get("/hi", (req, res) => {
    res.send("Test? maybe?");
});
app.use(function (req, res, next) {
    res.status(404).send("Sorry, the page you are looking for does not exist.");
});
app.listen(PORT, () => {
    console.log(`\n\nServer running at http://${hostname}:${PORT}`);
});
//# sourceMappingURL=server.js.map