import { Client } from "pg";
import { getDatabaseUri } from "./config";

require('dotenv').config();

const db = new Client({
    connectionString: getDatabaseUri(),
    user: 'jakob',
    host: 'localhost',
    database: 'lift_log_api',
    password: 'password',
    port: 5432,
})

db.connect();

export default db;