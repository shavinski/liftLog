"use strict";

import db from "../db";
import User from "../models/user";
import { createToken } from "../helpers/tokens";

export let u1Token = "";
// export let u2Token = "";

export async function commonBeforeAll() {
    let res = await db.query("SELECT * FROM users;");
    console.log("RUNNIN COMMON BEFORE ALL \n\n BEFORE DELETION\n", res.rows);
    await db.query("DELETE FROM users");
    // await db.query(`
    //     TRUNCATE TABLE users, programs, program_exercises, exercises RESTART IDENTITY CASCADE;
    // `);
    // await db.query("DELETE FROM users");

    // Set up User 1 account for testing 
    const user1 = await User.signup({
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

    const user1Result = await User.getSingleUserData(user1.username);
    const user1Id = user1Result.userId;
    u1Token = createToken({ username: "u1", userId: user1Id, isAdmin: false });

    // db.query(`
    //     INSERT INTO
    //         programs(title, user_id)
    //     VALUES
    //         ('Test Bench Day', $1);
    //     `, [user1Id]);

    // db.query(`
    //     INSERT INTO
    //         program_exercises(program_id, exercise_id)
    //     VALUES
    //         (1, 1),
    //         (1, 2),
    //         (1, 3);
    //     `);

    // TODO: Create a create programs method for users

    // Set up User 2 account for testing 
    // const user2 = await User.signup({
    //     "firstName": "F2",
    //     "lastName": "L2",
    //     "heightFeet": 6,
    //     "heightInches": 0,
    //     "weight": 180,
    //     "bodyType": "ectomorph",
    //     "goal": "gain weight",
    //     "username": "user2",
    //     "email": "user2@gmail.com",
    //     "password": "password",
    //     "isAdmin": false
    // });

    // const user2Result = await User.getSingleUserData(user2.username);
    // const user2Id = user2Result.userId;
    // u2Token = createToken({ username: "u1", userId: user2Id, isAdmin: false });
}

export async function commonBeforeEach() {
    await db.query("BEGIN")
}

export async function commonAfterEach() {
    await db.query("ROLLBACK");
}

export async function commonAfterAll() {
    await db.end();
}



