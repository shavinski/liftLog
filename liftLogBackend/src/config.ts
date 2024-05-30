"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();

export const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

export const PORT = process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
export function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? process.env.DATABASE_URL_TEST
        : process.env.DATABASE_URL || "postgresql:///jobly";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
export const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Lift Log Config:");
console.log("SECRET_KEY:", SECRET_KEY);
console.log("PORT:", PORT.toString());
console.log("BCRYPT_WORK_FACTOR", BCRYPT_WORK_FACTOR);
console.log("Database:", getDatabaseUri());
console.log("---");

export default {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
};