"use strict";

import app from "../../app";
import {
    commonAfterAll,
    commonAfterEach,
    commonBeforeAll,
    commonBeforeEach
} from "../testCommon";

import request from "supertest";
import { cyanBright, yellowBright } from "chalk"

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe(cyanBright("\nTesting auth controller"), () => {
    describe(yellowBright("Endpoint: /auth/signup"), () => {
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

    describe(yellowBright("Endpoint: /auth/login"), () => {
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

        test("Expect 401 on unauthorized login: Wrong password", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({
                    username: "user1",
                    password: "wrong-password"
                });

            expect(res.status).toBe(401);
            expect(res.body).toMatchObject({
                error: 'Unauthorized',
                messages: ['Invalid username/password'],
                context: {}
            });
        });

        test("Expect 401 on unauthorized login: Wrong username", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({
                    username: "wrong-username",
                    password: "password"
                });

            expect(res.status).toBe(401);
            expect(res.body).toMatchObject({
                error: 'Unauthorized',
                messages: ['Invalid username/password'],
                context: {}
            });
        });

        test("Expect 400 with empty inputs on login", async () => {
            const res = await request(app)
                .post("/auth/login")
                .send({
                    username: "",
                    password: ""
                });

            expect(res.status).toBe(400);
            expect(res.body).toMatchObject({
                zod: 'Zod error',
                error: 'Invalid data',
                messages: ['Please enter a username', 'Please enter a password']
            });
        });

    });
});
