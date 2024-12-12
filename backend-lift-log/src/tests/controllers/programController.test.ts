"use strict";

import app from "../../app";
import {
    commonAfterAll,
    commonAfterEach,
    commonBeforeEach,
    u1Token
} from "../testCommon";

import request from "supertest";
import { yellowBright } from "chalk"

describe(yellowBright("Endpoint: /programs"), () => {
   
    beforeEach(commonBeforeEach); 
    afterEach(commonAfterEach);
    afterAll(commonAfterAll);

    describe("User with no workout programs", () => {
        it("200 with a user getting all their programs (NO PROGRAMS)", async () => {
            const res = await request(app)
                .get("/programs")
                .set("Authorization", `Bearer ${u1Token}`)

            expect(res.body).toMatchObject({
                programs: []
            });
        });
    });
});

