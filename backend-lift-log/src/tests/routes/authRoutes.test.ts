"use strict";

import app from "../../app";
import {
    commonAfterAll,
    commonAfterEach,
    commonBeforeAll,
    commonBeforeEach
} from "../testCommon";

import request from "supertest";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Testing auth routes", () => {

    describe("POST /auth/signup", () => {
        test("Return 400 with missing information", async () => {
            const res = await request(app)
                .post("/auth/signup")
                .send({
                    "firstName": "First",
                    "lastName": "",
                    "heightFeet": 5,
                    "heightInches": 10,
                    "weight": 180,
                    "bodyType": "ectomorph",
                    "goal": "gain weight",
                    "username": "test-user",
                    "email": "test-user@gmail.com",
                    "password": "password"
                })
            expect(res.status).toBe(400);
        });

        test("Return 200 with successful signup", async () => {

        })

    })
})
