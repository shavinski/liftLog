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
    describe(yellowBright("Endpoint: /programs"), () => {
        test("Expect 200 with a user getting all their programs", async () => {
            const res = await request(app)
                .get("/programs");

                // TODO: 
                // will need to pass in a token into header in order to get the 
                // required information 
            console.log(res);
        })
    });
});