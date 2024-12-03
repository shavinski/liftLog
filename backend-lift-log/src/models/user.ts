"use strict";

import db from "../db";
import bcrypt from 'bcrypt';
import { BCRYPT_WORK_FACTOR } from "../config";
import BadRequestError from "../middleware/BadRequestError";

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
    userId?: number;
}

interface FormPartOneData {
    firstName: string;
    lastName: string;
}

interface FormPartTwoData {
    heightFeet: number;
    heightInches: number;
    weight: number;
}

interface FormPartThreeData {
    body: string;
}

interface FormPartFourData {
    goal: string;
}

interface FormPartFiveData {
    username: string,
    email: string,
    password: string,
}


class User {
    static async getAllUsers() {
        const result = await db.query(`
            SELECT *
            FROM users;
        `);

        const allUsers = result.rows;

        return allUsers;
    };

    // Get single user data by using their unique username 
    static async getSingleUserData(username: string) {

        console.log("Starting query for username:", username);

        const result = await db.query(`
            SELECT username,
            first_name AS "firstName",
            last_name AS "lastName",
            email,
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
        console.log("Query completed:", result.rows);

        if (result.rows.length === 0) {
            throw new BadRequestError({ code: 400, message: "User not found", logging: true })
        }

        return result.rows[0];
    }

    /**
       Getting user first name and last name from sign up form
       
       Data received should be:
       { firstName, lastName }
   */

    static async validatePartOneForm({ firstName, lastName }: FormPartOneData): Promise<{ firstName: string, lastName: string }> {
        const errors: string[] = [];

        if (!firstName || firstName.trim() === '') {
            errors.push('First name is required.');
        }

        if (!lastName || lastName.trim() === '') {
            errors.push('Last name is required.');
        }

        if (errors.length > 0) {
            throw { messages: errors };
        }

        return { firstName, lastName };
    }

    //     /**
    //        Getting user height and weight details 

    //        Data received should be:
    //        { heightFeet, heightInches, weight }
    //    */

    static async validatePartTwoForm({ heightFeet, heightInches, weight }: FormPartTwoData): Promise<{ heightFeet: number, heightInches: number, weight: number }> {
        const errors: { message: string }[] = [];

        if (!heightFeet) {
            errors.push({ message: "Height (feet) is required." });
        } else if (heightFeet < 2 || heightFeet > 8) {
            errors.push({ message: "Height (feet) must be between 2 and 8" });
        }

        if (!heightInches) {
            errors.push({ message: "Height (inches) is required." });
        } else if (heightInches < 0 || heightInches > 11) {
            errors.push({ message: "Height (inches) must be between 0 and 11" });
        }

        if (!weight) {
            errors.push({ message: "Weight is required." });
        } else if (weight < 40 || weight > 1000) {
            errors.push({ message: "Weight must be between 40 and 1000" });
        }

        if (errors.length > 0) {
            throw { messages: errors };
        }

        return { heightFeet, heightInches, weight }
    }

    //     /**
    //        Getting user body details

    //        Data received should be:
    //        { body }
    //    */
    static async validatePartThreeForm({ body }: FormPartThreeData): Promise<{ body: string }> {
        const errors: string[] = [];

        if (!body) {
            errors.push("Please select one body type.");
        }

        if (errors.length > 0) {
            throw { messages: errors };
        }

        return { body }
    }

    //     /**
    //        Getting user goal 

    //        Data received should be:
    //        { goal }
    //    */

    static async validatePartFourForm({ goal }: FormPartFourData): Promise<{ goal: string }> {
        const errors: string[] = [];

        if (!goal) {
            errors.push("Please select one goal.");
        }

        if (errors.length > 0) {
            throw { messages: errors };
        }

        return { goal }
    }

    //     /**
    //        Getting user login details, make sure email and username are unique

    //        Data received should be:
    //        { username, email, password }
    //    */

    static async signup({ firstName, lastName, heightFeet, heightInches, weight, bodyType, goal, username, email, password, isAdmin }: SignupData): Promise<SignupData> {
        const errors: { message: string }[] = [];

        const checkDuplicateUser = await db.query(`
                SELECT username 
                FROM users
                WHERE username = $1`, [username]
        );

        if (checkDuplicateUser.rows.length > 0) {
            errors.push({ message: `User already exists: ${username}` });
        }

        const checkDuplicateEmail = await db.query(`
                SELECT email 
                FROM users
                WHERE email = $1`, [email]
        );

        if (checkDuplicateEmail.rows.length > 0) {
            errors.push({ message: `Email already in use: ${email}` });
        }

        // Throw an error if there are any errors
        if (errors.length > 0) {
            throw { messages: errors };
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
        //    Need to find a better way to handle these errors, this is supper un readable 
        // Issue here was that I was just throwing generic errors like "Invalid username/password" but the error was actually dealing with my db.query missing a comma
        // This made it extremely difficult to find the exact cause of the error 
        // TODO: Find a better way to handle throwing errors for both users of app and developers of the app 
        try {
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
                }
            }

        } catch (err: any) {
            console.error("Error during login:", err.message);
            throw new Error("Invalid username or password");
        }

        return null;
    }
}

export default User;