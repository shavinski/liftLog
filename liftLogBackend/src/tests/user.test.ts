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

        
    })
})