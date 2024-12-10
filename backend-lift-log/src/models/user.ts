"use strict";

import db from "../db";
import bcrypt from 'bcrypt';
import { BCRYPT_WORK_FACTOR } from "../config";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { BadRequestError } from "../errors/BadRequestError";

export interface LoginData {
    username: string;
    password: string;
    isAdmin?: boolean;
}

export interface SignupData {
    firstName: string;
    lastName: string;
    heightFeet: number;
    heightInches: number;
    weight: number;
    bodyType: string;
    goal: string;
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    // FIXME: Can figure out a workaround for this
    // UserId thrown on here to send back token with userId attached
    userId?: number;
}

class User {
    static async getAllUsers() {
        const result = await db.query(`
            SELECT *
            FROM users;
        `);

        const allUsers = result.rows;

        if (result.rows.length === 0) {
            throw new NotFoundError()
        }

        return allUsers;
    };

    // Get single user data by using their unique username 
    static async getSingleUserData(username: string) {
        const result = await db.query(`
                SELECT username,
                first_name AS "firstName",
                last_name AS "lastName",
                goal,
                body_type AS "bodyType",
                height_feet AS "heightFeet",
                height_inches AS "hFeightInches",
                is_admin AS "isAdmin"
                FROM users
                WHERE username = $1
                `,
            [
                username
            ]
        );

        if (result.rows.length === 0) {
            throw new NotFoundError()
        }

        return result.rows[0];
    }

    static async signup({ firstName, lastName, heightFeet, heightInches, weight, bodyType, goal, username, email, password, isAdmin }: SignupData): Promise<SignupData> {
        const messages: string[] = [];

        const checkDuplicateUser = await db.query(`
                SELECT username 
                FROM users
                WHERE username = $1`, [username]
        );

        if (checkDuplicateUser.rows.length > 0) {
            messages.push(`User already exists: ${username}`);
        }

        const checkDuplicateEmail = await db.query(`
                SELECT email 
                FROM users
                WHERE email = $1`, [email]
        );

        if (checkDuplicateEmail.rows.length > 0) {
            messages.push(`Email already in use: ${email}`);
        }

        if (password.length < 6 || password.length > 14) {
            messages.push('Password must be between 6 and 14 characters.')
        }

        // Throw an error if there are any messages to display
        if (messages.length > 0) {
            throw new BadRequestError({ messages });
        }

        // After all error checks we will then create the new user account
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

        const result = await db.query(
            `
            INSERT INTO users
            (first_name, last_name, height_feet, height_inches, weight, body_type, goal, username, email, password, is_admin)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING
                first_name AS "firstName",
                last_name AS "lastName",
                height_feet AS "heightFeet",
                height_inches AS "heightInches",
                weight,
                body_type AS "body",
                goal, 
                username,
                email,
                is_admin AS "isAdmin"`,
            [
                firstName,
                lastName,
                heightFeet,
                heightInches,
                weight,
                bodyType,
                goal,
                username,
                email,
                hashedPassword,
                isAdmin
            ],
        );

        return result.rows[0];
    }

    static async login({ username, password }: LoginData): Promise<{ username: string, userId: number, isAdmin: boolean } | null> {
        const messages = [];

        const result = await db.query(`
            SELECT username,
                    password,
                    user_id AS "userId",
                    is_admin AS "isAdmin"
            FROM users
            WHERE username = $1
        `, [username]);

        const user = result.rows[0];

        if (user) {
            const validatePassword = await bcrypt.compare(password, user.password);

            if (validatePassword) {
                delete user.password;
                return user;
            } else {
                messages.push("Invalid username/password");
            }
        } else {
            messages.push("Invalid username/password");
        }

        throw new UnauthorizedError({ messages });
    }
}

export default User;