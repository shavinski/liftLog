"use strict";

import db from "../db";
import User from "../models/user";
import { createToken } from "../helpers/tokens";

export let u1Token = "";


export async function commonBeforeEach() {
    await db.query("DELETE FROM users");
    await db.query("START TRANSACTION");

    // Set up User 1 account for testing 
    await User.signup({
        "firstName": "F1",
        "lastName": "L1",
        "heightFeet": 5,
        "heightInches": 9,
        "weight": 162,
        "bodyType": "ectomorph",
        "goal": "gain weight",
        "username": `user1`,
        "email": `user1@gmail.com`,
        "password": "password",
        "isAdmin": false
    });

    const user1Result = await User.getSingleUserData("user1");
    const user1Id = user1Result.userId;
    u1Token = createToken({ username: "u1", userId: user1Id, isAdmin: false });
}

export async function commonAfterEach() {
    await db.query("ROLLBACK");
}

export async function commonAfterAll() {
    console.log("ENDING TEST DB CONNECTION");
    await db.end();
}



