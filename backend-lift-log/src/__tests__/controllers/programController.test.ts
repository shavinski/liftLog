"use strict";

import { number } from "zod";
import app from "../../app";
import db from "../../db";
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

    describe("User adding workout programs", () => {
        it("should return 200 on creation of workout program", async () => {
            const res = await request(app)
                .post("/programs")
                .set("Authorization", `Bearer ${u1Token}`)
                .send({
                    "title": "Test workout program"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject({
                "program": {
                    "title": "Test workout program",
                    "userId": expect.any(Number)
                },
                "message": "Successfully created a workout program"
            });
        });

        it("should return 200 with extra white spaces and trim input", async () => {
            const res = await request(app)
                .post("/programs")
                .set("Authorization", `Bearer ${u1Token}`)
                .send({
                    "title": "  Test and trim input  "
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject({
                "program": {
                    "title": "Test and trim input",
                    "userId": expect.any(Number)
                },
                "message": "Successfully created a workout program"
            });
        });

        it("should return 400 with missing title (zod error)", async () => {
            const res = await request(app)
                .post("/programs")
                .set("Authorization", `Bearer ${u1Token}`)
                .send({
                    "title": ""
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toMatchObject({
                "error": "Invalid data",
                "messages": ["A title is required."],
                "zod": "Zod error",
            });
        });

        it("should return 400 with missing title (custom error)", async () => {
            const res = await request(app)
                .post("/programs")
                .set("Authorization", `Bearer ${u1Token}`)
                .send({
                    "title": "    "
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toMatchObject({
                "messages": ["A title is required."],
            });
        });

    });
});

