import User from "../models/user";

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

        test('should return success and user data entered', async () => {
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
});