"use strict";

import app from "./app"
import { PORT } from "./config"
import { yellowBright } from "chalk";


app.listen(PORT, () => {
    console.log(`\nServer has started at:`, yellowBright(`http://localhost:${PORT}`))
})
