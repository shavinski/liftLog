import { Client } from "pg";
require('dotenv').config();

const db = new Client({
    user: 'jakob',
    host: 'localhost',
    database: 'lift_log_api',
    password: 'password',
    port: 5432,
})

console.log('password', process.env.PGPASSWORD)
db.connect();

export default db;