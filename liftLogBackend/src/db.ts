import { Client } from "pg";

const db = new Client({
    user: 'jakob',
    host: 'localhost',
    database: 'lift_log_api',
    password: process.env.PGPASSWORD,
    port: 5432,
})

db.connect();

export default db;