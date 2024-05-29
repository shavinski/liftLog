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
    }
}

export default User;