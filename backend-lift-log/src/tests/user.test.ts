import User from "../models/user";
import db from "../db";

afterEach(async () => {
    try {
        await db.query("ROLLBACK");
    } catch (error) {
        console.error("Error rolling back transaction:", error);
    }
});

describe("Testing user model", () => {

    describe("validatePartOneForm", () => {

        test('should throw error if first name missing', async () => {
            const mockData = { firstName: "", lastName: "test-ln" };

            try {
                await User.validatePartOneForm(mockData);
            } catch (error) {
                expect(error).toEqual({ messages: ['First name is required.'] })
            }
        });

        test('should throw error if last name missing', async () => {
            const mockData = { firstName: "test-fn", lastName: "" };

            try {
                await User.validatePartOneForm(mockData);
            } catch (error) {
                expect(error).toEqual({ messages: ['Last name is required.'] })
            }
        });

        test('should return mock data inputs for when all fields valid', async () => {
            const mockData = { firstName: "test-fn", lastName: "test-ln" };

            try {
                const info = await User.validatePartOneForm(mockData);
                expect(info).toEqual({
                    firstName: mockData.firstName,
                    lastName: mockData.lastName
                })
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

    });

    describe("validatePartTwoForm", () => {

        test('should throw error if height (feet) less than 2', async () => {
            const mockData = { heightFeet: 1, heightInches: 11, weight: 155 };

            try {
                await User.validatePartTwoForm(mockData);
            } catch (error) {
                expect(error).toEqual({
                    messages: [
                        { "message": "Height (feet) must be between 2 and 8" },
                    ]
                });
            };
        });

        test('should throw error if height (feet) more than 8', async () => {
            const mockData = { heightFeet: 8, heightInches: 11, weight: 155 };

            try {
                await User.validatePartTwoForm(mockData);
            } catch (error) {
                expect(error).toEqual({
                    messages: [
                        { "message": "Height (feet) must be between 2 and 8" },
                    ]
                });
            };
        });

        test('should throw error if height (inches) less than 0', async () => {
            const mockData = { heightFeet: 5, heightInches: -1, weight: 155 };

            try {
                await User.validatePartTwoForm(mockData);
            } catch (error) {
                expect(error).toEqual({
                    messages: [
                        { "message": "Height (inches) must be between 0 and 11" },
                    ]
                });
            };
        });

        test('should throw error if height (inches) more than 11', async () => {
            const mockData = { heightFeet: 5, heightInches: 12, weight: 155 };

            try {
                await User.validatePartTwoForm(mockData);
            } catch (error) {
                expect(error).toEqual({
                    messages: [
                        { "message": "Height (inches) must be between 0 and 11" },
                    ]
                });
            };
        });

        test('should throw error if weight less than 40', async () => {
            const mockData = { heightFeet: 5, heightInches: 11, weight: 35 };

            try {
                await User.validatePartTwoForm(mockData);
            } catch (error) {
                expect(error).toEqual({
                    messages: [
                        { "message": "Weight must be between 40 and 1000" }
                    ]
                });
            };
        });

        test('should throw error if weight more than 1000', async () => {
            const mockData = { heightFeet: 5, heightInches: 11, weight: 1001 };

            try {
                await User.validatePartTwoForm(mockData);
            } catch (error) {
                expect(error).toEqual({
                    messages: [
                        { "message": "Weight must be between 40 and 1000" }
                    ]
                });
            };
        });

        test('should throw error multiple error messages when all fields not valid', async () => {
            const mockData = { heightFeet: 9, heightInches: 23, weight: 5000 };

            try {
                await User.validatePartTwoForm(mockData);
            } catch (error) {
                expect(error).toEqual({
                    messages: [
                        { "message": "Height (feet) must be between 2 and 8" },
                        { "message": "Height (inches) must be between 0 and 11" },
                        { "message": "Weight must be between 40 and 1000" },
                    ]
                });
            };
        });

        test('should return mock data inputs for when all fields valid', async () => {
            const mockData = { heightFeet: 5, heightInches: 9, weight: 175 };

            try {
                const info = await User.validatePartTwoForm(mockData);
                expect(info).toEqual({
                    heightFeet: mockData.heightFeet,
                    heightInches: mockData.heightInches,
                    weight: mockData.weight
                })
            } catch (error) {
                expect(error).toBeUndefined();
            };
        });
    });

    describe("validatePartThreeForm", () => {

        test('should throw error if input string is empty', async () => {
            const mockData = { body: "" };

            try {
                await User.validatePartThreeForm(mockData);
            } catch (error) {
                expect(error).toEqual({ messages: ['Please select one body type.'] });
            };
        });

        test('should return mock data input when field is valid', async () => {
            const mockData = { body: "Ectomorph" };

            try {
                const info = await User.validatePartThreeForm(mockData);
                expect(info).toEqual({
                    body: "Ectomorph"
                })
            } catch (error) {
                expect(error).toBeUndefined();
            };
        });

    });

    describe("validatePartFourForm", () => {

        test('should throw error if input string is empty', async () => {
            const mockData = { goal: "" };

            try {
                await User.validatePartFourForm(mockData);
            } catch (error) {
                expect(error).toEqual({ messages: ['Please select one goal.'] });
            };
        });

        test('should return mock data input for field is valid', async () => {
            const mockData = { goal: "Gain muscle" };

            try {
                const info = await User.validatePartFourForm(mockData);
                expect(info).toEqual({
                    goal: "Gain muscle"
                })
            } catch (error) {
                expect(error).toEqual({ messages: ['Please select one goal.'] });
            };
        });
    });

    describe("signup", () => {
        const extraData = {
            firstName: "test-fn",
            lastName: "test-ln",
            heightFeet: 5,
            heightInches: 11,
            weight: 180,
            bodyType: "Ectomorph",
            goal: "Gain muscle",
            isAdmin: false,
        }

        test('should throw error if username is empty', async () => {
            const mockData = { ...extraData, username: "", email: "test@gmail.com", password: "testpass" };

            try {
                await User.signup(mockData);
            } catch (error) {
                expect(error).toEqual({
                    messages: [
                        { message: 'Username is required.' }
                    ]
                });
            };
        });

        test('should throw error if email is empty', async () => {
            const mockData = { ...extraData, username: "test-user", email: "", password: "testpass" };

            try {
                await User.signup(mockData);
            } catch (error) {
                expect(error).toEqual({
                    messages: [
                        { message: 'Invalid email.' }
                    ]
                });
            };
        });

    });
});