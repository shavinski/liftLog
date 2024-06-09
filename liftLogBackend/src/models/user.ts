import db from "../db";
import bcrypt from 'bcrypt';
import { BCRYPT_WORK_FACTOR } from "../config";

interface createAccountData {
    firstName: string,
    lastName: string,
    heightFeet: string,
    heightInches: string,
    weight: string,
    bodyType: string,
    goal: string,
    username: string,
    email: string,
    password: string
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

    static async validatePartOneForm({ firstName, lastName }: Partial<createAccountData>): Promise<void> {
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
    }

    //     /**
    //        Getting user height and weight details 

    //        Data received should be:
    //        { heightFeet, heightInches, weight }
    //    */

    //     static async getUserHeightWeight({ heightFeet, heightInches, weight }) {

    //     }

    //     /**
    //        Getting user body details

    //        Data received should be:
    //        { body }
    //    */

    //     static async getUserBodyType({ bodyType }) {

    //     }

    //     /**
    //        Getting user goal 

    //        Data received should be:
    //        { goal }
    //    */

    //     static async getUserGoal({ goal }) {

    //     }


    //     /**
    //        Getting user login details

    //        Data received should be:
    //        { username, email, password }
    //    */

    //     static async getUserLoginInfo({ username, email, password }) {

    //     }

    /**
        Creating a user account from the sign up form 
        
        Data received should be:
        { firstName, lastName, heightFeet, heightInches, weight, bodyType, goal, username, email, password }

        Check if user exists with email, then throw error 
    */

    // TODO: Might break up the multistep form into different endpoints
    static async createAccount({ firstName, lastName, heightFeet, heightInches, weight, bodyType, goal, username, email, password }: createAccountData): Promise<createAccountData> {
        const checkDuplicateUser = await db.query(`
            SELECT username 
            FROM users
            WHERE username = $1`, [username]
        );

        if (checkDuplicateUser.rows.length > 0) {
            throw new Error(`User already exists: ${username}`);
        };

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