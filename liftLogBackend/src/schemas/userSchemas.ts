import { z } from "zod";

export const userCreateAccountPart1 = z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
});

export const userCreateAccountPart2 = z.object({
    heightFeet: z.number().gte(2, { message: "Height (feet) must be between 2 and 8." }).lte(8, { message: "Height (feet) must be between 2 and 8." }),
    heightInches: z.number().gte(0, { message: "Height (inches) must be between 0 and 11." }).lte(11, { message: "Height (inches) must be between 0 and 11." }),
    weight: z.number().gte(40, { message: "Weight must be between 40 and 1000" }).lte(1000, { message: "Weight must be between 40 and 1000" }),
});

export const userCreateAccountPart3 = z.object({
    body: z.string().min(1, { message: "Please select at least one body type" }),
});

export const userCreateAccountPart4 = z.object({
    goal: z.string().min(1, { message: "Please select at least one goal." }),
});

export const userCreateAccountPart5 = z.object({
    username: z.string().min(3, { message: "Username must contain 3 characters" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be between 6 and 14 characters." }).max(14, { message: "Password must be between 6 and 14 characters." })
});

export const userCreateAccountSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    heightFeet: z.number().gte(2).lte(8),
    heightInches: z.number().gte(0).lte(11),
    weight: z.number().gte(40).lte(1000),
    bodyType: z.string(),
    goal: z.string(),
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6).max(14)
});