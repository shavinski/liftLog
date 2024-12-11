// "use strict";

// import app from "../../app";
// import {
//     commonAfterAll,
//     commonAfterEach,
//     commonBeforeAll,
//     commonBeforeEach,
//     u1Token,
//     u2Token
// } from "../testCommon";

// import request from "supertest";
// import { cyanBright, yellowBright } from "chalk"

// beforeAll(commonBeforeAll);
// beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);
// afterAll(commonAfterAll);

// describe(cyanBright("\nTesting program controller"), () => {

//     describe(yellowBright("Endpoint: /programs"), () => {

//         test("200 with a user getting all their programs (NO PROGRAMS)", async () => {
//             const res = await request(app)
//                 .get("/programs")
//                 .set("Authorization", `Bearer ${u1Token}`)

//             expect(res.body).toMatchObject({
//                 programs: []
//             });
//         });

//         // test("200 with a user getting all their programs (NO PROGRAMS)", async () => {
//         //     const res = await request(app)
//         //         .get("/programs")
//         //         .set("Authorization", `Bearer ${u1Token}`)

//         //     expect(res.body).toMatchObject({
//         //         programs: []
//         //     });
//         // });
//     });
// });