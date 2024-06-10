import { z } from "zod";

export const userCreateAccountPart1 = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

export const userCreateAccountPart2 = z.object({
    heightFeet: z.number().gte(2).lte(8),
    heightInches: z.number().gte(0).lte(11),
    weight: z.number().gte(40).lte(1000),
});

export const userCreateAccountPart3 = z.object({
    body: z.string(),
});

export const userCreateAccountPart4 = z.object({
    goal: z.string(),
});

export const userCreateAccountPart5 = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6).max(14)
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