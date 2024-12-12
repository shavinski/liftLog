"use strict";

import app from "../../app";
import {
    commonAfterAll,
    commonAfterEach,
    commonBeforeEach,
    u1Token
} from "../testCommon";

import request from "supertest";

describe("Endpoint: /programs", () => {

    beforeEach(commonBeforeEach);
    afterEach(commonAfterEach);
    afterAll(commonAfterAll);

    describe("User with no workout programs", () => {
        it("should return 200 even if no programs exist", async () => {
            const res = await request(app)
                .get("/programs")
                .set("Authorization", `Bearer ${u1Token}`)

            expect(res.body).toMatchObject({
                programs: []
            });
        });
    });

    describe("Request with no bearer token or invalid token", () => {
        it("should return 401 with invalid token passed through", async () => {
            const res = await request(app)
                .get("/programs")
                .set("Authorization", `Bearer invalidTokenPassed`)

            expect(res.body).toMatchObject({
                context: {},
                error: "Unauthorized",
                messages: ["Invalid or expired token"],
            });
        });
    });
});

