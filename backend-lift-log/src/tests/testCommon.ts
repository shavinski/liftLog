"use strict";

import db from "../db";
import User from "../models/user";
import { createToken } from "../helpers/tokens";
import { v4 as uuidv4 } from 'uuid';

export let u1Token = "";

export async function commonBeforeAll() {
    // const users = await db.query("SELECT * FROM users");
    // console.log(users.rows);

    const usersBeforeTest = await db.query("SELECT * FROM users");
    console.log("Before test: Users in DB", usersBeforeTest.rows);
    await db.query("DELETE FROM users");

    // Set up User 1 account for testing 
    await User.signup({
        "firstName": "F1",
        "lastName": "L1",
        "heightFeet": 5,
        "heightInches": 9,
        "weight": 162,
        "bodyType": "ectomorph",
        "goal": "gain weight",
        "username": `user${uuidv4}`,
        "email": `user${uuidv4}@gmail.com`,
        "password": "password",
        "isAdmin": false
    });

    const user1Result = await User.getSingleUserData("user1");
    const user1Id = user1Result.userId;
    u1Token = createToken({ username: "u1", userId: user1Id, isAdmin: false });
}

export async function commonBeforeEach() {
    await db.query("START TRANSACTION")
}

export async function commonAfterEach() {
    await db.query("ROLLBACK");
}

export async function commonAfterAll() {
    await db.end();
}



