import { z } from "zod";

export const userCreateAccountSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    heightFeet: z.number().gte(2).lte(8, { message: "Height (feet) must be between 2 and 8" }),
    heightInches: z.number().gte(0).lte(11, { message: "Height (inches) must be between 0 and 11" }),
    weight: z.number().gte(40).lte(1000, { message: "Weight must be between 40 and 1000" }),
    bodyType: z.string(),
    goal: z.string(),
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6).max(14)
})