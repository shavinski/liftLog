"use strict";

import exp from "constants";
import app from "../../app";
import {
    commonAfterAll,
    commonAfterEach,
    commonBeforeAll,
    commonBeforeEach
} from "../testCommon";

import request from "supertest";
import { string } from "zod";
import { exec } from "child_process";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Testing auth controller", () => {
    describe("Endpoint: /auth/signup", () => {
        test("Expect 200 with successful signup", async () => {
            const res = await request(app)
                .post("/auth/signup")
                .send({
                    "firstName": "First",
                    "lastName": "Last",
                    "heightFeet": 5,
                    "heightInches": 10,
                    "weight": 180,
                    "bodyType": "ectomorph",
                    "goal": "gain weight",
                    "username": "test-user",
                    "email": "test@gmail.com",
                    "password": "password"
                });

            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                message: "Sign up success",
                token: expect.any(String)
            });
        });

        test("Expect 400 with all invalid input fields", async () => {
            const res = await request(app)
                .post("/auth/signup")
                .send({
                    "firstName": "",
                    "lastName": "",
                    "heightFeet": "",
                    "heightInches": "",
                    "weight": "",
                    "bodyType": "",
                    "goal": "",
                    "username": "",
                    "email": "",
                    "password": ""
                })

            expect(res.status).toBe(400);
            expect(res.body).toMatchObject({
                zod: 'Zod error',
                error: 'Invalid data',
                messages: [
                    'First name is required.',
                    'Last name is required.',
                    'Expected number, received string',
                    'Expected number, received string',
                    'Expected number, received string',
                    'Please select at least one body type',
                    'Please select at least one goal.',
                    'Username must contain 3 characters',
                    'Invaild email address',
                    'Password must be between 6 and 14 characters.'
                ]
            });
        });
    });

    describe("Endpoint: /auth/login", () => {
        test("Expect 200 on successful login", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({
                    username: "user1",
                    password: "password"
                });

            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                message: 'Log in success',
                token: expect.any(String)
            })
        })

        test("Expect 403 on unauthorized login", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({
                    username: "user1",
                    password: "password"
                });

            console.log(res.body)
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({

            })
        })
    })
});
