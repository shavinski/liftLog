import db from "../db";



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
        Creating a user account from the sign up form 
        
        Data received should be:
        { firstName, lastName, heightFeet, heightInches, weight, bodyType, goal, username, email, password }

        Check if user exists with email, then throw error 
    */

    static async createAccount({ firstName, lastName, heightFeet, heightInches, weight, bodyType, goal, username, email, password }) {
        const checkDuplicateUser = await db.query(`
            SELECT username 
            FROM users
            WHERE username = $1`, [username]
        );

        if (checkDuplicateUser.rows.length > 0) {
            throw new Error(`User already exists: ${username}`);
        };

    };
}

export default User;