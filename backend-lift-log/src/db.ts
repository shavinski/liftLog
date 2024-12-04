"use strict";

import { Client } from "pg";
import { getDatabaseUri } from "./config";

require('dotenv').config();

const db = new Client({
    connectionString: getDatabaseUri(),
})

db.connect();

export default db;