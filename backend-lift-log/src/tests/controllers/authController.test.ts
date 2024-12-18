"use strict";

import app from "../../app";
import db from "../../db";
import {
    commonAfterAll,
    commonAfterEach,
    commonBeforeEach,
    u1Token
} from "../testCommon";

import request from "supertest";

describe("Auth endpoints", () => {

    beforeEach(commonBeforeEach);
    afterEach(commonAfterEach);
    afterAll(commonAfterAll);

    // --------------------- /AUTH/SIGNUP ENDPOINT TEST ----------------------
    describe("Endpoint: /auth/signup", () => {

        describe("Sign up with valid credentials", () => {
            it("should return 200 with successful signup", async () => {
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
        });

        describe("Signup with invalid input fields", () => {
            it("should return 400 with all invalid input fields", async () => {
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

            it("should return 400 with duplicated username and email", async () => {
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
                        "username": "user1",
                        "email": "user1@gmail.com",
                        "password": "password"
                    });

                expect(res.status).toBe(400);
                expect(res.body).toMatchObject({
                    error: 'Bad request',
                    messages: [
                        'User already exists: user1',
                        'Email already in use: user1@gmail.com'
                    ],
                    context: {}
                });
            });

            it("should return 400 with password less than 6 characters", async () => {
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
                        "username": "blahblah",
                        "email": "blah@gmail.com",
                        "password": "1234"
                    });

                expect(res.status).toBe(400);
                expect(res.body).toMatchObject({
                    zod: 'Zod error',
                    error: 'Invalid data',
                    messages: ['Password must be between 6 and 14 characters.']
                });
            });

            it("should return 400 with password more than 14 characters", async () => {
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
                        "username": "blahblah",
                        "email": "blah@gmail.com",
                        "password": "passwordthatistoolongwillreturnanerror"
                    });

                expect(res.status).toBe(400);
                expect(res.body).toMatchObject({
                    zod: 'Zod error',
                    error: 'Invalid data',
                    messages: ['Password must be between 6 and 14 characters.']
                });
            });
        });
    });

    // --------------------- /AUTH/LOGIN ENDPOINT TEST -----------------
    describe("Endpoint: /auth/login", () => {

        describe("Log in with valid credentials", () => {
            it("should return 200 on successful login", async () => {
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
                });
            });
        });

        describe("Log in with invalid credentials", () => {
            it("should return 401 on with valid username but wrong password", async () => {
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

            it("should return 401 on unauthorized login: Non-existent username", async () => {
                const res = await request(app)
                    .post("/auth/login")
                    .send({
                        username: "non-existent-user",
                        password: "password"
                    });

                expect(res.status).toBe(401);
                expect(res.body).toMatchObject({
                    error: 'Unauthorized',
                    messages: ['Invalid username/password'],
                    context: {}
                });
            });

            it("should return 400 with empty inputs on login", async () => {
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
});

