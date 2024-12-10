"use strict";

import db from "../db";
import User from "../models/user";
import { createToken } from "../helpers/tokens";

export async function commonBeforeAll() {
    await db.query("DELETE FROM users");

    await User.signup({
        "firstName": "F1",
        "lastName": "L1",
        "heightFeet": 5,
        "heightInches": 9,
        "weight": 162,
        "bodyType": "ectomorph",
        "goal": "gain weight",
        "username": "user1",
        "email": "user1@gmail.com",
        "password": "password",
        "isAdmin": false
    });
    await User.signup({
        "firstName": "F2",
        "lastName": "L2",
        "heightFeet": 6,
        "heightInches": 0,
        "weight": 180,
        "bodyType": "ectomorph",
        "goal": "gain weight",
        "username": "user2",
        "email": "user2@gmail.com",
        "password": "password",
        "isAdmin": false
    });
    await User.signup({
        "firstName": "F3",
        "lastName": "L3",
        "heightFeet": 5,
        "heightInches": 0,
        "weight": 120,
        "bodyType": "ectomorph",
        "goal": "gain weight",
        "username": "user3",
        "email": "user3@gmail.com",
        "password": "password",
        "isAdmin": false
    });
    // TODO:
    // Input user programs and program exercises for testing
}

export async function commonBeforeEach() {
    await db.query("BEGIN");
}

export async function commonAfterEach() {
    await db.query("ROLLBACK");
}

export async function commonAfterAll() {
    await db.end();
}

// TODO: Will need to query and get the correct user id and put in the token
export const u1Token = createToken({ username: "u1", isAdmin: false });
export const u2Token = createToken({ username: "u2", isAdmin: false });


