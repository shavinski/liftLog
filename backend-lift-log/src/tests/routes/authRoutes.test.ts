"use strict";

import app from "../../app";
import { commonAfterAll, commonAfterEach, commonBeforeAll, commonBeforeEach } from "../testCommon";


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Testing auth routes", () => {

    describe("POST /auth/signup", () => {
        test("Wrong data returns errors", () => {
            
        })
    })

})