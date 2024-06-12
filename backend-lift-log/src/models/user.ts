import db from "../db";
import bcrypt from 'bcrypt';
import { BCRYPT_WORK_FACTOR } from "../config";

interface createAccountData {
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
            SELECT username,
                   first_name as firstName,
                   last_name as lastName
            FROM users;
        `);

        const allUsers = result.rows;

        return allUsers;
    };


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

    static async validatePartFiveForm({ firstName, lastName, heightFeet, heightInches, weight, bodyType, goal, username, email, password }: createAccountData): Promise<createAccountData> {
        const errors: { message: string }[] = [];

        if (!username || username.trim() === '') {
            errors.push({ message: 'Username is required.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || emailRegex.test(email)) {
            errors.push({ message: 'Invalid email.' });
        }

        if (!password) {
            errors.push({ message: 'Password is required.' });
        } else if (password.length < 6 || password.length > 14) {
            errors.push({ message: 'Password must be between 6 and 14 characters.' });
        }

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

        console.log("\n\n", errors, "\n\n")

        if (errors.length > 0) { // Throw an error if there are any errors
            throw { messages: errors };
        }

        // After all error checks we will then create the new user account
        const user = this.createAccount({ firstName, lastName, heightFeet, heightInches, weight, bodyType, goal, username, email, password });
        return user;
    }

    /**
        Creating a user account from the sign up form 
        
        Data received should be:
        { firstName, lastName, heightFeet, heightInches, weight, bodyType, goal, username, email, password }

        Check if user exists with email, then throw error 
    */

    static async createAccount({ firstName, lastName, heightFeet, heightInches, weight, bodyType, goal, username, email, password }: createAccountData): Promise<createAccountData> {
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)

        const result = await db.query(
            `
            INSERT INTO users
            (first_name, last_name, height_feet, height_inches, weight, body_type, goal, username, email, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING
                first_name AS "firstName",
                last_name AS "lastName",
                height_feet AS "heightFeet",
                height_inches AS "heightInches",
                weight,
                body_type AS "body",
                goal, 
                username,
                email`,
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
                hashedPassword
            ],
        );

        return result.rows[0];

    };

}

export default User;